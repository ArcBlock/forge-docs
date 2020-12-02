---
title: 'Retrieve Swap Transaction'
description: 'Retrieve Swap Transaction'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'atomic-swap'
  - 'retrieve'
---

**Retrieve Swap** Transaction is sent by the receiver to move the token and assets from the swap state to his or her own state. The receiver is required to specify the address of the swap state to retrieve in this transaction, and is also required reveal the origin value of the random number whose sha3-256 output equals the hashkey. Once the transaction is passed, all assets and token under the swap state is transferred to the receiver and the hashkey is written into the swap state.

## Protocol definition

The `RetrieveSwapTx` is defined as:

```protobuf
message RetrieveSwapTx {
  string address = 1;
  bytes hashkey = 2;

  google.protobuf.Any data = 15;
}
```

- `address` is the address of the swap state.
- `hashkey` is the origin value of the random number.

## Example

Here's an example of how to send a retrieve swap transaction.

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

# Assemble and send the RetrieveSwapTx
itx = ForgeAbi.RetrieveSwapTx.new((address: address, hashkey: hashkey)
ForgeSdk.retrieve_swap(itx, wallet: receiver, send: :commit)
```
