---
title: 'forge-tx：Forge Tx 编译器和常用 pipe'
description: '详细讲述 forge-tx 的内部实现'
keywords: 'tx'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'tx'
---

Forge TX 主要包含两部分功能：Forge Tx 的编译器，以及常用的一些 pipe。

## Forge Tx 编译器

Forge Tx 编译器是一个 erlang escript，它将符合规定的 Tx 编译成 `DeployProtocolTx` 格式：

```elixir
// Used on deploy_protocol
message CodeInfo {
  // checksum of the module
  bytes checksum = 1;
  // gzipped binary
  bytes binary = 2;
}

message TypeUrls {
  string url = 1;
  string module = 2;
}

message DeployProtocolTx {
  // address of the tx protocol
  string address = 1;
  // human readable name of the transaction, shall only contains alphabat and
  // underscore. For CoreTx, it shall be compatible with existing definition in
  // type_url.ex..
  string name = 2;
  // version of the tx protocol. If version is 0, this is a genesis
  // installation.
  uint32 version = 3;
  // namespace of the tx protocol. If namespace is CoreTx, it will use
  // "fg:t:#{name}" as type_url, this is for backward compatibility.
  string namespace = 4;
  // human readable description on what the tx is about, limited to 256 chars.
  string description = 5;
  // new type urls used by this tx protocol. Will be registered in ForgeAbi
  repeated TypeUrls type_urls = 6;
  // the protobuf definition for the tx protocol.
  string proto = 7;
  // the pipeline of the tx protocol, in yaml format.
  string pipeline = 8;
  // the source code for the tx protocol, in elixir.
  repeated string sources = 9;
  // the compressed code of the protocol
  repeated CodeInfo code = 10;
  // categories or tags this protocol belongs to
  repeated string tags = 11;

  // forge won't update data into state if app is interested in this tx.
  google.protobuf.Any data = 15;
}
```

Tx 编译的过程比较直观：

1. 首先读取 config，读取其中的 proto 定义和 yaml pipeline 定义
2. 把 proto 编译成 elixir，再编译成 BEAM
3. 把 yaml pipeline 编译成 elixir，再编译成 BEAM
4. 编译用户撰写的 elixir 代码（custom pipe）
5. 使用所有编译好的 BEAM，以及 config 里面配置的信息，生成一个 `DeployProtocolTx`，将其结果用 protobuf encode 成二进制，然后再生成 base64，打包成一个形如 `{protocol_name: protocol_base64_string}` 的 JSON，然后生成器 sha256 哈希，分别生成， `protocol_name.itx.json` 和 `protocol_name.itx.sha256`。

## Pipeline

一个 Forge Tx 在其生命周期里，会走两个 pipeline：check（mempool check） 和 verify/update（deliver tx）。所有的 tx 都会执行一些公共的 pipe，因而我们又把一个完整的 pipeline 分成了四个阶段：pre_pipeline, pipeline, post_pipeline, final_pipeline。其中，pipeline 阶段执行的 pipe 是每个 tx 自己定义的，其它的三个阶段都是在执行公共的 pipes。

因为 mempool check 和 deliver tx 是分开的两个阶段。当节点接收到来自网络的 tx 后，会检查其合法性（check），确定是否把 tx 放在 mempool 中，这个检查要尽可能轻量；当节点从另一个节点接收到 block 后，会触发 deliver tx 消息，此时当前节点应该依然进行 check，然后再执行 verify 和 update。这样可以保证 tx 没有任何问题。

### pre_pipeline

pre_pipeline 确保一个 tx 在其 tx 层是正确的，没有任何问题，这样，每个 tx 在它自己的 pipeline 里就可以只关心 itx 层的检查和处理。这种多层结构每层独立处理常见于网络协议，如 IP/TCP，我们的 tx/itx 就相当于 IP/TCP。

```yaml
---
check:
  - pipe: decode_tx
  - pipe: verify_tx
  - pipe: verify_blacklist
  - pipe: verify_replay
  - pipe: decode_itx
  - pipe: verify_protocol_state
  - pipe: verify_tx_size
  - pipe: verify_signature

verify:
  - pipe: extract_state
    from: [:tx, :from]
    to: [:sender_state]
    status: :ok
  - pipe: extract_state
    from: [:tx, :delegator]
    to: [:priv, :delegator_state]
    status: :ok
  - pipe: verify_delegation
    delegation_state: [:priv, :delegation_state]
  - pipe: extract_signer
    to: [:priv, :signers]
    delegators: [:priv, :signer_delegators]
    status: :invalid_tx
  - pipe: verify_delegation
    type: :multisig
    delegation_states: [:priv, :signer_delegation_states]
  - pipe: verify_account_migration
    signers: [:priv, :signers]
  - pipe: verify_sender

update: []
```

### post_pipeline

在 post_pipeline 里，我们检查之前的阶段 tx 是否被终止，如果被终止，那么也终止 post_pipeline。

```yaml
---
check:
  - pipe: check_halted

verify: []

update:
  - pipe: check_halted
  - pipe: update_tx_statistics
```

### final_pipeline

final_pipeline 类似 `try..catch..finally` 中的 finally，不管 tx 执行成功与否，都会执行 final_pipeline 中的 pipes。因而，每个 tx 处理结束后，都会更新 sender 的 gas，更新 delegation 的统计，把 tx 写入 receipt db，然后广播这个 tx 的执行结果（供 subscriber 接收）。

```yaml
---
check: []

verify: []

update:
  - pipe: reset_halted
  - pipe: update_gas_balance
  - pipe: update_delegation_state
  - pipe: update_receipt_db
  - pipe: broadcast
```

## 常用 pipe

在 Forge Tx 里，我们定义了几十个常用的标准化 pipe，供所有的 tx 使用。这些 pipe 可以直接在每个 tx 的 pipeline 里引用。当然，这些 pipe 有不少都在上述三个 pipeline 里使用了。

- anti_land_attack：tx 的发送者和接收者不能是同一个人。IP 层有 src ip / dest ip 相同的 land attack，这里引用其名。
- anti_replay_exchange_attack：exchange tx 在没有设置 to 的时候（没有设置 to 我们会用第二个签名人做为 receiver），不允许只包含 token 的交易。
- broadcast：广播一个 tx receipt。
- check_did：确保 did 是合法的 did。
- check_halted：确保 tx 没有被终止。
- decode_itx：把 itx 中的二进制 decode 出来。
- decode_tx：把 tx 中的二进制 decode 出来。
- extract_commission：对于 token swap 相关的 tx，将 forge state 里面的 commission 设置提取出来，放在 info.priv 里。
- extract_receiver：从 itx.to / tx.multisig 中依次找到 receiver 并设置在 info.receiver 里。
- extract_signer：从 tx.signatures 里找到 signer 的 state，并放在 info 中。
- extract_state：根据 pipe 的配置，从 tx 中拿到相应的 address，然后读取对应的 state 放在 info 中。
- extract_tx：从 itx 中的 itx hash 获取对应的 tx receipt，放在 info 中。
- final：

## 注意事项

如果在 `ForgePipe.Info` 里面添加新的域，记得要在合适的地方将其初始化（比如：forge abci server 里）。如果尚未初始化就在后续的 pipeline 里使用，会导致 tx 出错。
