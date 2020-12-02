---
title: 'Transactions'
description: 'Forge Transactions'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'txs'
  - 'index'
---

## Overview

In Forge, all activities happen in the form of a `Transaction`. For example, if Alice wants to transfer money to Bob, Alice creates and signs a `TransferTx` which specifies Bob's account address, and the amount of money Alice wants to send.

### Account

- [`DeclareTx`](./account/declare): Declare a wallet in the chain.
- [`AccountMigrateTx`](./account/account_migrate): Migrate a wallet from one address to another.
- [`DelegateTx`](./account/delegate): Delegate certain rights from one account to another.

### Asset

- [`CreateAssetTx`](./asset/create_asset): Create a new asset.
- [`UpdateAssetTx`](./asset/update_asset): Update and existing asset.
- [`ConsumeAssetTx`](./asset/consume_asset): Consume an asset.
- [`CreateAssetFactoryTx`](./asset/create_asset_factory): Create a factory that could generate the similar assets, like a vending machine.
- [`AcquireAssetTx`](./asset/acquire_asset): Pay to an asset factory to get the asset.

### Trade

- [`TransferTx`](./trade/transfer): Send tokens or/and assets from one account to the other.
- [`ExchangeTx`](./trade/exchange): Exchange tokens/assets with other's tokens/assets.

### Atomic Swap

Atomic swap is a way to trade across different chains. it consists of multiple transactions:

- [`SetUpSwapTx`](./atomic-swap/set_up): Creates a swap state that temporarily hold the assets and token to swap.
- [`RetrieveSwapTx`](./atomic-swap/retrieve): Retrieves the token and assets for the receiver of the swap.
- [`RevokeSwapTx`](./atomic-swap/revoke): Revokes the swap for the sender of the swap.

More Details about the workflow of atomic-swap can be found [here](./atomic-swap/what_is_atomic_swap), about how to do atomic-swap in your code or application:

- [How to do atomic-swap with SDK](./atomic-swap/sdk-usage)
- [How to do atomic-swap with ABT Wallet](./atomic-swap/wallet-usage)

## More Advanced Topics

[How to write a smart contract?](./how_to_write_a_smart_contract)
