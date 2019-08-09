---
title: 'Forge Transactions'
description: 'Forge Transactions'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'txs'
  - 'index'
---

As we discussed earlier, transactions are the smallest activities happened on the Forge backed chains and the code backing the transactions is called transaction protocol. Transaction protocol to Forge transaction is just like smart contract to Ethereum transaction.
By default, Forge ships with a set of core transaction protocols - each protocol covers a set of typical use cases. Application developers could decide to install all these protocols or just pick protocols that they want to support. For example, an application may decide no normal asset creation is allowed in its chain, so it installs core protocols without create_asset / update_asset protocols. Application can build and install their own protocols as well if they feel that existing protocols cannot fit for their needs.

## Categories

For core transaction protocols we grouped them into the follow categories.

### Base

This is the most basic transaction protocols that a chain must install. Right now it contains one transaction protocol: core, which provides all the basic functions for state creation / update. Note this transaction protocol is subject to change.

### Account

Account related transaction protocols. Including:

- declare: declare a wallet in the chain. See: [Declare Transaction](account/declare).
- account_migrate: migrate a wallet from one address to another. See: [Account Migration Transaction](account/account_migrate).
- delegate: delegate certain rights from one account to another. See: [Delegate Transaction](account/delegate).
- revoke_delegate: revoke existing delegation for certain or whole rights from one account to another. See: [Revoke Delegate Transaction](account/revoke_delegate).

### Asset

Asset related transaction protocols. Including -
Basic asset creation and manipulation:

- create_asset: create a new asset. See: [Create Asset Transaction](asset/create_asset).
- update_asset: update and existing asset. See: [Update Asset Transaction](asset/update_asset).
- consume_asset: consume an asset to get certain service. See: [Consume Asset Transaction](asset/consume_asset).
  Advanced asset creation and exchange:
- create_asset_factory: create a factory that could generate the similar assets, like a vending machine. See: [Create Asset Factory Transaction](asset/create_asset_factory).
- acquire_asset: pay to an asset factory to get the asset. See: [Acquire Asset Transaction](asset/acquire_asset).

### Trade

- transfer: send tokens or/and assets from one account to the other. See: [Transfer Transaction](trade/transfer).
- exchange: exchange tokens/assets with other's tokens/assets. See: [Exchange Transaction](trade/exchange).

### Governance

Document will be exposed soon.

### Stake

Document will be exposed soon.

### Atomic Swap

Atomic swap is a technology to do trading across two chains. The main protocols include:

- set_up_swap: creates a swap state that temporarily hold the assets and token to swap. See: [Set Up Swap Transaction](atomic-swap/set_up)
- retrieve_swap: retrieves the token and assets for the receiver of the swap. See: [Retrieve Swap](atomic-swap/retrieve)
- revoke_swap: revokes the swap for the sender of the swap. See: [Revoke Swap](atomic-swap/revoke)

The overall steps to do an atomic swap is like:

1. Alice sets up a swap with a hashlock for Bob on chain A.
2. Bob sets up a swap with the same hashlock for Alice on chain B.
3. Alice retrieves the swap on chain B by revealing the hashkey.
4. Bob retrieves the swap on chain A by using the same hashkey.

Alternatively, if Alice wants to cancel this swap before step 3, she can revoke the swap state and then Bob will notice the cancellation and he can revokes his swap as well.

## How to write a transaction protocol

To write a new transaction protocol you basically need to prepare the following files:

- config.yml or config.json: configuration for this transaction protocol. Used by `forge-compiler` to know which files to compile and what metadata to include in the protocol.
- a proto file (optional): the protobuf definition for your transaction protocol. Must be referenced in config.yml.
- a pipeline file (optional): the transaction pipeline for your transaction protocol. Must be referenced in config.yml.
- a set of source code: the logic of the transaction protocol.
  Once you write a new tx protocol, you can either compile it directly with `forge-compiler`:

```bash
$ forge-compiler config.yml
```

or add it into `Makefile` so that `make build-protocols` will take care it for you.
The compiled result is a url based64 encoded (padding: false) deploy protocol itx. For your local node, you can use a moderator's wallet to send it to the chain.

### config.yml

An example of config.yml looks like this:

```yml
name: consume_asset
version: 0
namespace: CoreTx
description: Consume an asset that is owned by self
type_urls:
  fg:t:consume_asset: ForgeAbi.ConsumeAssetTx
proto: protocol.proto
pipeline: protocol.yml
sources:
  - protocol.ex
```

type_urls are a map of type urls (key is the type_url and value is the module name) that you'd register to ForgeAbi. The type_urls mentioned here will be used by `ForgeAbi.encode_any` / `ForgeAbi.decode_any`.
version must be monotonically increasing. Forge will refuse to install a tx protocol with an old version.

### protocol source code

Normally you just need a single file if your protocol is not too complex. The file structure looks like this:

```elixir
defmodule CoreTx.ProtocolName do
  # RPC helper function for sdk to use
  defmodule Rpc do
    import ForgeSdk.Tx.Builder, only: [tx: 1]
    tx :protocol_name
  end
  # customized pipe for Check pipeline
  defmodule CheckTx do
    use ForgePipe.Builder
    def init(opts), do: opts
    def call(info, _opts) do
      info
    end
  end
  # customized pipe for Verify pipeline
  defmodule CheckTx do
    use ForgePipe.Builder
    def init(opts), do: opts
    def call(info, _opts) do
      info
    end
  end
  # customized pipe for Update pipeline
  defmodule UpdateTx do
    use ForgePipe.Builder
    def init(opts), do: opts
    def call(info, _opts) do
      info
    end
  end
end
```

If your code logic is too complex to put into one file, you can use multiple source files, just remember to reference them into the config.yml.

## Guide on protocol upgrade

Protobuf message model ensures that if we're following certain rules, we can upgrade the message with backward-compatible changes. These rules are:

- Existing fields should not be renumbered. If you have already used `string name = 1` you can not do `string name = 2` later on.
- Existing fields should not have their types changed. You can't change `BigSint value = 2` to `BigUint value = 2`. Exceptions:
  1. regular field can be upgraded to an oneof
  2. a regular field can be upgraded to a repeated field.
- New fields should not reuse any previously assigned field number.
- Enum defaults should be picked such that they make sense looking forward, or be set to UNSPECIFIED.
