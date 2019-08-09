---
title: "消费资产交易"
description: "消费资产交易"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "asset"
  - "consume_asset"
---

**消费资产**交易用于消费您拥有的资产。用例包括：

- 您向公园、电影院、博物馆、健身房管理人士出示/使用您的门票

- 您将资产用作证书，获得特定的一次性益处

因此，如果需消费资产，发起方必须是属于资产发行者的钱包，如电影院。消费交易在检查点预签署（如电影院入场口），然后，用户可通过 multisig 消息数据字段的资产地址多次签署交易。请查看下方解释。

## 协议定义

如需更新资产，您应使用`UpdateAssetTx`消息：

```proto
message ConsumeAssetTx {
string issuer = 1;
string address = 2;
google.protobuf.Any data = 15;
}
```

在此，根据情况，`issuer`可与`from`相同或各异。当 tx 由资产持有者多次签署时，钱包可检查发行者是否为资产发行者；若不是，钱包可拒绝签署。在链中执行时，在验证状态阶段，我们应检查此 tx 的`from`：

- 与发行者相同

- `from.issuer == issuer`

例如，博物馆发行了一张门票，爱丽丝购买了该门票。在博物馆大门口，爱丽丝需消费资产，她可以

用预生成的 ConsumeAssetTx 扫描二维码。大多数时候，预生成的 tx 应由门口的账户签署，以便追踪爱丽丝在哪里以及如何使用了该资产。但是，我们不希望任何人都能创建这个 tx，吸引爱丽丝消费资产，因此，门应是博物馆发行的账户。链将确保只有拥有此发行者的帐户可成功签署此 tx。

`address`是该资产的母地址。因为一个资产可能属于另一个资产，如，一张门票属于一场特定的音乐会或电影资产。如果提供了，除发行者外，我们也会验证资产的母地址是否等于此地址。此处`address`为可选项。

以下为消费资产的示例：

```elixir
# say we have two wallets: cinema and alice, alice has an asset ticket

itx = ForgeAbi.ConsumeAssetTx.new(issuer: cinema.address)

tx = ForgeSdk.prepare_consume_asset(itx, wallet: cinema)

# then alice attach her signature to this tx

tx = ForgeSdk.finalize_consume_asset(tx, ticket.address, wallet)
```
