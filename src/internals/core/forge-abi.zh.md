---
title: 'forge-abi：Forge 的核心数据结构'
description: '详细讲述 forge-abi 的内部实现'
keywords: 'abi'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'abi'
---

## 数据结构

### enum.proto

- StatusCode：包含整个 forge 的所有 error code tx 定义了新的 error code，需要在 StatusCode 里添加。如果 deprecate 一个已有的 status code，将其注释掉即可，但不要重用这个 code。
- KeyType：数字签名的类型
- HashType：哈希算法类型
- EncodingType：二进制到可读字符集的转换类型。注意目前我们锁定在 base58。
- RoleType：DID 角色类型
- UpgradeType：并未使用
- UpgradeAction：并未使用
- StateType：状态的类型，其中 state_channel 已经 deprecated
- StakeType：未使用
- ProtocolStatus：forge smart contract 的状态。在执行一个 tx 时，forge 会查看当前 protocol（比如 fg:t:transfer）是否在 running 状态，如果不是，tx 将不会执行。

### rpc.proto / service.proto / trace_type.proto

包含 forge 对外提供的 GRPC service 的定义。 其中，trace_type 主要是为 GraphQL 提供的。

### tx.proto

早期主要用来定义所有的 forge 支持的 tx 类型；在 tx 被单独放在 forge-core-protocols repo 后，这里仅仅包含 `DeployProtocolTx`。这是因为 Forge 启动或者升级，还没有加载任何 tx protocol 时，需要使用 DeployProtocolTx 的数据类型来解析并执行其他 tx protocol 的加载。所以 `DeployProtocolTx` 在 forge-abi 里有一份，在 forge-core-protocols 里也有一份。

### type.proto

- BigUint：大整数的定义。GRPC 没有 uint64 之上的整数定义，我们使用了 bytes 来模拟。erlang 内置任意精度的大整数的支持，并且提供了 `:binary.encode_unsigned` / `:binary.decode_unsigned` 在大整数和 bytes 之间进行转换，所以我们使用这个特性来支持 GRPC 的大整数。
- BigSint：带符号的大整数。目前没有在使用。
- WalletType：钱包类型。
- WalletInfo：钱包数据结构。
- ChainInfo：forge 链的基本信息。
- NodeInfo：forge 节点的基本信息。
- Validator：使用 adress 和 power 描述一个 validator。用于更新 validator 的消息。power 为 0 意味着这个 validator 不再有效。
- ConsensusParams：共识算法相关的设置。
- UpgradeTask / UpgradeTasks：未使用。
- AbciContext：执行 tx 过程中的一些上下文信息。
- Multisig：tx 处理 multisig 的数据结构。
- Transaction：tx 的定义。
- TransactionInfo：除 Transaction 信息之外，还包含块高，在区块中的位置，hash 等信息，存储 transaction receipt 的时候会存这个结构。当 TransactionInfo 包含的 tx 为空时，表明这是一个中间状态，调用者需要使用查询到的 transaction info 里带的 hash 继续查询，才能得到最终的 tx。
- DeclareConfig / DelegateConfig / TransactionConfig / PokeConfig / PUpgradeInfo / AccountConfig / TokenSwapConfig：forge state 里面存储的 config 信息。当我们添加新的配置时，我们需要考虑该配置是否是本地配置，还是全局配置（需要 consensus），如果是后者，我们需要扩展 ForgeState 添加相应的 config，并且在初始化链或者升级链的时候写入这个 config。
- BlockInfo / BlockInfoSimple：提供 Block 查询的数据。
- TxStatus：tx 状态。未使用。
- CircularQueue：使用 protobuf 实现的一个简单的 queue，支持 fifo / lifo，queue limit，以及当到达 limit 时是丢弃还是覆盖最旧的数据。
- StateContext：更新 state 时提供的上下文信息。
- StakeContext / StakeSummary / StakeConfig：和 stake 相关的数据结构。未使用。
- UnconfirmedTxs / NetInfo / GeoInfo / PeerInfo / ValidatorsInfo / ValidatorInfo / GenesisInfo：API 需要的一些数据结构。
- ForgeStats / TxStatistics：统计信息
- PokeInfo：存贮在每个账号下的 poke 信息，目前只有 token holder account（zzz...zz 账号）有这个信息。
- Evidence：token swap 的证据信息，记录以太坊上的原始 tx。

## 功能函数

### bigint（util/bigint.ex）

实现了 BigUint / BigSint 的基本运算功能。引用这个模块时，可以使用 `use ForgeAbi.Unit`，这样所有的运算符重载都将生效。

### type_url (util/type_uril.ex)

本身是一个 gen_server，提供 type_url 的注册和查询功能。当 forge 启动后，会加载当前使能的 tx。在这个阶段，每个 tx 的 type_url 注册到这个 gen_server 之中，以便于后续使用和查询。当 forge SDK 第一次连接 forge 时，会请求所有的 forge 支持的 type_url 信息，这样在 client 端就知道可以支持发送哪些 tx 了。注意，如果 forge SDK 在 forge 加载完成之前就连接 forge，可能会有一个很小的窗口拿到不完整的 type_url 信息。


## 注意事项

forge-abi 是几乎所有 forge 相关的 repo 的基石。当 forge-abi 里的 proto 修改后，需要运行 `make rebuild-proto` 来重新生成对应的 elixir 代码。测试 OK 后，需要 bump 新的 release，并 publish 到 hex.pm 上。之后，其它依赖 forge-abi 的项目需要 bump 各自的 dependency。
