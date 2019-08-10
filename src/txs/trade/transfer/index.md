---
title: 'Transfer Transaction'
description: 'Transfer Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'trade'
  - 'transfer'
---

**Transfer** transaction is the most common transaction in a blockchain, that one account could transfer tokens and/or a list of assets to another account. Once the transfer is finished successfully, the balance of the sender will be reduced and the owner of the assets in the transfer tx would be changed to the receiver.

## Protocol definition

To transfer tokens / assets `TransferTx` is defined:

```proto
message TransferTx {
  string to = 1;
  BigUint value = 2;
  repeated string assets = 3;

  google.protobuf.Any data = 15;
}
```

- `to` is the address of the receiver. It must exist in the chain.
- `value` is the tokens you'd transfer. Mininum 1 unit (1 token = 10^^16 units by default, you can tune this in forge config). If you don't want to transfer any tokens, just leave it unfilled.
- `assets` are a list of asset addresses you'd transfer. Leave if unfilled if you don't want to transfer assets. Not that `value` and `assets` cannot be both empty.

Here's an example of sending a transfer tx:

```elixir
w = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice"), wallet: w)
w1 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob"), wallet: w)
# transfer to bob's address
itx = ForgeAbi.TransferTx.new(to: w1.address, value: ForgeSdk.token_to_unit(1))
# sign with alice's wallet
ForgeSdk.transfer(itx, wallet: w)
```
