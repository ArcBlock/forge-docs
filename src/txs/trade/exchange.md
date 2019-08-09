---
title: 'Exchange Transaction'
description: 'Exchange Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'trade'
  - 'exchange'
---

**Exchange** transaction is a transaction that requires [multisig](../arch/multisig). It tries to solve this common scenario: Alice wants to buy assets owned by Bob. They agreed on a price and then finished the transaction. This scenario is widely used in the E-Commerce business, and with Exchange tx we make this available in blockchain. Below is a list of inherited scenarios it could support:

- taobao mode: seller sells the goods with a fixed price. In our Exchange tx seller can prepopulate an exchange tx that anyone who wants to buy the goods just need to multi-sign the exchange tx.
- ebay mode: seller owns an asset that is open for bid. Any potential buyer can prepopulate an exchange tx with her bid, and the seller could choose one of the bids and multi-sign it to finish the transaction.

Unlike transfer transaction, exchange transaction is a two-phase commit transaction. The 1st phase, sender creates the tx and sign for it. Then sender needs to find a way to deliver the tx to the receiver (e.g. through email, through website) - this is an offchain operation; the 2nd phase, receiver multi-sign the tx and deliver it to the chain. Only multi-signed exchange tx would be accepted and processed.

## Protocol definition

To transfer tokens / assets `TransferTx` is defined:

```proto
message ExchangeInfo {
  BigUint value = 1;
  repeated string assets = 2;
}

// we could support these cases (and vise versa):
// 1. sender fungible token <-> receiver one or more assets
// 2. sender fungible token + asset <-> receiver one or more assets
// 3. sender one or more assets <-> receiver one or more assets
message ExchangeTx {
  string to = 1;
  ExchangeInfo sender = 2;
  ExchangeInfo receiver = 3;
  google.protobuf.Timestamp expired_at = 4;

  // forge won't touch this field. Only forge app shall handle it.
  google.protobuf.Any data = 15;
}
```

- `to` is the address of the receiver. `to` could be empty, if it is empty, we will use the address in the 1st multisig as the receiver's address.
- `sender` exchange info are the price (tokens and/or assets) that sender's willing to pay for.
- `receiver` exchange info are the price (tokens and/or assets) that receiver's willing to pay for.

In ExchangeInfo:

- `value` is the tokens one would pay for. Mininum 1 unit (1 token = 10^^16 units by default, you can tune this in forge config). If you don't want to transfer any tokens, just leave it unfilled.
- `assets` are a list of asset addresses one would pay for. Leave if unfilled if you don't want to transfer assets. Not that `value` and `assets` cannot be both empty.

Here's an example of sending an exchange tx:

```elixir
# say there are two wallets: alice and bob, and alice owns an asset mona_lisa, bob's willing to pay 10000 tokens to buy it.
sender = ForgeAbi.ExchangeInfo.new(value: ForgeSdk.token_to_unit(10000))
receiver = ForgeAbi.ExchangeInfo.new(assets: [mona_lisa])
itx = ForgeAbi.ExchangeTx.new(to: alice.address, sender: sender, receiver: receiver)
# bob generate the tx
tx = ForgeSdk.prepare_exchange(itx, wallet: bob)
# bob gave the tx to alice to multi-sign
tx = ForgeSdk.finalize_exchange(tx, wallet: alice)
ForgeSdk.send_tx(tx: tx)
```
