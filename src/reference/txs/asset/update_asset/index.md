---
title: 'Update Asset Transaction'
description: 'Update Asset Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'asset'
  - 'update_asset'
---

**`UpdateAssetTx`** is used to update an existing asset. This can be used when asset owner want to upate detailed information about the asset if the asset state has changed.

After **`UpdateAssetTx`** is executed, `data` contained in the existing asset would get replaced with the `data` of the **`UpdateAssetTx`**. Other fields should remain unchanged.

## Sample Code

```proto
message UpdateAssetTx {
  string address = 1;
  string moniker = 2;

  google.protobuf.Any data = 15;
}
```

## Sample usage

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

::: tip
Note that the asset must be created with `readonly = false`. If readonly is true, you cannot update it.
:::
