# 更新资产 Update Asset Transaction

**更新资产**交易被用于更新您拥有的现有资产。请注意，资产必须带`readonly = false`创建。如果只读为真，您便不能更新它。

## 协议定义

如需更新资产，您应使用`UpdateAssetTx`消息：

```proto
message UpdateAssetTx {
  string address = 1;
  string moniker = 2;
  google.protobuf.Any data = 15;
}
```

您应填写地址和数据以供更新，名字为可选。

以下是创建资产的示例：

```elixir
> wallet = ForgeSdk.create_wallet()

> ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: wallet)

# say we have a message Post which have a title and a content filed

> post = ForgeAbi.Post.new(title: "a new post", content: "hello world!")

> itx = ForgeAbi.CreateAssetTx.new(itx: ForgeSdk.encode_any!(post))

> hash = ForgeSdk.create_asset(itx, wallet: wallet)

# wait for a while to let the tx be executed on the chain

> address = ForgeSdk.get_address(hash)

# later on you want to update the post

> new_post = ForgeAbi.Post.new(title: "a new post", content: "Yeah!")

> itx = ForgeAbi.UpdateAssetTx.new(data: ForgeSdk.encode_any!(post), address: address)

# once executed, you can retrieve its state to verify

> ForgeSdk.get_asset_state(address: address)
```
