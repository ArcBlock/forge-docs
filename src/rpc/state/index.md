---
title: 'State RPC'
description: 'State RPC'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'rpc'
  - 'state'
---

State RPC helps users to getting the state of account, asset, stake and forge.

## RPC list

- [Get Account State](#get-account-state)
- [Get Asset State](#get-asset-state)
- [Get Stake State](#get-stake-state)
- [Get Forge State](#get-forge-state)

---

### Get Account State

---

`rpc get_account_state(stream RequestGetAccountState) returns (stream ResponseGetAccountState);`

#### RequestGetAccountState

| Name    | Data Type | Default | Required |
| :------ | :-------- | :------ | :------- |
| address | string    |         |          |
| keys    | [string]  |         |          |
| height  | uint64    |         |          |

```protobuf
message RequestGetAccountState {
  string address = 1;
  repeated string keys = 2;
  uint64 height = 3;
}
```

---

#### ResponseGetAccountState

| Name  | Data Type    | Default | Required |
| :---- | :----------- | :------ | :------- |
| code  | StatusCode   |         |          |
| state | AccountState |         |          |

```protobuf
message ResponseGetAccountState {
  StatusCode code = 1;
  AccountState state = 2;
}
```

#### GRPC example

```elixir
> ForgeSdk.get_account_state(ForgeAbi.RequestGetAccountState.new(address: "z1QNTPxDUCbh68q6ci6zUmtnT2Cj8nbLw75", height: 5000))
%ForgeAbi.AccountState{
  address: "z1QNTPxDUCbh68q6ci6zUmtnT2Cj8nbLw75",
  balance: %ForgeAbi.BigUint{value: <<3, 120, 45, 172, 233, 217, 0, 0>>},
  context: %ForgeAbi.StateContext{
    genesis_time: %Google.Protobuf.Timestamp{
      nanos: 266178000,
      seconds: 1555449878
    },
    genesis_tx: "34E9DA5318F10658D36244225ECF80F6F5AB7F8DA6DEC592822385E87247784C",
    renaissance_time: %Google.Protobuf.Timestamp{
      nanos: 996795000,
      seconds: 1555455584
    },
    renaissance_tx: "4B7038070466A16092C04180D22D3B3EDA5DF5C18D70789D24225C8F4F926836"
  },
  data: %Google.Protobuf.Any{type_url: "sm:x:flag", value: ""},
  issuer: "",
  migrated_from: [],
  migrated_to: [],
  moniker: "Keebler",
  nonce: 4,
  num_assets: 1,
  num_txs: 3,
  pinned_files: nil,
  pk: <<101, 202, 69, 72, 199, 115, 3, 199, 248, 210, 249, 196, 227, 11, 45,
    126, 69, 225, 62, 112, 131, 209, 27, 253, 23, 163, 242, 54, 102, 40, 192,
    115>>,
  poke: nil,
  stake: %ForgeAbi.StakeContext{
    recent_received_stakes: %ForgeAbi.CircularQueue{
      circular: true,
      fifo: false,
      items: [],
      max_items: 128,
      type_url: "fg:x:address"
    },
    recent_stakes: %ForgeAbi.CircularQueue{
      circular: true,
      fifo: false,
      items: [],
      max_items: 128,
      type_url: "fg:x:address"
    },
    total_received_stakes: %ForgeAbi.BigUint{value: <<0>>},
    total_stakes: %ForgeAbi.BigUint{value: <<0>>},
    total_unstakes: %ForgeAbi.BigUint{value: <<0>>}
  },
  type: nil
}
```

#### GraphQL example

```graphql
{
  getAccountState(address: "z1QNTPxDUCbh68q6ci6zUmtnT2Cj8nbLw75", height: "5000") {
    code
    state {
      address
      balance
      context {
        genesisTime
        renaissanceTime
      }
      data {
        value
        typeUrl
      }
      issuer
      migratedFrom
      migratedTo
      moniker
      nonce
      numAssets
      numTxs
      pk
      poke {
        amount
        dailyLimit
        leftover
      }
      stake {
        totalReceivedStakes
        totalStakes
        totalUnstakes
      }
      type {
        address
        hash
        pk
        role
      }
    }
  }
}
```

---

### Get Asset State

---

`rpc get_asset_state(stream RequestGetAssetState) returns (stream ResponseGetAssetState);`

#### RequestGetAssetState

| Name    | Data Type | Default | Required |
| :------ | :-------- | :------ | :------- |
| address | string    |         |          |
| keys    | [string]  |         |          |
| height  | uint64    |         |          |

```protobuf
message RequestGetAssetState {
  string address = 1;
  repeated string keys = 2;
  uint64 height = 3;
}
```

---

#### ResponseGetAssetState

| Name  | Data Type  | Default | Required |
| :---- | :--------- | :------ | :------- |
| code  | StatusCode |         |          |
| state | AssetState |         |          |

```protobuf
message ResponseGetAssetState {
  StatusCode code = 1;
  AssetState state = 2;
}
```

#### GRPC example

```elixir
> ForgeSdk.get_asset_state(ForgeAbi.RequestGetAssetState.new(address: "zjdjh65vHxvvWfj3xPrDoUDYp1aY6xUCV21b"))
%ForgeAbi.AssetState{
  address: "zjdjh65vHxvvWfj3xPrDoUDYp1aY6xUCV21b",
  consumed_time: nil,
  context: %ForgeAbi.StateContext{
    genesis_time: %Google.Protobuf.Timestamp{
      nanos: 516124000,
      seconds: 1555455720
    },
    genesis_tx: "001F28BDC291B0DABE799E0A4D8462AD78B0C292F797CF8B79121D0542B4ADBB",
    renaissance_time: %Google.Protobuf.Timestamp{
      nanos: 516124000,
      seconds: 1555455720
    },
    renaissance_tx: "180CA498ADC4081222AE5870367F31FF267DC1105104816EAF8D7DA0FE0B91FD"
  },
  data: %Google.Protobuf.Any{
    type_url: "fg:x:random_data",
    value: "Veritatis modi vel et.2019-04-16T23:02:01.316194Z"
  },
  issuer: "z1UiaiE5xEzxMoKNemvqMk83cuApV7XUoSw",
  moniker: "Deshawn Spinka",
  owner: "z1fE9AW3cFhCt6ES5EaKVfi2G7yjmbX1mVf",
  readonly: false,
  stake: %ForgeAbi.StakeContext{
    recent_received_stakes: %ForgeAbi.CircularQueue{
      circular: true,
      fifo: false,
      items: [],
      max_items: 128,
      type_url: "fg:x:address"
    },
    recent_stakes: %ForgeAbi.CircularQueue{
      circular: true,
      fifo: false,
      items: [],
      max_items: 128,
      type_url: "fg:x:address"
    },
    total_received_stakes: %ForgeAbi.BigUint{value: <<0>>},
    total_stakes: %ForgeAbi.BigUint{value: <<0>>},
    total_unstakes: %ForgeAbi.BigUint{value: <<0>>}
  },
  transferrable: true,
  ttl: 0
}
```

#### GraphQL example

```graphql
{
  getAssetState(address: "zjdjh65vHxvvWfj3xPrDoUDYp1aY6xUCV21b") {
    state {
      address
      consumedTime
      issuer
      data {
        typeUrl
        value
      }
      moniker
      owner
      readonly
      transferrable
      ttl
    }
    code
  }
}
```

---

### Get Stake State

---

`rpc get_stake_state(stream RequestGetStakeState) returns (stream ResponseGetStakeState);`

#### RequestGetStakeState

| Name    | Data Type | Default | Required |
| :------ | :-------- | :------ | :------- |
| address | string    |         |          |
| keys    | [string]  |         |          |
| height  | uint64    |         |          |

```protobuf
message RequestGetStakeState {
  string address = 1;
  repeated string keys = 2;
  uint64 height = 3;
}
```

---

#### ResponseGetAccountState

| Name  | Data Type  | Default | Required |
| :---- | :--------- | :------ | :------- |
| code  | StatusCode |         |          |
| state | StakeState |         |          |

```protobuf
message ResponseGetStakeState {
  StatusCode code = 1;
  StakeState state = 2;
}
```

#### GRPC example

```elixir

```

#### GraphQL example

```graphql

```

---

### Get Forge State

---

`rpc get_forge_state(RequestGetForgeState) returns (ResponseGetForgeState)`

#### RequestGetForgeState

| Name   | Data Type | Default | Required |
| :----- | :-------- | :------ | :------- |
| keys   | [string]  |         |          |
| height | uint64    |         |          |

```protobuf
message RequestGetForgeState {
  repeated string keys = 1;
  uint64 height = 3;
}
```

---

#### ResponseGetForgeState

| Name  | Data Type  | Default | Required |
| :---- | :--------- | :------ | :------- |
| code  | StatusCode |         |          |
| state | ForgeState |         |          |

```protobuf
message ResponseGetForgeState {
  StatusCode code = 1;
  ForgeState state = 2;
}
```

#### GRPC example

```elixir
iex(20)> ForgeSdk.get_forge_state()
%ForgeAbi.ForgeState{
  address: "forge_state",
  consensus: %ForgeAbi.ConsensusParams{
    max_bytes: 300000,
    max_candidates: 256,
    max_gas: -1,
    max_validators: 64,
    param_changed: false,
    pub_key_types: ["ed25519"],
    validator_changed: false,
    validators: [
      %ForgeAbi.Validator{
        address: "zysx1BDGoERwg64AwSfVbD7TVH249C5mSCN9",
        power: 10
      }
    ]
  },
  data: nil,
  data_version: "1.5",
  .....
```

#### GraphQL example

```graphql
{
  getForgeState {
    code
    state {
      address
      consensus {
        maxBytes
        maxCandidates
        maxGas
        maxValidators
        paramChanged
        validatorChanged
      }
      dataVersion
      forgeAppHash
      version
      pokeConfig {
        address
        amount
        balance
        dailyLimit
      }
      stakeConfig {
        timeoutGeneral
        timeoutStakeForNode
      }
      tasks {
        key
      }
      token {
        decimal
        description
        icon
        inflationRate
        initialSupply
        name
        symbol
        totalSupply
        unit
      }
      txConfig {
        maxAssetSize
        maxListSize
        maxMultisig
        minimumStake
      }
      version
    }
  }
}
```

---
