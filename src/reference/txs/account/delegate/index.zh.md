---
title: 委托交易
description: 委托交易
keywords: ""
robots: "index,follow"
category: docs
layout: documentation
tags:
  - account
  - delegate
---

**`DelegateTx`**  用于帐户将其签名权委派给其他帐户。如果用户希望通过使用其他帐户执行某些活动来减少使用重要帐户签署交易的次数，则此功能很有用。

**`DelegateTx`**  成功执行后，两个帐户之间便建立了委派关系。然后，被委托委托帐户就可以基于**`DelegateTx`**中定义的规则来代表委托人来签署交易了。

## 样例代码

下面的例子展示了如何使用 `DelegateTx`  在 `protobuf` 中。

```protobuf
message DelegateTx {
  string address = 1;
  string to = 2;
  repeated DelegateOp ops = 3; //

  google.protobuf.Any data = 15;
}

message DelegateOp {
  string type_url = 1;
  repeated string rules = 2;
}
```

| 名称              | 数据类型                                                                              | 描述                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `address`         | string                                                                                    | 发送方和接收方之间的委派地址，由 SDK 计算                            |
| `to`              | string                                                                                    | 代表的地址                                                           |
| `ops`             | repeated(DelegatedOp)                                                                   | 委托给委托人的规则列表。如果规则为空，则完全委派此 type_url 的签名。 |
| `data` （可选的） | [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | 自定义用户数据                                                       |

## 使用示例

### Forge 配置

关于 `DelegateTx`，用户需要在配置中进行以下设置。请参阅详细说明 [设置 Forge 配置](../../../instruction/configuration)。

```toml
[forge.transaction.delegate]

delta_interval = 18000
type_urls = ["fg:t:transfer", "fg:t:exchange"]
```

| 名称             | 数据类型   | 描述                                                          |
| ---------------- | ---------- | ------------------------------------------------------------- |
| `delta_interval` | int       | 规则用于限制某些行为的频率的单个委派间隔的块数。              |
| `type_url`       | list[string] | 可以委托的事务列表。 type_urls 未在此处列出的事务不允许委派。 |

::: tip
例如，如果 `delta_interval`  被设定为 `10`，则此委派的间隔为 10 个块。如果委托规则是委托人只能签署少于五笔交易，则委托人只能签署少于五笔交易 _每一个 `10`  块 _。
:::

### 单签场景下的 `DelegateTx`

Alice 希望将转让权委托给 Betty，但有以下限制：

- Betty 可以在 delegation 间隔内签名的总数： `10`
- 在 delegation 间隔内, Betty 可以消费(consume)的总额度为： `155 ABT`
- Betty 可以消耗的总额度： `1550 ABT`
- 对于单笔交易：
  - Betty 不能转让任何资产
  - Betty 可以转让 15.5 ABT 的最大值

```elixir
type_url = "fg:t:transfer"
max_units = 15.5 |> ForgeAbi.token_to_unit() |> ForgeSdk.display()
rules = [
  "itx.value <= #{max_units} and itx.assets == []",
  "state.balance_delta + itx.value < #{max_units * 10}",
  "state.num_txs_delta < 5",
  "state.balance + itx.value < #{max_units * 100}",
]

itx = ForgeAbi.DelegateTx.new(
    to: betty.address,
    ops: [ForgeAbi.DelegateOp.new(type_url: type_url, rules: rules)]
  )

ForgeSdk.delegate(itx, wallet: alice)
```

delegation 设置成功后，Betty 可以代表 Alice 签名 `transferTx`。下面的例子展示了 Betty 如何代表 Alice 可以向 Charlie 发送 10 个 token：

```elixir
itx = ForgeAbi.TransferTx.new(to: charlie.address, value: ForgeSdk.token_to_unit(10))
ForgeSdk.transfer(itx, wallet: betty, delegatee: alice.address)
```

::: tip
当委托人代表委托人签署交易时，一个额外的字段 `delegatee`  其中应包含代表的地址。
:::

### 多签场景下的 `DelegateTx`

下面显示了 Alice 是否委托了 `ExchangeTx` 给 Betty，Charlie 如何获得 Alice 的 `infinite stone` 100 个代币。由于 Betty 拥有签 `ExchangeTx` 的权利，她现在可以为 Alice 执行多重签名：

```elixir
e1 = ForgeAbi.ExchangeInfo.new(value: ForgeSdk.token_to_unit(100))
e2 = ForgeAbi.ExchangeInfo.new(assets: [stone_address])

itx = ForgeAbi.ExchangeTx.new(sender: e1, receiver: e2)
tx = ForgeSdk.prepare_exchange(itx, wallet: charlie)

tx = ForgeSdk.finalize_exchange(tx, wallet: betty, delegatee: alice.address)
hash = ForgeSdk.send_tx(tx: tx)
```

::: tip
与单签的交易类似，当被委托人代表委托人签署交易时，应该传入一个包含被委托人地址的额外的字段 `delegatee`.
:::

## 委托状态

建立委托后，委托状态将被保留。该状态包含一个映射，其键为 `type_url`  和值为 `DelegateOpState`，其中包含可以在委托规则中使用的统计值。

```protobuf
message DelegateOpState {
  string rule = 1;
  uint64 num_txs = 2;
  uint64 num_txs_delta = 3;

  BigUint balance = 4;
  BigUint balance_delta = 5;
}

message DelegateState {
  string address = 1;
  map<string, DelegateOpState> ops = 2;

  StateContext context = 14;
  google.protobuf.Any data = 15;
}
```
