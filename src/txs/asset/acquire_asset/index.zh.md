---
title: "获取资产交易"
description: "获取资产交易"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "asset"
  - "acquire_asset"
---

**获取资产**用于从[AssetFactory](../create_asset_factory)中购买/取得资产。

注意`AssetFactory`和`AcquireAssetTx`目前为**BETA**版，其界面可能发生改变（大规模）。

## 协议定义

如需获取资产，您应使用`AcquireAssetTx`消息：

```proto
message AssetSpec {

string address = 1;

string data = 2;

}



message AcquireAssetTx {

string to = 1;

repeated AssetSpec specs = 2;



google.protobuf.Any data = 15;

}
```

我们把向资产工厂模板提供的参数称为**asset spec**。资产规格包括地址和数据：

- address：address是生成资产的地址。发送方应将spec应用于模板，以生成资产结构，然后生成 CreateAssetTx，然后计算地址。SDK 可以为这个流程提供帮助。通过在这里引入地址，我们确保一个规格只能应用于资产工厂一次。例如，如果已经生成了第 10 排第 2 个座位的票，则您不能再次获得它。

- data：data是 json 字符串，包含资产工厂模板的参数。

在很多情况下，买家可能在一次交易中购买多个资产。例如，您一次会购买两张电影票——如果不能满足这一要求，您很可能不会购买或者会选择别的场次。因此，在`AcquireAssetTx`，我们允许重复的asset spec，使多个资产的获取全部满足或全部失败。

以下是获取资产的示例：

```elixir
# code to create asset factory

w = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "theater"), wallet: w)

w1 = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "tyr"), wallet: w)



# Note application shall already registered `Ticket` into Forge via `deploy_protocol`.

factory = %{

description: "movie ticket factory",

limit: 5,

price: ForgeAbi.token_to_unit(1),

template: ~s({

"row": "{{ row }}",

"seat": "{{ seat }}",

"time": "11:00am 04/30/2019",

"room": "4"

}),

allowed_spec_args: ["row", "seat"],

asset_name: "Ticket",

attributes: %ForgeAbi.AssetAttributes{

transferrable: true,

ttl: 3600 * 3

}

}



ForgeSdk.create_asset_factory("Avenerages: Endgame", factory, wallet: w)





# code to acquire asset

specs =

Enum.map(["0", "2"], fn seat ->

apply(ForgeAbi.AssetSpec, :new, [%{data: ~s({"row": "15", "seat": "#{seat}"})}])

end)



itx = ForgeAbi.AcquireAssetTx.new(to: address, specs: specs)



ForgeSdk.acquire_asset(itx, wallet: w1)
```
