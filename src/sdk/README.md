# Forge SDK Overview

Currently we provides SDK support for various languages, inlcuding javascript/nodejs, python, java, elixir/erlang. We will continue evolving the SDKs to supported more languages. If you're interested in building SDK for your favorite language(s), do let us know so our team can provide promptly help.

This chapter gives a high level overview of the SDK - before you jump on to the SDK for your favorite language, please read on. If you intended to implement a new SDK, this is the minimum required APIs you shall implement.

## General overview of the SDK

Forge SDK is intended to make the interaction with the chain built by Forge as easy as possible. All SDK APIs are organized into the following categories:

* chain APIs: provide the client wrapper for chain related gRPC
* wallet APIs: provide the client wrapper for wallet related gRPC
* state APIs: provide the client wrapper for state related gRPC
* subscription APIs: provide the client wrapper for subscription related gRPC
* transaction APIs: the gRPC for transaction is `send_tx`, this set of APIs provide helper functions to make building and sending a tx easy.
* misc APIs: parsing configuration, initialize sdk and more.


### Chain APIs

If you want to access the chain / node / validator info, below APIs could be used:

* get_chain_info/0: retrieve the current status of the chain
* get_node_info/0: retrive the current status of the node
* get_net_info/0: retrieve the network info
* get_validators_info/0: retrieve the current validator info

If you want to access blocks / transactions, and send transactions, below APIs could be used:

* get_tx/1: return an already processed transaction by its hash. If this API returns nil, mostly your tx hasn't been included in a block. You need to wait until it is processed.
* get_block/1: get a block by its height. All txs included in this block will be returned.
* get_blocks/1: get a list of blocks between a range.
* send_tx/1: send the given tx to a node. It will return a tx hash immediately once the tx is accepted, or an error.
* multisig/1: in Forge we support multisig for a tx, you can use this to endorse an already signed tx. `ExchangeTx`, `ConsumeAssetTx` and some other txs are using multisig technology. If you want to learn more about multisig, see: [multisig](../arch/multisig.md).

### Wallet APIs

There are two ways of creating a wallet:

* create wallet in SDK: this is the most secure way of creating a wallet. The client side would have complete ownership of the wallet.
* create wallet by Forge node: you shouldn't use this API unless you own a node, and your client SDK connects to your node with local/private network.

If you want to create wallet completely in SDK, use `create_wallet/0`:

* create_wallet/0: This will generate a wallet with default DID type: public key type is ED25519, hash type is sha3(256), and DID role type is `account`.
* create_wallet/1: you can pass in your own DID type in a map once you want to create a wallet with different settings.

If you want to have your forge node manage your wallet, use `create_wallet/1`:

* create_wallet/1: you need to pass in moniker and passphrase inside a map to create a wallet that the forge node manage for you. Passphrase is used to encrypt the wallet into a keystore file.
* load_wallet/1: load a node managed wallet by its address and passphrase from the keystore.
* recover_wallet/1: if you know the type and the secret key of the wallet, you can recover it into the current forge node. This is useful when you want to switch your wallet from one node to another. This will generate a keystore file.
* list_wallet/0: display the wallet addresses that current forge node hosts.
* remove_wallet/1: delete the keystore for a given wallet address. This is useful when you finished your work on the forge node and you'd remove the footprint for your wallet.

### State APIs

Forge provide different types of the state. You can query a state by its address. We provide several APIs for you to easily access the states:

* get_account_state/1: return the state for an account, node, validator or application address.
* get_asset_state/1: return the state for an asset.
* get_forge_state/1: return global state for forge.
* get_protocol_state/1: return installed protocol state.

### Subscription APIs

In forge you can subscribe to events that exposed by the system, mainly consensus events like `begin_block`, `end_block`, `commit_block` or transaction protocol events.

* subscribe/1: subscribe to a topic. You can event set a filter for the event that you'd listen.
* unsubscribe/1: terminate the subscription by the topic id.

### Transaction APIs

To help client to compose a transaction easily we provided the transaction APIs that could help to generate complicated transactions and send it to a given node. Most of the time, the transaction APIs require you to provide the related itx (inner transaction) and the wallet to sign the transaction. An itx is an instance of a transaction protocol, for example, for declare transaction, its protobuf definition is:

```proto
message DeclareTx {
  string moniker = 1;
  string issuer = 2;

  // forge won't update data into state if app is interested in this tx.
  google.protobuf.Any data = 15;
}
```

which means you need to create a data structure that instantiate it and fill in necessary fields (for details for each transaction, please refer to [transaction protocols](../txs)).

We categorized transaction protocols into different groups:

* account
  * declare/2: declare a wallet to the chain
  * account_migrate/2: migrate a wallet from old address (as well as pk, sk) to a new address.
* asset
  * create_asset/2: create a new asset
  * create_asset_factory/2: create a new asset factory
  * update_asset/2: update an existing asset
  * acquire_asset/2: acquire an asset from an existing asset factory
  * consume_asset/2: consume an asset. e.g. use a movie ticket in cinema
* governance:
  * deploy_protocol/2: deploy a new protocol into the chain at a given block height
  * upgrade_node/2: upgrade the node to a new version at a given block height
* trade:
  * transfer/2: transfer tokens or/and assets from one wallet to another.
  * exchange/2: exchange tokens or/and assets between two parties.
* misc:
  * checkin/2: one wallet can checkin in a daily basis to get some free tokens (for test chains only).

### Misc APIs

Misc APIs help with the initialization of the SDK, parsing the configuration, etc.

* init/1: init forge SDK (it will setup client RPC socket for you)
* parse_config/1: parse the forge configuration
* display/2: provide a display friendly result for a data structure
