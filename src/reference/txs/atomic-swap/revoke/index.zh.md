---
title: 'Revoke Swap Transaction'
description: 'Revoke Swap Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'atomic-swap'
  - 'revoke'
---



**Revoke Swap** transaction redeems the assets and token under swap state back to the sender of the swap. This transaction is useful if the sender wants to stop the atomic swap for whatever reason. But in order to protect the receiver, sender is only allowed to revoke a swap after its locktime.

## Protocol definition

```proto
message RevokeSwapTx {
  string address = 1;

  google.protobuf.Any data = 15;
}
```

* `address` is the address of the swap state to revoke.

## Example

Here's an example of how to send a revoke swap transaction.

```elixir
# Declare sender and receiver
sender = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice"), wallet: w)
receiver = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob"), wallet: w)

# Generates a random number as hashkey.
hashkey = :crypto.strong_rand_bytes(32)
# Calculates the sha3 output as hashlock.
hashlock = Mcrypto.hash(%Mcrypto.Hasher.Sha3{}, hashkey)

# Assemble and send the SetupSwapTx
itx = ForgeAbi.SetupSwapTx.new(
  value: ForgeAbi.token_to_unit(1),
  assets: [],
  receiver: receiver.address,
  locktime: 1000000,
  hashlock: hashlock
)
hash = ForgeSdk.setup_swap(itx, wallet: sender, send: :commit)

# Calculates the swap address created by this transaction.
address = ForgeSdk.Util.to_swap_address(hash)

# Assemble and send the RevokeSwapTx
itx = ForgeAbi.RevokeSwapTx.new(address: address)
ForgeSdk.revoke_swap(itx, wallet: sender, send: :commit)
```
