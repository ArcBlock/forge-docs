---
title: "API 接口"
description: "ArcBlock SDK API 概览"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "rpc"
  - "index"
---

ArcBlock SDK 提供了两种类型的 API：gRPC 和graphQL。两种 API都采用了类似的接口，所以这篇文档主要介绍gRPC API接口。

### 链相关的API

- [`get_chain_info`](chain#get-chain-info)：获取与链相关的信息
- [`get_node_info`](chain#get-node-info): 获取与当前节点相关的信息
- [`get_net_info`](chain#get-net-info): 获取与当前网络相关的信息
- [`get_validators_info`](chain#get-validators-info): 获取验证节点相关的信息
- [`get_tx`](chain#get-tx): 获取某条已经被处理过的交易信息
- [`get_block`](chain#get-block): 获取某一个区块，和其中所有的交易的信息
- [`get_blocks`](chain#get-blocks): 获取某一个区间内所有区块的信息
- [`send_tx`](chain#send-tx): 发送一条交易给节点，如果交易通过验证将返回哈希值，否则将返回错误码
- 
### 钱包相关的API

- [`declare_node`](../../reference/rpc/wallet#declare-node): 声明一个新节点

### 状态相关的API

ArcBlock平台上有多种不同的状态，用户可以通过地址来查询某个状态的具体信息：

- [`get_account_state`](state#get_account_state): 获取一个列表的账户、节点、验证节点或应用的状态信息
- [`get_asset_state`](state#get_asset_state): 获取一个列表的资产的状态信息
- [`get_forge_state`](state#get_forge_state): 获取 Forge 链的状态信息
- [`get_protocol_state`](state#get_protocol_state): 获取安装的智能合约的信息

### 统计相关的API

- [`get_forge_states`](stats#get-forge-stats)：获取链相关统计信息
- [`list-transactions`](stats#list-transactions): 获取符合筛选条件的交易列表
- [`list-assets`](stats#list-assets): 获取符合筛选条件的资产列表
- [`list-account`](stats#list-account): 获取符合筛选条件的账户列表
- [`list-top-accounts`](stats#list-top-accounts): 获取余额最高的账户列表
- [`list-asset-transactions`](stats#list-asset-transactions): 获取和某项资产相关的交易列表
- [`list-blocks`](stats#list-blocks): 过去符合筛选条件的区块列表
- [`get-health-status`](stats#get-health-status): 获取链的健康信息

### 订阅相关的API

- [`subscribe`](../../reference/rpc/event/#subscribe): 订阅一个主题的交易信息
- [`unsubscribe`](../../reference/rpc/event/#unsubscribe): 取消一个之前订阅的主题

### 交易相关的API

为了帮助用户更好的构造并发出交易，每个SDK都支持一系列相关的交易API。具体可以参考 [ArcBlock SDK](../../instruction/sdk)。

- 账户
  - `declare`: 声明新账户
  - `account_migrate`: 把账户从旧地址迁移到新地址
  - `create_asset`: 创建新资产
  - `create_asset_factory`: 创建新资产工厂
  - `update_asset`: 更新资产
  - `acquire_asset`: 从已有的资产工厂中获取资产
  - `consume_asset`: 使用资产
- 治理:
  - `deploy_protocol`: 部署新智能合约
  - `upgrade_node`: 在指定高度将链升级
- 交易:
  - `transfer`: 将通证或资产从某一个账户转到另一个账户
  - `exchange`: 两方交换通证或资产
