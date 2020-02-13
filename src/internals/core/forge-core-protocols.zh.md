---
title: 'forge-core-protocols：核心 tx 的实现'
description: '详细讲述 forge-core-protocols 的内部实现'
keywords: 'protocol'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'protocol'
---

目前 Forge 支持 7 大类的 protocol 或者说 smart contract：

- account：账户相关的 tx。如 declare，account_migrate，delegate，revoke_delegate。
- asset：NFT 相关的 tx。如：create_asset，acquire_asset，consume_asset，update_asset。
- 线上治理相关的 tx。如：deploy_protocol，upgrade_node，activate_protocol，deactivate_protocol，update_validator，update_consensus_params。
- 交易相关的 tx。如：exchange，transfer。
- atomic swap 相关的 tx。如：setup_swap，retrieve_swap，revoke_swap。
- token swap 相关的 tx。如：deposit_token，withdraw_token，approve_withdraw，revoke_withdraw。
- 其它 tx。如 poke，refuel。

## 实现一个 tx protocol 的基本要素

- config.yml：tx protocol 的配置信息。
- protocol.yml：该 tx 的 pipeline 信息。
- protocol.proto：该 tx 的 protobuf 定义。
- protocol.tx：custom pipe 的代码。

一个 tx protocol 在实现完成之后，可以通过 forge tx compiler 编译，见 [forge-tx](./forge-tx.zh.md)。使用方法：

```bash
forge-compiler <path>/config.yml <target-dir>
```

如果要在 forge-core-protocols 里直接编译，可以在 `Makefile` 里将 tx 的相对路径放入以下几组：

```makefile
BASE=base/core
ACCOUNT=account/declare account/account_migrate account/delegate account/revoke_delegate
ASSET=asset/create_asset asset/acquire_asset asset/consume_asset asset/update_asset
GOVERNANCE=governance/deploy_protocol governance/upgrade_node governance/activate_protocol governance/deactivate_protocol governance/update_validator governance/update_consensus_params
# STAKE=stake/stake
TRADE=trade/exchange trade/transfer
MISC=misc/poke misc/refuel
SWAP=swap/setup_swap swap/retrieve_swap swap/revoke_swap
DEPRECATED=deprecated/declare_file
TOKEN=token/deposit_token token/withdraw_token token/approve_withdraw token/revoke_withdraw
```

然后运行 `make build-protocol`，注意，新增 protocol 之后，也需要运行 `make build-web` 让 forge-web 编译该 protocol 相关的信息。

## 调试

在编写好一个 protocol 之后，每次将其拷贝到 forge 里（使用 forge 目录下的 `make copy-protocols`），删除 `~/.forge`，然后重新运行 `make run` 启动 forge 来测试 tx 的行为是否正确，非常麻烦。在本地的 dev 环境下，可以在 forge 运行起来后，使用 `Forge.Unsafe` 下的工具：

```elixir
iex(1)> Forge.Unsafe.LoadTxs.add_all_pipe_paths()
[
  module: CoreState.Account,
  module: CoreState.Asset,
  module: CoreState.Blacklist,
  module: CoreState.Builder,
  module: CoreState.Delegate,
  module: CoreState.Forge,
  ...
]
```

之后，就可以通过重编译你修改过的 module 的方式，来强制 erlang code server 刷新其 beam，达到使用修改后的代码的意图：

