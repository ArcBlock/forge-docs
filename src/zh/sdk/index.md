---
title: "Forge SDK 概览"
description: "Forge SDK 概览"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "sdk"
  - "index"
---

目前我们提供支持多种语言，包括 javascript/nodejs、python、java、elixir/erlang 等的 SDK。我们会继续发展 SDK，以支持更多语言。如果您对为您最喜欢的语言构建 SDK，请告诉我们，以便我们的团队迅速为您提供帮助。

本章节提供了 SDK 的高水平概览——在前往 SDK 使用您最喜欢的语言之前，请继续读。如果您想部署新的 SDK，这些是您应部署的最低要求。

对于 forge 支持的链、链节点、forge sdk 和应用程序的关系：

![](../assets/images/forge-platform.png)

## SDK 一般概览

Forge SDK 的目的是，使与 Forge 构建的链的互动尽可能简单。所有 SDK API 都分为以下类别：

- 链 AP：提供客户封装，供链相关 gRPC 使用
- 钱包 API：提供客户封装，供钱包相关 gRPC 使用
- 状态 APIs：提供客户封装，供状态相关 gRPC 使用
- 订阅 API：提供客户封装，供订阅相关 gRPC 使用
- 交易 API：交易 gRPC 是`send_tx`，这一组 API 提供帮助者功能，使 tx 的构建和发送变得简单。
- 杂项 API：解析配置、初始化 sdk 等。

### 链 API

如果您想访问链/节点/验证器信息，可使用以下 API：

- get_chain_info/0：找回链的当前状态
- get_node_info/0：找回节点的当前状态
- get_net_info/0：找回网络信息
- get_validators_info/0：找回当前验证器信息

如果您想访问区块/交易，以及发出交易，可使用以下 API：

- get_tx/1：通过哈希返回任何以处理的交易。如果 API 返回 nil，有很大可能是因为您的 tx 未被包含在区块内。您需要等待至其被处理。
- get_block/1：按高度获取区块。此区块中包含的所有 tx 均会被返回。
- get_blocks/1：在一个范围内获得区块列表。
- send_tx/1：将给出 tx 发给一个节点。tx 被接受后，它会立刻返回一个 tx 哈希，否则会返回错误。
- multisig/1：在 Forge，我们支持 tx 的多重签名，您可以使用它为一个已经签署的 tx 背书。`ExchangeTx`、`ConsumeAssetTx`和一些其他 tx 使用多重签名技术。如果您想了解关于多重签名的更多信息，请查看：[多重签名](../arch/multisig.md)。

### 钱包 API

创建钱包的方式有两种：

- 在 SDK 中创建钱包：这是最安全的钱包创建方式。客户方会完成钱包的所有权。
- 通过 Forge 节点创建钱包：除非您有节点，且客户 SDK 通过本地/私人网络与您的节点连接，否则不应使用本 API。

如果您想完全在 SDK 中创建钱包，请使用`create_wallet/0`：

- create_wallet/0：这会生成有默认 DID 类型的钱包：公共密钥类型是 ED25519，哈希类型是 sha3(256)，而 DID 角色类型是`account`。
- create_wallet/1：如果您想创建有不同设置的钱包，可在地图中使用您自己的 DID 类型。

如果您希望自己的 forge 节点管理您的钱包，请使用`create_wallet/1`：

- create_wallet/1：您需要在地图内提供名称和密码以创建一个 forge 节点为您管理的钱包。密码用于将钱包加密为 keystore 文件。
- load_wallet/1：在 keystore 通过地址和密码加载一个节点管理的钱包。
- recover_wallet/1：如果您知道钱包的类型和密钥，可将其恢复至当前 forge 如果您希望换钱包，这个功能很有用。这会生成一个 keystore 文件。
- list_wallet/0：显示当前 forge 节点存储的钱包地址。
- remove_wallet/1：删除特定钱包地址的 keystore。当您完成 forge 节点上的工作，希望移除钱包足迹时，可这样操作。

### 状态 API

Forge 提供不同类型的状态。您可以通过地址询问状态。我们为您提供几个 API，以轻松访问状态：

- get_account_state/1：返回一系列账户、节点、验证器或应用程序地址的状态。
- get_asset_state/1：返回一系列资产的状态。
- get_forge_state/1：返回 forge 的全球状态。
- get_protocol_state/1：返回已安装的协议状态。

### 订阅 API

在 forge，您可以订阅系统披露的活动，主要是共识活动，如`begin_block`、`end_block`、`commit_block`或交易协议活动。

- 订阅/1：订阅主题。您甚至可以设置您会听的活动的筛选条件。
- 取消订阅/1：按主题 id 终止订阅。

### 交易 API

为了帮助客户轻松构成交易，我们提供可帮助生成复杂交易并将其发给指定节点的交易。大多数时候，交易 API 要求您通过相关 itx（内在交易）和钱包，以签署交易。itx 是交易协议的实例，例如，为了声明交易，其 protobuf 定义是：

```proto
message DeclareTx {
  string moniker = 1;
  string issuer = 2;

  // forge won't update data into state if app is interested in this tx.
  google.protobuf.Any data = 15;
}
```

这意味着，您应创建一个将数据结构实例化的数据结构，并应填写必要字段（如需获取每笔交易的详情，请参考[交易协议](../txs)。

我们将交易协议分为不同组别：

- 账户
  - 声明/2：向链声明钱包
  - account_migrate/2：将钱包从旧地址（以及 pk、sk）迁移到新地址。
- 资产
  - create_asset/2：创建新资产
  - create_asset_factory/2：创建新资产工厂
  - update_asset/2：更新现有资产
  - acquire_asset/2：从现有资产工厂获取资产
  - consume_asset/2：消耗资产，例如，在电影院使用电影票
- 治理:
  - deploy_protocol/2：在给定区块高度部署新协议
  - upgrade_node/2：在给定区块高度将节点升级至新版本
- 交易：
  - 转移/2：从一个钱包向另一个钱包转移代币或/和资产。
  - 交换/2：在双方间交换代币或/和资产。
- 杂项：
  - 报到/2：一个钱包可每天报到以获得一些免费代币（仅供试用链使用）。

### 杂项 API

杂项 API 帮助 SDK 的初始化，解析配置等。

- 初始化/1：初始化 forge SDK（它会为您设置客户 RPC 插口）
- parse_config/1：解析 forge 配置
- 显示/2：为数据结构提供显示友好型结果
  <!--stackedit_data:
  eyJoaXN0b3J5IjpbMTg0MTcxMDI2NCw0NTg1MzA1OTEsMjA4OD
  czNjUwMywtMTg4MTMwOTUxNCwtMjM4MTc0ODA0LC0xMzExNjYz
  NjgxLDExODUzOTQyNjEsLTIwMTQ0NDI1NzksMTYyNzIyNDAxNC
  wtNDQyNjMzMDE2XX0=
  -->
