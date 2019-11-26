---
title: '资产'
description: '资产'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'intro'
  - 'concepts'
---

# 资产

在 ArcBlock SDK 中，资产的本质是数据。任何需要被记录在链上的数据，都能以资产的形式放在链上。

## 使用场景

**资产**的使用场景非常广泛，当你需要对数据做任何记录，比如所有权、变更记录、等等，都可以通过创建一个**资产**并通过交易对其状态更新。

### 使用场景实例：门票

* **生成新门票**：Alice 需要为自己举办的活动创建门票，让参与者可以购票参与活动。Alice 可以通[`create_asset`](../../../reference/txs/asset/create_asset) 创建一种 “门票” 的资产，将其存在链上。
  <br></br>
* **更新门票**：创建完门票之后，Alice 发现门票上活动的时间写错了，她可以通过[`update_asset`](../../../reference/txs/asset/update_asset)更新门票的信息。而这条更新的交易也会作为记录留在链上。
  <br></br>
* **变更门票所有权**：Bob 希望能购买一张门票参加 Alice 举办的活动，可以通过[`exchange`](../../../reference/txs/trade/exchange)付款给 Alice，双方签名之后，这张门票的所有人就会从 Alice 变成 Bob。
  
* **使用门票**：Alice决定每个有门票的人都可以兑换一个纪念品，但一张票只能兑换一次。Bob可以通过[`consume_asset`](../../../reference/txs/asset/consume_asset)兑换纪念品。

## 资产状态
通过[`get_asset_state`](../../../reference/rpc/state#get_asset_state)的API可以获取资产的当前状态。

```protobuf
message AssetState {
  string address = 1;
  string owner = 2;
  string moniker = 3;
  bool readonly = 4;
  bool transferrable = 5;
  uint32 ttl = 6;
  google.protobuf.Timestamp consumed_time = 7;
  string issuer = 8;
  string parent = 9;

  StakeContext stake = 13;
  StateContext context = 14;

  google.protobuf.Any data = 50;
}
```

| Name | Data Type | Description |
| - | - | - |
|address|string|资产的地址|
|owner|string|资产所有人的地址|
|moniker|string|资产的昵称|
|readonly|bool|资产是否只读。`True`意味着资产不可更改。 |
|transferrable|bool|是否可以转让。`True`意味着资产可以转让。|
|ttl| int|Time To Live(ttl) 指资产第一次被使用之后，还会存留多久。|
|consumed_time|Google.Protobuf.Timestamp| 资产被使用的时间。|
|parent|string|资产的上一级地址。如`asset_factory`生成的资产，其上一级地址就是`asset_factory`的地址。|

| `data` (optional)| [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | 用户定义的资产内容。 |

## 如何使资产更安全
一旦资产被保存在链上，任何有这个资产地址的人都可以查看资产状态里的所有信息。资产内容是以序列化后的格式保存成[Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any)存在`data`里。如果对方没有这个资产内容的`protobuf`文件，将无法解码资产的内容。

如果资产内容并不是通过`protobuf`文件序列化得到的，而是通过UTF-8之类编码后也明文可读的方式保存起来，为了保护资产内容的安全，用户可以将资产内容经过哈希运算后保存在链上。
