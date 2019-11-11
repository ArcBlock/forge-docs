---

title: 'Forge APIs'
description: 'Forge RPC Overview'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'rpc'
  - 'index'
---


Forge provides two sets of APIs : gRPC and graphQL, which implement a similar set of interface. This guide uses gRPC API as examples.

### Chain APIs

APIs to access the chain / node / validator information.

- [`get_chain_info`](chain#get-chain-info): retrieve the current status of the chain
- [`get_node_info`](chain#get-node-info): retrieve the current status of the node
- [`get_net_info`](chain#get-net-info): retrieve the network info
- [`get_validators_info`](chain#get-validators-info): retrieve the current validator info
  If you want to access blocks / transactions, and send transactions, below APIs could be used:
- [`get_tx`](chain#get-tx): return an already processed transaction by its hash. If this API returns nil, mostly your tx hasn't been included in a block. You need to wait until it is processed.
- [`get_block`](chain#get-block): get a block by its height. All txs included in this block will be returned.
- [`get_blocks`](chain#get-blocks): get a list of blocks between a range.
- [`send_tx`](chain#send-tx): send the given tx to a node. It will return a tx hash immediately once the tx is accepted, or an error.
- [`multisig`](chain#multisig): in Forge we support multisig for a tx, you can use this to endorse an already signed tx. `ExchangeTx`, `ConsumeAssetTx` and some other txs are using multisig technology. 

### Wallet APIs

- [`declare_node`](../../reference/rpc/wallet#declare-node): declare a new node

### State APIs

Forge provides different types of the state. You can query a state by its address. We provide several APIs for you to easily access the states:

- [`get_account_state`](state#get_account_state): return the state for an array of account, node, validator or application address.
- [`get_asset_state`](state#get_asset_state): return the state for an array of assets.
- [`get_forge_state`](state#get_forge_state): return global state for forge.
- [`get_protocol_state`](state#get_protocol_state): return installed protocol state.

### Statistics APIs

Forge provides different ways to check related statistics:

- [`get_forge_states`](stats#get-forge-stats): return statistics about Forge
- [`list-transactions`](stats#list-transactions): list out transactions based on filter provided
- [`list-assets`](stats#list-assets): list out assets based on filter provided
- [`list-account`](stats#list-account): list out accounts based on filter provided
- [`list-top-accounts`](stats#list-top-accounts): list out accounts with highest balance
- [`list-asset-transactions`](stats#list-asset-transactions): list out transactions related to certain assets
- [`list-blocks`](stats#list-blocks): list out blocks based on filter provided
- [`get-health-status`](stats#get-health-status): get health status of Forge

### Subscription APIs

In forge you can subscribe to events that exposed by the system, mainly consensus events like `begin_block`, `end_block`, `commit_block` or transaction protocol events.

- [`subscribe`](../../reference/rpc/event/#subscribe): subscribe to a topic. You can event set a filter for the event that you'd listen.
- [`unsubscribe`](../../reference/rpc/event/#unsubscribe): terminate the subscription by the topic id.


### Transaction APIs

To help client to compose a transaction easily we provided the transaction APIs that could help to generate complicated transactions and send it to a given node. Each SDK might have different implementations. For specific use case, please use the [Forge SDK](../../instruction/sdk) manual.


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