```elixir
iex(2)> r CoreTx.UpdateConsensusParams.CheckTx
warning: redefining module CoreTx.UpdateConsensusParams (current version loaded from /Users/tchen/projects/arcblock/forge-core-protocols/_build/dev/lib/forge_core_protocols/ebin/Elixir.CoreTx.UpdateConsensusParams.beam)
  /Users/tchen/projects/arcblock/forge-core-protocols/lib/governance/update_consensus_params/protocol.ex:1

warning: redefining module CoreTx.UpdateConsensusParams.Rpc (current version loaded from /Users/tchen/projects/arcblock/forge-core-protocols/_build/dev/lib/forge_core_protocols/ebin/Elixir.CoreTx.UpdateConsensusParams.Rpc.beam)
  /Users/tchen/projects/arcblock/forge-core-protocols/lib/governance/update_consensus_params/protocol.ex:2

warning: redefining module CoreTx.UpdateConsensusParams.CheckTx (current version loaded from /Users/tchen/projects/arcblock/forge-core-protocols/_build/dev/lib/forge_core_protocols/ebin/Elixir.CoreTx.UpdateConsensusParams.CheckTx.beam)
  /Users/tchen/projects/arcblock/forge-core-protocols/lib/governance/update_consensus_params/protocol.ex:7

warning: redefining module CoreTx.UpdateConsensusParams.UpdateTx (current version loaded from /Users/tchen/projects/arcblock/forge-core-protocols/_build/dev/lib/forge_core_protocols/ebin/Elixir.CoreTx.UpdateConsensusParams.UpdateTx.beam)
  /Users/tchen/projects/arcblock/forge-core-protocols/lib/governance/update_consensus_params/protocol.ex:60

{:reloaded, CoreTx.UpdateConsensusParams.CheckTx,
 [CoreTx.UpdateConsensusParams.Rpc, CoreTx.UpdateConsensusParams.CheckTx,
  CoreTx.UpdateConsensusParams.UpdateTx, CoreTx.UpdateConsensusParams]}
```

这里会出现很多 warning，这是正常的，因为 Forge 当前加载的 tx 的代码和新生成的不同。当看到 `{:reloaded, ...}` 的结果时，加载正常完成。之后，你可以打一个使用该 protocol 的 tx，从而激活你的调试代码。一般而言，我们可以在代码的执行路径上添加 `IO.inspect` 进行调试，调试后记得全局搜索 `IO.inspect` 并删除之。

## Core Protocols 介绍

### account_migrate

当一个钱包的私钥有潜在丢失的风险后，钱包持有人可以发送 `AccountMigrateTx` 用旧的私钥申明新的 wallet（注意：新的 wallet 不能是链上现有的 wallet）：

```proto
message AccountMigrateTx {
  bytes pk = 1;                              // new public key
  WalletType type = 2 [ deprecated = true ]; // new wallet type
  string address = 3;                        // new wallet address

  // forge won't touch this field. Only forge app shall handle it.
  google.protobuf.Any data = 15;
}
```

在 `VerifyTx` 里，我们会验证 migrate 之后的地址没有对应的 state，这是为了防止用户不小心 migrate 错了导致损失。

在 `UpdateTx` 中，新的 wallet 的对应的 state 会被创建。并且原先 wallet 的 state 会通过 `migrate_to` 指向新的 state。

图

### declare

创建一个钱包的链上 state。

```proto
message DeclareTx {
  string moniker = 1;
  string issuer = 2;

  // forge won't update data into state if app is interested in this tx.
  google.protobuf.Any data = 15;
}
```

declare 可以被配置为 restricted 和 non-restricted 模式。在 restricted 模式下，declare 需要 multisign，愿意为 sender 出钱 declare 的用户可以 multisign 这个 tx。

### delegate

delegate 允许一个钱包向另一个钱包授予可以代表自己签字的权限。这个签字权可以细分到每个 type_url，并且支持一系列的规则。

```proto
message DelegateTx {
  string address = 1; // address of the delegation between sender and receiver
  string to = 2;      // delegatee's address
  repeated DelegateOp ops = 3; // a list of operations permitted

  google.protobuf.Any data = 15;
}

// if rules are empty, signature for this type_url is entirely delegated
// otherwise rules are checked one by one, relationship between rules is AND.
// a rule is an expression defined in rule_parser
// (github.com/arcblock/rule-parser) one can setup
message DelegateOp {
  string type_url = 1;
  repeated string rules = 2;
}
```

一旦 delegate 关系建立起来，在 forge state 里会

## revoke_delegage

revoke 已有的 delegation。

```proto
message RevokeDelegateTx {
  string address = 1; // address of the delegation between sender and receiver
  string to = 2;      // delegatee's address
  repeated string type_urls = 3;

  google.protobuf.Any data = 15;
}
```
