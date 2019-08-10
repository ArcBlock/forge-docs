---
title: 'Set Up Swap Transaction'
description: 'Set Up Swap Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags: 
  - 'atomic-swap'
  - 'set_up'
---



**Set Up Swap** Transaction is the first step in an atomic swap process. The purpose of this transaction is to create a swap state on the chain to temporarily hold the token and assets. These assets and token is guarded by a hash lock which is a sha3-256 output of a random number. In order to get the assets and token, a receiver must know this random number. Once the transaction is passed, the assets and token are transferred to the swap state and are locked till a block number specified by the `locktime`.

Normally, Set Up Swap transaction should happen in pairs across two chains. For example, if Alice sets up a swap for Bob on chain A, Bob should set up a swap for Alice on chain B by using the **same hashlock** as the next step of the overall atomic swap process.

## Protocol definition

`SetupSwapTx` is defined:

```proto
message SetupSwapTx {
  BigUint value = 1;
  repeated string assets = 2;
  string receiver = 3;
  bytes hashlock = 4;
  uint32 locktime = 5;

  google.protobuf.Any data = 15;
}
```

* `value` is amount of token to swap.
* `assets` are the addresses of assets to swap.
* `receiver` is the address of the account who is the only one allowed to get the token and assets.
* `hashlock` is the sha3-256 value of the random number.
* `locktime` is the block height before which the swap cannot be revoked by the sender.

`SwapState` is defined:

```proto
message SwapState {
  string hash = 1;
  string address = 2;
  bytes hashkey = 3;
  string sender = 4;
  string receiver = 5;
  BigUint value = 6;
  repeated string assets = 7;
  uint32 locktime = 8;
  bytes hashlock = 9;
  StateContext context = 10;
}
```

* `hash` is the hash of the SetupSwapTx.
* `adress` is the address of the swap state. Note, the swap address is generated based on the hash.
* `hashkey` is the random number determined by the sender. It is empty right after creation.
* `sender` is the address of the sender.
* `receiver` is the address of the receiver.
* `value` is the token to swap.
* `assets` is the list of assets addresses to swap.
* `locktime` is the block height before which the swap cannot be revoked by the sender.
* `hashlock` is the sha3-256 value of the random number.
* `context` is state context of the swap state.

## Example

Here's an example of how to send a set up swap transaction.

```elixir
# Declare sender and receiver
sender = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice"), wallet: w)
receiver = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob"), wallet: w)

# Generate a random number as hashkey.
hashkey = :crypto.strong_rand_bytes(32)
# Calculate the sha3 output as hashlock.
hashlock = Mcrypto.hash(%Mcrypto.Hasher.Sha3{}, hashkey)

# Assemble and send the SetupSwapTx
itx = ForgeAbi.SetupSwapTx.new(
  value: ForgeAbi.token_to_unit(1), 
  assets: [], 
  receiver: receiver.address, 
  locktime: 1000000, 
  hashlock: hashlock
)
ForgeSdk.setup_swap(itx, wallet: sender, send: :commit)
```