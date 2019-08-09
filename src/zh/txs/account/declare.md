# 声明交易

**声明**交易会声明钱包进入链中的账户。在 Forge，只有钱包有对应账户，它可以发出或接收交易，或进行链允许的各种活动。

## 协议定义

如需声明钱包，您需要使用`DeclareTx`消息：

```proto
message DeclareTx {

string moniker = 1;

string issuer = 2;

google.protobuf.Any data = 15;

}
```

您仅需为钱包填写`moniker`，然后可集合并签署交易。因为在`Trasnaction`消息中，提供了您的地址和 pk，所以一般账户状态会使用那些信息。

以下是发送声明 tx 的示例：

```elixir
wallet = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: wallet)
```

## 受限声明

对于特定的应用程序，账户是一种受控资源，并非所有人都可自由获得。因此，我们提供受限声明，应用程序所有者仅需如下操作，在 forge 配置中设置`restricted = true`：

```toml
...

[forge.transaction.declare]

restricted = true

...
```

然后，普通声明交易会失败。在本设置下，声明仅在由链中现有账户背书（多签）时才可执行。

本特征可被用于 a) 推荐系统，如早期的 gmail b) 付费账户。
