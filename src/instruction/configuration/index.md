---
title: Configuration guide
description: Configuration guide
keywords: ""
robots: "index,follow"
category: ''
layout: documentation
tags:
  - core
  - configuration
---

## Overview

[Forge CLI](/handbook/) Each chain created will have its own corresponding `forge_release.toml`Inside is the configuration information for this chain. After each chain is successfully created, the following information will appear to indicate the location of the configuration file, and users can modify it directly in the file.

```shell
✔ Config file /Users/.forge_chains/forge_test1/forge_release.toml is updated!
```

There are two main types of Forge configuration information.**Configuration of the chain**with**Node configuration**。

- **Configuration of the chain** It mainly includes the setting of the chain itself. Once the chain is started, these configuration information will be recorded in the state of the chain and synchronized between all nodes.**Configuration of the chain** The information cannot be changed after the chain is first started.
- **Node configuration** It mainly includes the setting of the node itself, so it can be changed at any time even after the chain is started, but it only needs to restart the node to take effect.

The user is using for the first time `forge start` All must be determined before starting the chain**Configuration of the chain**。

::: tip
Forge used `toml` As the format of the configuration file. Each piece of configuration information is a key-value pair and has its own partition.

`[]`The content in square brackets represents unique partitions. Such as: `[forge]`The following configurations represent that these configurations belong to `forge`， `[forge.transaction]` The following configurations represent that these configurations belong to `forge.transaction`. Forge will read the configuration contents under the corresponding partition at runtime.
:::

Below is a detailed explanation of each configuration in Forge. If an item is configured in `forge_release.toml` Does not appear in Forge, Forge will use the default value, otherwise it will start with `forge_release.toml` In the configuration.

## Configuration of the chain

### All Transactions

`[forge.transaction]` Defined under the partition is the configuration for all transactions. The specific configuration for a certain transaction will be in `[forge.transaction.*]` The configuration will be described later.

```toml
[forge.transaction]
max_asset_size = 1000000
```

| area             | meaning                                                 | Examples of default values                                                            |
| :--------------- | :------------------------------------------------------ | :------------------------------------------------------------------------------------ |
| `max_asset_size` | The maximum value of the custom data field of the asset | The size of the data field that comes with each asset cannot exceed `1000000` bytes。 |

#### Declare transactions

```toml
[forge.transaction.declare]
restricted = false
```

| area         | meaning                                                                                        | Examples of default values                                                                                                                                                                               |
| :----------- | :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `restricted` | carried out `Declare`Whether to restrict users from freely claiming new accounts when trading. | The chain does not restrict users from claiming new accounts. For how to declare a new account under limited circumstances, you can refer to [Declare](../../reference/txs/account/declare) transaction. |

### Admin account

The administrator account has the highest authority on the chain. Many special transactions, such as upgrading the chain, must be performed by the administrator account. When creating a chain, users can choose whether to use their existing account as the administrator account or generate a new administrator account.**In either case, users need to protect the administrator account. `私钥`。**

If the user chooses to generate an administrator account through the Forge CLI, after creating the chain, `sk`The location will be prompted with the following information:

```shell
Your moderator SK has been preserved in ~/.forgerc.yml
```

```toml
[forge.prime.moderator]
address = "z11LFAwVJ4NdAHVVbVeNJsJ4nxHH3UJ8Fusy"
pk = "ABCcGxD3sIzn5qLaxXn0ZPzCJxKsglEobuJOZwEfIoY"
balance = 0
```

| area      | meaning                               |
| :-------- | :------------------------------------ |
| `address` | Administrator account address         |
| `pk`      | Administrator account public key      |
| `balance` | Administrator account initial balance |

### Chain Holding Account

The chain holding account is a special account, no `sk` or `pk`. The coins in the chain holding account can only be transferred out through specific transactions, currently only `Poke`Transactions can be transferred.

```toml
[forge.prime.token_holder]
balance = 4000000000
```

| area      | meaning                                |
| :-------- | :------------------------------------- |
| `balance` | Chain currency account initial balance |

::: tip
If the chain does not support `Poke`For transactions, the initial balance of the chain holding account should be set to 0, otherwise this part of the currency will be trapped in the chain holding account.
:::

### Initial account

In addition to the previously mentioned**Admin account** with **Chain Holding Account**, Users can also preset more other accounts. When the chain is initialized, it will automatically declare these accounts and generate corresponding account balances according to the configuration.

:::tip
`[[]]`The double brackets represent repeatable partitions. Such as `[[forge.accounts]]`The partition and the configuration can appear multiple times, representing multiple account configurations.
:::

```toml
[[forge.accounts]]
address = "<addr1>"
pk = "<base64 of pk1 without padding>"
balance = 1000

[[forge.accounts]]
address = "<addr2>"
pk = "<base64 of pk2 without padding>"
balance = 2000
```

### Token Information

```toml
[forge.token]
name = "ArcBlock"
symbol = "ABT"
unit = "arc"
description = "Forge token ABT"
icon = "data:image/png;base64,iVBORw0KGgoAAA"
decimal = 18
initial_supply = 7_500_000_000
total_supply = 7_500_000_000
inflation_rate = 0
```

