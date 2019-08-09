---
title: "Forge Elixir/Erlang SDK"
description: "Forge Elixir/Erlang SDK"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "sdk"
  - "elixir"
---

## Forge SDK

为了在 forge 上开发应用程序，您可以用一个 SDK。Forge SDK 的目的是，使所有由 Forge 构建的与链的互动尽可能简单。所有的 SDK API 都按照以下类别分类：

- 链 API：提供客户封装，供链相关 gRPC 使用
- 钱包 API：提供客户封装，供钱包相关 gRPC 使用
- 状态 APIs：提供客户封装，供状态相关 gRPC 使用
- 订阅 API：提供客户封装，供订阅相关 gRPC 使用
- 交易 API：交易 gRPC 是 send_tx，这一组 API 提供帮助者功能，使 tx 的构建和发送变得简单。
- 杂项 API：解析配置、初始化 sdk 等。

Guthub 链接，请查看：

- [Forge SDK](https://github.com/ArcBlock/forge-elixir-sdk)
- [Abt Did](https://github.com/ArcBlock/abt-did-elixir)
- [Forge Abi](https://github.com/ArcBlock/forge-abi)

如需获取更多文件，请查看：

- [Forge SDK 概览](https://docs.arcblock.io/forge/latest/sdk/)
- [Forge SDK](https://hexdocs.pm/forge_sdk/ForgeSdk.html)
- [Abt Did](https://hexdocs.pm/abt_did_elixir/AbtDid.html)
- [Forge Abi](https://hexdocs.pm/forge_abi/ForgeAbi.html)

## 安装

对于每个新发布，我们都搭配 osx 和 ubuntuor 二进制。如果您使用这两个平台，您可以按照最新的 forge-cli：

```bash
$ npm install -g @arcblock/forge-cli
```

然后运行：

```bash
$ forge init
$ forge start
$ forge web start
```

Forge 启动后，您可以在浏览器开启`http://localhost:8210`。因为您的链上没有任何数据（如果是您第一次运行），您可以运行我们的模拟器以注入一些随机数据：

```bash
$ forge simulator start
```

## 使用

### 第 0 步

首先，在本地搭配[Forge CLI](../tools/forge_cli.md)运行 Forge。

### 第 1 步

查看配置 forge 由`forge config`使用

### 第 2 步

将`FORGE_CONFIG`设置为您的环境变量，指向您 forge 运行的配置。

## 教程

### 1 级：转移金钱

**场景**：爱丽丝想给鲍勃转移 10TBA。

::: 建议笔记
**TBA**是 Forge 链上的默认货币。1 TBA 有 16 个数位，所以，显示为`10000000000000000`。
:::

#### 第 1 步：为爱丽丝和鲍勃创建钱包

```elixir
w1 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice_wallet"), wallet: w1)
w2 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob_wallet"), wallet: w2)
```

::: 建议笔记
`moniker`是 Forge 上该钱包的昵称。`passphrase`由 Forge 使用，以将钱包加密为一个 keystore 文件。如需了解钱包声明规则的更多信息，请点击[此处](../intro/concepts.md)。
:::

我们看看爱丽丝的钱包和账户详情

```elixir
ForgeSdk.get_account_state(address: w1.address)
```

#### 第 2 步：帮助爱丽丝发出报到交易以获得一些钱

现在，您已为爱丽丝和鲍勃创建了钱包，但是他们的账户里没有钱。让我们发出一次**报到**交易，帮助爱丽丝得到一些钱。

```elixir
ForgeSdk.checkin(wallet: w1)
```

收到**哈希**意味着交易被转移到 Forge，但不意味着交易成功。为了确认交易成功发出，让我们深入了解交易详情。

```elixir
ForgeSdk.get_tx(hash: "89FA6DAF67C8F54870599313079DC6F8D7CD483864FE7A7BCDFB9DF4D8ECDAD1")
```

如果`TransactionInfo`中的`code`返回`0`，则意味着交易成功执行。现在，爱丽丝的账户中应该有 25 TBA。

现在，我们查看一下爱丽丝的账户余额。`AccountState`的`balance`中应该有 25 TBA。

```elixir
ForgeSdk.get_account_state(address: w2.address)
```

::: 建议笔记
**报到**每个账户可每天发出一次**报到交易**以获得 25 TBA。
**哈希**：已签署交易所计算的哈希。每笔交易应有其独特的**哈希**。
:::

#### 第 3 步：从爱丽丝向鲍勃转移钱

现在爱丽丝的账户中有 25 TBA，鲍勃的账户中什么也没有。我们可以发出**转移交易**，帮助爱丽丝将 10 TBA 转移给鲍勃。

```elixir
itx = ForgeAbi.TransferTx.new(to: w2.address, value: ForgeSdk.token_to_unit(10))
# sign with alice's wallet
tx1 = ForgeSdk.transfer(itx, wallet: w1)
ForgeSdk.get_tx(hash: tx1)
ForgeSdk.get_account_state(address: w1.address)
```

现在我们可以看到，爱丽丝刚刚成功地将 10 TBA 转移到了鲍勃的账户！

🎉 祝贺您！您已完成 1 级教程！现在，您应该对 Forge 的工作原理有了基本的了解。如果您想迎接更多挑战，请查看 2 级和 3 级教程。

### 2 级：出售二手笔记本电脑

**场景**：鲍勃想向爱丽丝出售一台二手笔记本电脑。

#### 第 1 步：为爱丽丝和鲍勃创建账户

```elixir
w1 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice_wallet"), wallet: w1)
w2 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob_wallet"), wallet: w2)
```

在帮助爱丽丝和鲍勃创建账户后，我们帮助爱丽丝获得一些购买鲍勃笔记本所需的钱

```elixir
ForgeSdk.checkin(wallet: w1)
```

#### 第 2 步：为鲍勃创建笔记本资产

在现实世界，鲍勃可以简单地向爱丽丝出售他的笔记本。通过 Forge SDK，任何物理项目都能以**资产**形式存在。

我们试试帮鲍勃通过**CreateAssetTx**创建笔记本资产。用户可在`data`字段输入项目相关的信息，`type_url`代表如何解码序列化的`value`字段。在本教程中，为了简便，我们只填写笔记本的名称。

```elixir
asset_data = Google.Protobuf.Any.new(type_url: "laotop", value: "brand new")
hash = ForgeSdk.create_asset(ForgeAbi.CreateAssetTx.new(data: asset_data), wallet: w2)
asset_address = ForgeSdk.get_address(hash)
```

然后我们可以看看这个资产到底是什么样的。

```elixir
ForgeSdk.get_asset_state(address: asset_address)
```

最后一个字段是`data`字段，我们可以看到`type_url: "laotop", value: "brand new"`。您也可以在其中加入更为复杂的信息，如序列化的 protobuf 消息。

#### 第 3 步：用钱交换资产

现在，爱丽丝的账户里有 25 TBA，鲍勃有一个笔记本资产。如果鲍勃想以 10 TBA 的价格出售笔记本，应该怎么做？他可以发起**ExchangeTx**。

因为鲍勃将是发出者，我们将笔记本`asset_address`作为他将交换的对象。相似的，爱丽丝将交换 10 TBA。

```elixir
sender_info = ForgeAbi.ExchangeInfo.new(assets: [asset_address])
receiver_info = ForgeAbi.ExchangeInfo.new(value: ForgeSdk.token_to_unit(10))
itx = ForgeAbi.ExchangeTx.new(to: w1.address, sender: sender_info, receiver: receiver_info)
# bob generate the tx
tx = ForgeSdk.prepare_exchange(itx, wallet: w2)
# bob gave the tx to alice to multi-sign
tx1 = ForgeSdk.finalize_exchange(tx, wallet: w1)
hash = ForgeSdk.send_tx(tx: tx1)
```

现在，如果我们查看笔记本的所有者，`AssetState` 中的`owner`应为爱丽丝的地址。

```elixir
ForgeSdk.get_asset_state(address: asset_address)
```

在购买笔记本后，Alice 的账户中应只有 15 TBA。

```elixir
ForgeSdk.get_account_state(address: w1.address)
```

🎉 🎉 祝贺您！您已完成 2 级教程！现在，您应该对如何通过 Forge SDK 创建资产和交换资产 Forge 的工作原理有了一定的了解。不妨试试创建更多复杂资产！

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkzMDQ3MTU5MywxMjkyMTkyMDIwLDEwMD
AxNjkzNTIsMTQyNDMwMjI4NywtMTg4MDAwNDU3OSwzNDg5Njk0
MDcsNzcyMTQ5NDM1XX0=
-->
