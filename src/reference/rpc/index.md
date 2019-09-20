---
title: 'Forge RPC'
description: 'Forge RPC Overview'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'rpc'
  - 'index'
---

## Forge RPC Overview

### Chain APIs

APIs to access the chain / node / validator information.

- `get_chain_info`: retrieve the current status of the chain
- `get_node_info`: retrive the current status of the node
- `get_net_info`: retrieve the network info
- `get_validators_info`: retrieve the current validator info
  If you want to access blocks / transactions, and send transactions, below APIs could be used:
- `get_tx`: return an already processed transaction by its hash. If this API returns nil, mostly your tx hasn't been included in a block. You need to wait until it is processed.
- `get_block`: get a block by its height. All txs included in this block will be returned.
- `get_blocks`: get a list of blocks between a range.
- `send_tx`: send the given tx to a node. It will return a tx hash immediately once the tx is accepted, or an error.
- `multisig`: in Forge we support multisig for a tx, you can use this to endorse an already signed tx. `ExchangeTx`, `ConsumeAssetTx` and some other txs are using multisig technology. If you want to learn more about multisig, see: [multisig](../arch/multisig).

### Wallet APIs

APIs to interact with wallet.

- [`create_wallet`](../../reference/rpc/wallet#create-wallet): This will generate a wallet with default DID type: public key type is ED25519, hash type is sha3(256), and DID role type is `account`. this is the most secure way of creating a wallet.
- [`create_wallet(did_type)`](../../reference/rpc/wallet#create-wallet): you can pass in your own DID type in a map once you want to create a wallet with different settings.
- [`create_wallet(moniker, passphrase)`](../../reference/rpc/wallet#create-wallet):  The client side would have complete ownership of the wallet. You need to pass in moniker and passphrase inside a map to create a wallet that the forge node manage for you. Passphrase is used to encrypt the wallet into a keystore file.you shouldn't use this API unless you own a node, and your client SDK connects to your node with local/private network.
- [`load_wallet`](../../reference/rpc/wallet#load-wallet): load a node managed wallet by its address and passphrase from the keystore.
- [`recover_wallet`](../../reference/rpc/wallet#recover-wallet): if you know the type and the secret key of the wallet, you can recover it into the current forge node. This is useful when you want to switch your wallet from one node to another. This will generate a keystore file.
- [`list_wallet`](../../reference/rpc/wallet#list-wallet): display the wallet addresses that current forge node hosts.
- [`remove_wallet`](../../reference/rpc/wallet#remove-wallet): delete the keystore for a given wallet address. This is useful when you finished your work on the forge node and you'd remove the footprint for your wallet.

### State APIs

Forge provide different types of the state. You can query a state by its address. We provide several APIs for you to easily access the states:

- `get_account_state`: return the state for an array of account, node, validator or application address.
- `get_asset_state`: return the state for an array of assets.
- `get_forge_state`: return global state for forge.
- `get_protocol_state`: return installed protocol state.

### Subscription APIs

In forge you can subscribe to events that exposed by the system, mainly consensus events like `begin_block`, `end_block`, `commit_block` or transaction protocol events.

- [`subscribe`](../../reference/rpc/event/#subscribe): subscribe to a topic. You can event set a filter for the event that you'd listen.
- [`unsubscribe`](../../reference/rpc/event/#unsubscribe): terminate the subscription by the topic id.

### Transaction APIs

To help client to compose a transaction easily we provided the transaction APIs that could help to generate complicated transactions and send it to a given node.


- account
  - `declare`: declare a wallet to the chain
  - `account_migrate`: migrate a wallet from old address (as well as pk, sk) to a new address.
- asset
  - `create_asset`: create a new asset
  - `create_asset_factory`: create a new asset factory
  - `update_asset`: update an existing asset
  - `acquire_asset`: acquire an asset from an existing asset factory
  - `consume_asset`: consume an asset. e.g. use a movie ticket in cinema
- governance:
  - `deploy_protocol`: deploy a new protocol into the chain at a given block height
  - `upgrade_node`: upgrade the node to a new version at a given block height
- trade:
  - `transfer`: transfer tokens or/and assets from one wallet to another.
  - `exchange`: exchange tokens or/and assets between two parties.
- misc:
  - `checkin`: one wallet can checkin in a daily basis to get some free tokens (for test chains only).

### Misc APIs

Misc APIs help with the initialization of the SDK, parsing the configuration, etc.

- `init`: init forge SDK (it will setup client RPC socket for you)
- `parse_config`: parse the forge configuration
- `display`: provide a display friendly result for a data structure
