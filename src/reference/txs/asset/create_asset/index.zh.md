---
title: "创建资产交易"
description: "创建资产交易"
keywords: ""
robots: "index,follow"
category: ""
layout: "documentation"
tags:
  - "asset"
  - "create_asset"
---

**创建资产**交易用于为您的账户创建新资产。资产可向/和他人转移/交换。资产的用例很多，包括：

- 商品
- 二手商品
- 证书
- 游戏内项目
- ...

## 协议定义

如需创建资产，您应使用`CreateAssetTx`消息：

```proto
message CreateAssetTx {

string moniker = 1;

google.protobuf.Any data = 2;

bool readonly = 3;

bool transferrable = 4;

uint32 ttl = 5;

string parent = 6;

string address = 7;

}
```

资产最重要的字段是其数据——它可以是编码入`google.protobuf.Any`中的任何内容。应用程序可以定义和解释数据内部是什么，例如，如果资产是电影票，应用程序可以定义电影票消息：

```proto
message Ticket {
  string row = 1;
  string seat = 2;
  string room = 3;
  string time = 4;
  string name = 5;
}
```

除了数据字段，所有其他字段均为可选：

- moniker：资产的昵称。
- readonly：资产是否可修改。默认设置中，资产在之后可通过 update_asset 修改。
- transferrable：资产是否可转移给他人。默认设置中，资产不得被转移。
- ttl：首次消费后资产的 ttl。默认设置中，为无限制的使用。其使用场景是，资产是如首次使用后 24 小时有效的公园门票，如果是年票，则在 365 天内有效。
- parent：该资产的母资产。例如，一个活动是一个资产，此活动生成的所有门票会将其母设置为活动地址。
- address：预计算出的资产地址。此字段为必填，但 Forge SDK 会帮您计算地址。

以下为创建资产的示例：Here's an example of creating an asset:

```elixir
> wallet = ForgeSdk.create_wallet()

> ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: wallet)

> ticket = ForgeAbi.Ticket.new(row: "K", seat: "22", room: "3A", time: "03/04/2019 11:00am PST", name: "Avengers: Endgame")

> itx = ForgeAbi.CreateAssetTx.new(data: ForgeSdk.encode_any!(ticket), readonly: true, transferrable: true, ttl: 7200)

> ForgeSdk.create_asset(itx, wallet: wallet)
```
