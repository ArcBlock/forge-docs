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
- final：deprecated
- forward：deprecated
- get_config：根据 tx 的配置读取 forge state 中的配置信息
- reset_halted：临时将 halted 标志取消。用于 final_pipeline。
- update_delegation_state：更新 delegation state 里的统计信息，为 delegation rule 而用。
- update_gas_balance：更新 sender 的 gas。
- update_owner：更新 asset 的 owner。
- update_receipt_db：更新 receipt db。
- update_state：更新 account state。（并未使用，且没有实现）
- update_tx_statistics：更新 statistics。
- verify_account_migration：检查 sender 和 multisig signer 地址是否与 state 中的地址一致（如果一个 address migrate 后，之前的 sk 不能用来签名，但这个 address 依旧可以作为接收方）
- verify_balance：检查对应的 state 中是否有足够的 balance 来处理当前 tx。
- verify_blacklist：检查 sender 是否在 blacklist 中（目前未使用）。
- verify_date：检查 itx 中的日期是否与 block 时间一致。
- verify_delegaion：检查 tx 的 sender 或者 multisig signer 有正确的 delegation 信息（要么没有做 delegate，如果做了 delegate，那么 delegate state 是正确的）
- verify_expiration：检查 tx 是否已经过期。
- verify_gas_balance：检查 sender 有足够的 gas 来执行这个 tx。
- verify_info：检查 tx pipeline 中提供的表达式是否为真，不为真就返回错误代码。
- verify_itx_size：检查 itx 大小，防止 DoS。
- verify_locktime：检查 itx 的 locktime 是否满足。
- verify_moderator：检查 sender 是否为 moderator。
- verify_modifiable：检查 asset 是否可以修改。
- verify_multisig：检查 multisig 签名是否合法。
- verify_owner：检查在 tx 中的 asset 确实为 sender 所有。
- verify_protocol_state：检查当前的 tx 对应的 protocol 是否是使能的状态，如果不是，则返回错误。
- verify_receiver：检查 receiver 是否在 blacklist 中（目前未使用）。
- verify_replay：检查当前的 tx 是否是一个已经存在的 tx（anti-replay）。
- verify_sender：检查当前 sender tx 是否存在（如果是 declare，sender state 必须不存在）
- verify_signature：检查 signature 是否正确。
- verify_signer：对于那些提供 multisig 的 tx，检查第一个 signer 是否是 receiver。
- verify_timestamp：检查 locktime 是否合法（与 verify_locktime 重复，目前未使用）
- verify_transferrable：检查一个 asset 是否被标记成可以 transfer。
- verify_tx_size：检查 tx 大小是否合法（防止 DoS）。
- verify_tx：确保 tx 的基本字段正确。

## 注意事项

 无。
