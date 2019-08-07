# 状态RPC

状态RPC帮助用户获取账户状态、资产、抵押和forge。

## RPC列表

- [获取账户状态](#get-account-state)
- [获取资产状态](#get-asset-state)
- [获取抵押状态](#get-stake-state)
- [获取Forge状态](#get-forge-state)

---

### 获取账户状态

---

`rpc get_account_state(stream RequestGetAccountState) returns (stream ResponseGetAccountState);`

#### RequestGetAccountState

| 名称    | 数据类型 | 默认 | 必须 |
| :------ | :-------- | :------ | :------- |
| 地址 | 这非常    |         |          |
| 没有    | [字符串]  |         |          |
| 高度  | uint64    |         |          |


```protobuf
message RequestGetAccountState {
  string address = 1;
  repeated string keys = 2;
  uint64 height = 3;
}
```

---

#### ResponseGetAccountState

| 名称  | 数据类型    | 默认 | 必须 |
| :---- | :----------- | :------ | :------- |
| 代码  | StatusCode   |         |          |
| 状态 | AccountState |         |          |

```protobuf
message ResponseGetAccountState {
  StatusCode code = 1;
  AccountState state = 2;
}
```
#### GRPC示例

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


#### GraphQL示例

```graphql

{
  getAccountState(address:"z1QNTPxDUCbh68q6ci6zUmtnT2Cj8nbLw75", height: "5000"){
    code
    state {
      address
      balance
      context {
        genesisTime
        renaissanceTime
      }
      data{
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

### 获取资产状态

---

`rpc get_asset_state(stream RequestGetAssetState) returns (stream ResponseGetAssetState);`

#### RequestGetAssetState

| 名称    | 数据类型 | 默认 | 必须 |
| :------ | :-------- | :------ | :------- |
| 地址 | 字符串    |         |          |
| 密钥    | [字符串]  |         |          |
| 高度  | uint64    |         |          |

```protobuf
message RequestGetAssetState {
  string address = 1;
  repeated string keys = 2;
  uint64 height = 3;
}

```

---

#### ResponseGetAssetState

| 名称  | 数据类型  | 默认 | 必须 |
| :---- | :--------- | :------ | :------- |
| 代码  | StatusCode |         |          |
| 状态 | AssetState |         |          |


```protobuf
message ResponseGetAssetState {
  StatusCode code = 1;
  AssetState state = 2;
}
```
#### GRPC示例

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


#### GraphQL示例

```graphql
{
  getAssetState(address:"zjdjh65vHxvvWfj3xPrDoUDYp1aY6xUCV21b"){
    state {
      address
      consumedTime
      issuer
      data{
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


### 获取抵押状态


---

`rpc get_stake_state(stream RequestGetStakeState) returns (stream ResponseGetStakeState);`

#### RequestGetStakeState

| 名称    | 数据类型 | 默认 | 必须 |
| :------ | :-------- | :------ | :------- |
| 地址 | 字符串    |         |          |
| 密钥    | [字符串]  |         |          |
| 高度  | uint64    |         |          |


```protobuf

message RequestGetStakeState {
  string address = 1;
  repeated string keys = 2;
  uint64 height = 3;
}
```

---

#### ResponseGetAccountState

| 名称  | 数据类型  | 默认 | 必须 |
| :---- | :--------- | :------ | :------- |
| 代码  | StatusCode |         |          |
| 状态 | StakeState |         |          |


```protobuf
message ResponseGetStakeState {
  StatusCode code = 1;
  StakeState state = 2;
}
```
#### GRPC示例

```elixir
```


#### GraphQL示例

```graphql
```


---
### 获取Forge状态

---

`rpc get_forge_state(RequestGetForgeState) returns (ResponseGetForgeState)`

#### RequestGetForgeState

| 名称   | 数据类型 | 默认 | 必须 |
| :----- | :-------- | :------ | :------- |
| 密钥   | [字符串]  |         |          |
| 高度 | uint64    |         |          |

```protobuf
message RequestGetForgeState {
  repeated string keys = 1;
  uint64 height = 3;
}
```

---

#### ResponseGetForgeState

| 名称  | 数据类型  | 默认 | 必须 |
| :---- | :--------- | :------ | :------- |
| 代码  | StatusCode |         |          |
| 状态 | ForgeState |         |          |

```protobuf
message ResponseGetForgeState {
  StatusCode code = 1;
  ForgeState state = 2;
}
```
#### GRPC示例

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


#### GraphQL示例

```graphql
{
  getForgeState{
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
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTAyNDc0NjQ2NSwtMTEyMjk3NTMxOCwtMT
gyMTMwNDIyLC02NDY5OTAwNDgsMTI5MjMzNTYwMl19
-->