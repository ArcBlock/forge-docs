---
title: "Python SDK"
description: "Python SDK"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "sdk"
  - "python"
---

如需获取详细的 forge-python-sdk 参考手册，请访问[此处](../../sdks/python/latest)。

Python SDK 的源代码可在[Github](https://github.com/ArcBlock/forge-python-sdk)获取。如果有任何疑问，请联系我们。

## 安装

推荐您通过`pip`安装

```sh
pip install forge-python-sdk
```

::: warning
此 sdk 支持`>=3.6`的 python 版本。
:::

## 使用

### 第 0 步

首先，通过[Forge CLI](../../tools/forge_cli)在本地运行 Forge。

### 第 1 步

创建一个`Forge连接`（Forge Connection）来连接您的 Forge 端口（如果您是通过 `forge-cli`来运行您的 Forge，初始端口为 127.0.0.1:28210）。

```python
from forge_sdk import ForgeConn
f = ForgeConn('127.0.0.1:28210')
rpc = f.rpc
config = f.config
```

::: tip
每一个教程都从这一步开始。
:::

## 教程

### 1 级：转移金钱

**场景**：Alice想给迈克转移 10TBA。

::: tip
**TBA**是 Forge 链上的默认货币。1 TBA 有 16 个数位，所以，显示为`10000000000000000`。
:::

#### 第 1 步：为Alice和迈克创建钱包

```python
>>> from forge_sdk import protos, utils
>>> alice=rpc.create_wallet(moniker='alice', passphrase='abc123')
>>> mike = rpc.create_wallet(moniker='mike', passphrase='abc123')
```

::: tip
`moniker`是 Forge 上该钱包的昵称。`passphrase`是通过 Forge 将钱包加密为一个 keystore 文件。如需了解钱包声明规则的更多信息，请点击[此处](../../intro/concepts)。
:::

我们看看Alice的钱包和账户详情

```python
>>> alice
token: "886fe22cd8d29a5c0d0fa5b21ec448bd"
wallet {
  sk: "\274\262\331z\000\265\374\271O7f\2640<\214\212G\302y\021\232\363\355.E\207\213&\355\362\260Gu\204\360@e\036\353\357\276\323\340\211\371U\3716\2212\304\223\037{\037\366\267\374\233@\021\215W\027"
  pk: "u\204\360@e\036\353\357\276\323\340\211\371U\3716\2212\304\223\037{\037\366\267\374\233@\021\215W\027"
  address: "z1brhJCteRSvHUQ9BytsZePkY4KJ9LFBayC"
}

>>> rpc.get_account_balance(alice.wallet.address)
0
```

#### 第 2 步：帮助Alice发出签到交易以获得一些钱

现在，您已为Alice和迈克创建了钱包，但是他们的账户里没有钱。让我们发出一次**签到**交易，帮助Alice得到一些钱。

```python
>>> rpc.poke(alice.wallet)
hash: "CF0513E473ED13712CDB65EFC196A77BD6193E7DF5124C6233C55732573C85A2"
```

收到**哈希**意味着交易被转移到 Forge，但不意味着交易成功。为了确认交易成功发出，让我们深入了解交易详情。

```python
>>> rpc.is_tx_ok('CF0513E473ED13712CDB65EFC196A77BD6193E7DF5124C6233C55732573C85A2')
True
```

如果`is_tx_ok`返回`True`，则意味着交易成功执行。现在，Alice的账户中应该有 25 TBA。

现在，我们查看一下Alice的账户余额。应该有 25 TBA。

```python
>>> rpc.get_account_balance(alice.wallet.address)
250000000000000000
```

::: tip
**签到**：每个账户可每天发出一次**签到交易**以获得 25 TBA。
**哈希**：通过已签署交易计算的哈希。每笔交易应有其独特的**哈希**。
:::

#### 第 3 步：从Alice向迈克转移钱

现在Alice的账户中有 25 个 TBA，迈克的账户中什么也没有。我们可以发出**转移交易**，帮助Alice将 10 TBA 转给迈克。

```python
>>> transfer_itx = protos.TransferTx(to=mike.wallet.address,value=utils.int_to_biguint(100000000000000000))

>>> rpc.transfer(transfer_itx, alice.wallet)
 hash: "CAEF155B1A3A684DAF57C595F68821502BC0187BEC514E4660BA1BD568474345"

>>> rpc.is_tx_ok('CAEF155B1A3A684DAF57C595F68821502BC0187BEC514E4660BA1BD568474345')
True

>>> rpc.get_account_balance(mike.wallet.address)
100000000000000000
```

现在我们可以看到，Alice刚刚成功地将 10 TBA 转到了迈克的账户！

🎉 祝贺您！您已完成 1 级教程！现在，您应该对 Forge 的工作原理有了基本的了解。如果您想迎接更多挑战，请查看 2 级教程。

### 2 级：出售二手笔记本电脑

**场景**：迈克想向Alice出售一台二手笔记本电脑。

#### 第 1 步：为Alice和迈克创建账户

```python
>>> from forge_sdk import rpc, protos, utils
>>> alice=rpc.create_wallet(moniker='alice', passphrase='abc123')
>>> mike = rpc.create_wallet(moniker='mike', passphrase='abc123')
```

在帮助Alice和迈克创建账户后，我们帮助Alice获得一些购买迈克笔记本所需的钱

```python
>>> rpc.poke(alice.wallet, alice.token)
hash: "CF0513E473ED13712CDB65EFC196A77BD6193E7DF5124C6233C55732573C85A2"

>>> rpc.get_account_balance(alice.wallet.address)
250000000000000000
```

#### 第 2 步：为迈克创建笔记本资产

在现实世界，迈克可以简单地向Alice出售他的笔记本。通过 Forge SDK，任何物理项目都能以**资产**形式存在。

我们试试帮迈克通过**CreateAssetTx**创建笔记本资产。用户可在`data`字段输入项目相关的信息，`type_url`代表如何解码序列化的`value`字段。在本教程中，为了简便，我们只填写笔记本的名称。

```python
>>>res, asset_address= rpc.create_asset('test:name:laptop', b'Laptop from Mike',mike.wallet, mike.token)
>>> rpc.is_tx_ok(res.hash)
True
>>> asset_address
'zjdwghZpZN45ig6ytP74r8VF9CHhQtEjBype'
```

然后我们可以看看这个资产到底是什么样的。

```python
>>> rpc.get_single_asset_state(asset_address)
address: "zjdwghZpZN45ig6ytP74r8VF9CHhQtEjBype"
owner: "z1QyzoxdPPEk9A2Uz6h18rvjsAHtmJ78mGD"
transferrable: true
issuer: "z1QyzoxdPPEk9A2Uz6h18rvjsAHtmJ78mGD"
stake {
  total_stakes {
    value: "\000"
  }
  total_unstakes {
    value: "\000"
  }
  total_received_stakes {
    value: "\000"
  }
  recent_stakes {
    type_url: "fg:x:address"
    max_items: 128
    circular: true
  }
  recent_received_stakes {
    type_url: "fg:x:address"
    max_items: 128
    circular: true
  }
}
context {
  genesis_tx: "9EAC9AF9136D30E5C02EDD46BEF081AD61F3F722BA6FEF4398CC5FBC363DCA30"
  renaissance_tx: "9EAC9AF9136D30E5C02EDD46BEF081AD61F3F722BA6FEF4398CC5FBC363DCA30"
  genesis_time {
    seconds: 1557129670
    nanos: 700917000
  }
  renaissance_time {
    seconds: 1557129670
    nanos: 700917000
  }
}
data {
  type_url: "test:name:laptop"
  value: "Laptop from Mike"
}
```

最后一个字段是`data`字段，我们可以看到`Laptop from Mike`。您也可以在其中加入更为复杂的信息，如序列化的 protobuf 消息。

#### 第 3 步：用钱交换资产

现在，Alice的账户里有 25 TBA，迈克有一个笔记本资产。如果迈克想以 10 TBA 的价格出售笔记本，应该怎么做？他可以发起**ExchangeTx**。

因为迈克将是发出者，我们将笔记本`asset_address`作为他将交换的对象。相似的，Alice将交换 10 TBA。

```python
>>> mike_exchange_info = protos.ExchangeInfo(assets=[asset_address])
>>> alice_exchange_info = protos.ExchangeInfo(value = utils.int_to_biguint(100000000000000000))
>>> exchange_tx = protos.ExchangeTx(sender = mike_exchange_info, receiver=alice_exchange_info)

>>> tx = rpc.prepare_exchange(exchange_tx, mike.wallet)
>>> tx = rpc.finalize_exchange(tx, alice.wallet)
>>> res = rpc.send_tx(tx)

>>> rpc.is_tx_ok(res.hash)
True
```

在`prepare_exchange`，我们让卖家迈克验证交易；在`finalize_exchange`，我们让买家Alice验证交易。在双方验证后，我们可直接发出交易。

现在，如果我们查看笔记本的所有者，应为Alice的地址。

```python
>>> rpc.get_single_asset_state(asset_address).owner == alice.wallet.address
True
```

在购买笔记本后，Alice 的账户中应只有 15 TBA。

```python
>>> rpc.get_account_balance(alice.wallet.address)
150000000000000000
```

🎉 🎉 祝贺您！您已完成 2 级教程！现在，您应该对如何通过 Forge SDK 创建资产和交换资产 Forge 的工作原理有了一定的了解。不妨试试创建更多复杂资产！

就是这样了。现在您已经准备就绪了。如果您有任何问题或建议，请在[GitHub](https://github.com/ArcBlock/forge-python-sdk)上与我们分享。

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI0ODU3OTc4OSwxNzEyNDQ5OTMzXX0=
-->