| area             | meaning                                                          | Examples of default values |
| :--------------- | :--------------------------------------------------------------- | :------------------------- |
| `name`           | Name of the token                                                | -                          |
| `symbol`         | Token symbol                                                     | -                          |
| `unit`           | The smallest unit of the token, similar to Satoshi on Bitcoin    | -                          |
| `description`    | Description of the token                                         | -                          |
| `icon`           | The icon of the token needs to be base64 encoded and placed here | -                          |
| `decimal`        | Token Accuracy                                                   | -                          |
| `initial_supply` | Initial token supply                                             | -                          |
| `total_supply`   | Total Supply of Tokens                                           | -                          |
| `inflation_rate` | Expansion rate of tokens                                         | -                          |

### Consensus engine

```toml
[tendermint.genesis]
genesis_time = "2019-02-10T17:29:13.31415926Z"
chain_id = "forge"
max_bytes = 150000
```

| area           | meaning                                                            | Examples of default values                                                                                                                                                          |
| :------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `genesis_time` | The initial time of the chain must be UTC time in ISO 8601 format. | When the chain is generated, the Forge CLI will fill in the corresponding time. If the above time is entered, it means that the chain was created at 5 pm UTC on February 10, 2019. |
| `chain_id`     | ID of the chain, all nodes must be consistent                      | The ID of this chain is `forge`。                                                                                                                                                   |
| `max_bytes`    | Maximum amount of data per block                                   | The size of each block cannot exceed `150000` bytes                                                                                                                                 |

### Initial verification node

Users can add custom verification nodes (nodes participating in the block). But if more than or equal to two-thirds of the verification nodes fail to operate normally, the entire chain will not operate normally. If there is no initial verification node configuration, this node defaults to the only verification node, so that the chain degenerates into a single node chain.

```toml
[[tendermint.genesis.validators]]
address = "74BC09AD20D6FC0881B353ABF0F9B7F70236ECF7"
name = "shanghai"
power = "1000"

[tendermint.genesis.validators.pub_key]
type = "tendermint/PubKeyEd25519"
value = "rO20HkBgLYnXnnAekRpFOrwqfiyVfvqDA5tYH4YCFjo="

[[tendermint.genesis.validators]]
address = "43D6B21BDCFBB672C7C8375BF127D3466A889DAF"
name = "beijing"
power = "1000"

[tendermint.genesis.validators.pub_key]
type = "tendermint/PubKeyEd25519"
value = "2ziJ4pHMKmBHrwo1mUzu85C9RR4LyVHfqjSIlwejYBM="
```

## Node configuration

### Forge

```toml
[forge]
path = "~/.forge_release/core"
logpath = "logs"
sock_grpc = "tcp://127.0.0.1:28210"
pub_sub_key = "ABTTOTHEMOON"
```

| area          | meaning                                                                  | Examples of default values                                                            |
| :------------ | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| `path`        | Forge's main path                                                        | Forge related code is stored in `~/.forge_release/core`under.                         |
| `logpath`     | Forge log path will follow the main path                                 | Forge related logs will exist `~/.forge_release/core/logs`under.                      |
| `sock_grpc`   | Forge's gRPC port on this node                                           | Forge's gRPC port on this node will run at `tcp://127.0.0.1:28210`。                  |
| `pub_sub_key` | The keys that Forge uses to encrypt data when publishing and subscribing | Forge uses when publishing and subscribing to data `ABTTOTHEMOON`To encrypt the data. |

### Forge Web

```toml
[forge.web]
enabled = true
port = 8210
```

| area      | meaning                                | Examples of default values        |
| :-------- | :------------------------------------- | :-------------------------------- |
| `enabled` | Whether to run Forge Web automatically | Forge Web will run automatically. |
| `port`    | Forge web listening port               | -                                 |

### Caching

```toml
[cache]
path = "~/.forge_release/cache/mnesia_data_dir"
```

| area   | meaning                | Examples of default values                                                  |
| :----- | :--------------------- | :-------------------------------------------------------------------------- |
| `path` | Forge's cache location | Forge's cache will be placed `~/.forge_release/cache/mnesia_data_dir`under. |

### Consensus engine

```toml
[tendermint]
moniker = "beijing"
path = "/home/work/.forge_chains/forge_beijing/forge_release/tendermint"
keypath = "/home/work/.forge_chains/forge_beijing/keys"
logpath = "logs"
sock_rpc = "tcp://127.0.0.1:32001"
sock_grpc = "tcp://127.0.0.1:36001"
sock_p2p = "tcp://0.0.0.0:37001"
persistent_peers = "2b2a41a70f9ab7c43d4772857bcfaa254887e4b6@47.104.23.85:37001,c6525de61a02379108592fcb6514b19d4a196be9@182.92.167.126:37001"
timeout_commit = "5s"
```

| area               | meaning                                                                                   | Examples of default values                                           |
| :----------------- | :---------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `moniker`          | Node nickname                                                                             | Nodes can be self-explanatory and will be displayed in the Peer list |
| `path`             | tendermint data storage directory                                                         | -                                                                    |
| `keypath`          | Tendermint node public and private key storage directory                                  | -                                                                    |
| `logpath`          | tendermint log storage directory, relative to data storage directory                      | -                                                                    |
| `sock_rpc`         | tendermint rpc port                                                                       | -                                                                    |
| `sock_grpc`        | Tendermint's grpc port                                                                    | -                                                                    |
| `sock_p2p`         | P2P port of tendermint. If networking is needed, pay attention to firewall configuration. | -                                                                    |
| `persistent_peers` | list of nodes that tendermint should keep connected                                       | -                                                                    |
| `timeout_commit`   | Block time                                                                                | -                                                                    |
