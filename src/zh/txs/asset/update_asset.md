# 更新资产 Update Asset Transaction

\*\*更新资产\*\*交易被用于更新您拥有的现有资产。请注意，资产必须带`readonly = false`创建。如果只读为真，您便不能更新它。

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
\&gt; wallet = ForgeSdk.create\_wallet()

\&gt; ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: &quot;sisyphus&quot;), wallet: wallet)

# say we have a message Post which have a title and a content filed

\&gt; post = ForgeAbi.Post.new(title: &quot;a new post&quot;, content: &quot;hello world!&quot;)

\&gt; itx = ForgeAbi.CreateAssetTx.new(itx: ForgeSdk.encode\_any!(post))

\&gt; hash = ForgeSdk.create\_asset(itx, wallet: wallet)

# wait for a while to let the tx be executed on the chain

\&gt; address = ForgeSdk.get\_address(hash)

# later on you want to update the post

\&gt; new\_post = ForgeAbi.Post.new(title: &quot;a new post&quot;, content: &quot;Yeah!&quot;)

\&gt; itx = ForgeAbi.UpdateAssetTx.new(data: ForgeSdk.encode\_any!(post), address: address)

# once executed, you can retrieve its state to verify

\&gt; ForgeSdk.get\_asset\_state(address: address)
```
