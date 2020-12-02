---
title: "交换交易"
description: "交换交易"
keywords: ""
robots: "index,follow"
category: ""
layout: "documentation"
tags:
  - "trade"
  - "exchange"
---

**交换**交易是一种需要[多重签名](../arch/multisig)的交易。它试图解决这个常见场景：Alice希望购买Bob拥有的资产。他们就价格达成一致，然后完成了交易。这个场景常用于电子商务业务中，通过交换 tx，我们使其在区块链可用。以下是它可支持的一些场景：

- 淘宝模式：卖家以固定价格销售商品。在我们的交换 tx，卖家可预填充交换 tx，任何想购买商品的人只需多重签名交换 tx 即可。

- ebay 模式：卖方拥有一个可接受投标的资产。任何潜在买家均可在其投标内预填充交换 tx，卖家可选择一个投标并进行多重签名以完成交易。

与转移交易不同，交换交易是一个有两阶段的提交交易。在第一阶段，发送者创建 tx 并签署。然后，发送者需通过某种方式将 tx 交付给接收者（例如，通过电子邮件或网站）——这是一个链下操作；在第二阶段，接收者会多重签名 tx 并将其交付给链。仅多重签名的交换 tx 可被接受并处理。

## 协议定义

转移代币/资产，定义了`TransferTx`：

```proto
message ExchangeInfo {
  BigUint value = 1;
  repeated string assets = 2;
}



// we could support these cases (and vise versa):
// 1. sender fungible token \&lt;-> receiver one or more assets
// 2. sender fungible token + asset \&lt;-> receiver one or more assets
// 3. sender one or more assets \&lt;-> receiver one or more assets

message ExchangeTx {
  string to = 1;
  ExchangeInfo sender = 2;
  ExchangeInfo receiver = 3;
  google.protobuf.Timestamp expired_at = 4;

  // forge won't touch this field. Only forge app shall handle it.
  google.protobuf.Any data = 15;
}
```

- `to`是接收者的地址。`to`可以为空，如果其为空，我们会使用第一个多重签名的地址作为接收者的地址。
- `sender`交换信息是发送者愿意支付的价格（代币和/或资产）。
- `receiver`交换信息是接收者愿意支付的价格（代币和/或资产）。

在 ExchangeInfo 中：

- `value`是一个人愿意支付的代币数。最少为一个单位（默认情况下，1 个代币 = 10^^16 单位，您可以在 forge 配置中进行调整）。如果您不想转移任何代币，可以留空不填。
- `assets`是一个人要支付的资产地址列表。如果您不想转移资产，可以留空不填。请注意，`value`和`assets`不得均为空。

以下为发送交换 tx 的示例：

```elixir
# say there are two wallets: alice and bob, and alice owns an asset mona_lisa, bob's willing to pay 10000 tokens to buy it.

sender = ForgeAbi.ExchangeInfo.new(value: ForgeSdk.token_to_unit(10000))

receiver = ForgeAbi.ExchangeInfo.new(assets: [mona_lisa])

itx = ForgeAbi.ExchangeTx.new(to: alice.address, sender: sender, receiver: receiver)

# bob generate the tx

tx = ForgeSdk.prepare_exchange(itx, wallet: bob)

# bob gave the tx to alice to multi-sign

tx = ForgeSdk.finalize_exchange(tx, alice)

ForgeSdk.send_tx(tx: tx)
```
