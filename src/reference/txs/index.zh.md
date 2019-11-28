---
title: "交易类型"
description: "Forge 交易"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "txs"
  - "index"
---

交易是 Forge 支持的链上发生的最小活动，支持交易的代码名为交易协议。Forge 交易的交易协议相当于以太坊交易的智能合约。

默认情况下，Forge 包含一套核心交易协议——每个协议都覆盖一组典型用例。应用程序开发者可以决定安装所有协议或只选择希望支持的协议。

### 账户

账户相关的交易协议

- [`DelcareTx`](account/declare): 声明链中的钱包
- [`AccountMigrateTx`](account/account_migrate):将钱包从一个地址迁移到另一个地址
- [`DelegateTx`](account/delegate): 委托某些权力给另一个账户

### 资产

资产相关的交易协议

- [`CreateAssetTx`](asset/create_asset)：创建新资产
- [`UpdateAssetTx`](asset/update_asset)：更新现有资产
- [`ConsumeAssetTx`](asset/consume_asset)：消费资产以获得特定服务

高级资产创建和交换：

- [`CreateAssetFactory`](asset/create_asset_factory)：创建如自助售货机一样可生产相似资产的工厂
- [`AcquireAsset`](asset/acquire_asset)：向资产工厂支付，以获得资产

### 交易

- [`Transfer`](trade/transfer)：从一个账户向另一个账户发送代币或/和资产
- [`Exchange`](trade/exchange)：同其他人交换代币/资产

## 更多话题

[如何写一个智能合约](how_to_write_a_smart_contract)
