# 统计RPC

统计RPC的目标是询问统计数据、收集给定时段内的实时或历史值。

## RPC列表

- [获取Forge统计数据](#get-forge-stats)
- [列出交易](#list-transactions)
- [列出](#list-assets)
- [列出抵押](#list-stakes)
- [列出账户](#list-account)
- [列出顶尖账户](#list-top-accounts)
- [列出资产交易](#list-asset-transactions)
- [列出区块](#list-blocks)
- [获取健康状态](#get-health-status)

---

### 获取Forge统计

---

`rpc get_forge_stats(RequestGetForgeStats) returns (ResponseGetForgeStats)`

#### RequestGetForgeStats

| 名称         | 数据类型 | 默认 | 必须 |
| :----------- | :-------- | :------ | :------- |
| 以下之一 |           |         |          |
| day_info     | ByDay     |         |          |
| 日期         | ByHour    |         |          |


```protobuf
message RequestGetForgeStats {
  oneof value {
    ByDay day_info = 1;
    ByHour date = 2;
  }
}

message ByDay {
  string start_date = 1;
  string end_date = 2;
}

message ByHour {
  string date = 1;
}
```

---

#### ResponseGetForgeStats

| 名称        | 数据类型  | 默认 | 必须 |
| :---------- | :--------- | :------ | :------- |
| 代码        | StatusCode |         |          |
| forge_stats | ForgeStats |         |          |

```protobuf
message ResponseGetForgeStats {
  StatusCode code = 1;
  ForgeStats forge_stats = 2;
}

message ForgeStats {
  repeated uint64 num_blocks = 1;
  repeated uint64 num_txs = 2;
  repeated BigUint num_stakes = 3;
  repeated uint32 num_validators = 4;
  repeated uint64 num_account_migrate_txs = 5;
  repeated uint64 num_create_asset_txs = 6;
  repeated uint32 num_consensus_upgrade_txs = 7;
  repeated uint64 num_declare_txs = 8;
  repeated uint64 num_declare_file_txs = 9;
  repeated uint64 num_exchange_txs = 10;
  repeated uint64 num_stake_txs = 11;
  repeated uint32 num_sys_upgrade_txs = 12;
  repeated uint64 num_transfer_txs = 13;
  repeated uint64 num_update_asset_txs = 14;
  repeated uint64 num_consume_asset_txs = 15;
  repeated uint64 num_poke_txs = 16;
  repeated uint32 tps = 17;
  uint32 max_tps = 18;                // maximum tps in given time range
  uint32 avg_tps = 19;                // average tps in given time range
  float avg_block_time = 20;          // average blocks in given time range
}
```


#### GRPC示例

[1] 实时统计

``` elixir
> realtime = ForgeAbi.RequestGetForgeStats.new
%ForgeAbi.RequestGetForgeStats{value: nil}
> ForgeSdk.get_forge_stats(realtime)
```

[2] 一日统计

```elixir
> by_hour_stats = ForgeAbi.RequestGetForgeStats.new(value: {:date, %ForgeAbi.ByHour{date: "2019-04-16"}})
%ForgeAbi.RequestGetForgeStats{
  value: {:date, %ForgeAbi.ByHour{date: "2019-03-16"}}
}
> ForgeSdk.get_forge_stats(by_hour_stats)
```

[3] 日期范围统计

```elixir
> by_day_stats = ForgeAbi.RequestGetForgeStats.new(value: {:day_info, %ForgeAbi.ByDay{end_date: "2019-04-19", start_date: "2019-04-16"}})
%ForgeAbi.RequestGetForgeStats{
  value: {:day_info,
   %ForgeAbi.ByDay{end_date: "2019-04-19", start_date: "2019-04-16"}}
}
> ForgeSdk.get_forge_stats(by_day_stats)
```

#### GraphQL示例

[1] 实时统计

```graphql
{
  getForgeStas{
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}
```

[2] 一日统计

```graphql
{
  getForgeStatsByHour(date: "2019-03-16"){
    forgeStats{
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}
```

[3] 日期范围统计

```graphql
{
  getForgeStatsByDay(startDate: "2019-04-16", endDate:"2019-04-20"){
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}

{
  getForgeStatsByDay(endDate:"2019-03-20"){
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}

{
  getForgeStatsByDay(startDate: "2019-03-16"){
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}
```

---

### 列出交易

---

`rpc list_transactions(RequestListTransactions) returns (ResponseListTransactions);`

#### RequestListTransactions

| 名称            | 数据类型      | 默认 | 必须 |
| :-------------- | :------------- | :------ | :------- |
| paging          | PageInput      |         |          |
| time_filter     | TimeFilter     |         |          |
| address_filter  | AddressFilter  |         |          |
| validity_filter | ValidityFilter |         |          |

---

```protobuf
message RequestListTransactions {
  PageInput paging = 1;
  TimeFilter time_filter = 2;
  AddressFilter address_filter = 3;
  TypeFilter type_filter = 4;
  ValidityFilter validity_filter = 5;
}
```

#### ResponseListTransactions

| 名称         | 数据类型             | 默认 | 必须 |
| :----------- | :-------------------- | :------ | :------- |
| 代码         | StatusCode            |         |          |
| 页面         | PageInfo              |         |          |
| 交易 | [IndexedTransaction]] |         |          |


```protobuf
message ResponseListTransactions {
  StatusCode code = 1;
  PageInfo page = 2;
  repeated IndexedTransaction transactions = 3;
}
```

#### GRPC示例

```elixir
> ForgeSdk.list_transactions(ForgeAbi.RequestListTransactions.new())
{[
   %ForgeAbi.IndexedTransaction{
     code: 0,
     hash: "6679A46A261590EE8FE0059180AB758C10D61BE2879988EBD2E6E154E319CB14",
     receiver: "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
     sender: "z1du4eVCz7SFs5qgiGsHiZQLQQDB4EtMyHq",
     time: "2019-04-16 21:24:51.000000Z",
     tx: %ForgeAbi.Transaction{
       chain_id: "forge",
       from: "z1du4eVCz7SFs5qgiGsHiZQLQQDB4EtMyHq",
       itx: %Google.Protobuf.Any{
       ....
```

#### GraphQL示例

```graphql
{
  listTransactions (typeFilter:{types: ["declare", "poke"]}){
    code
    transactions {
      code
      hash
      receiver
      sender
      time
      type
      valid
    }
  }
}
```

---

### 列出资产

---

`rpc list_assets(RequestListAssets) returns (ResponseListAssets);`

#### RequestListAssets

| 名称          | 数据类型 | 默认 | 必须 |
| :------------ | :-------- | :------ | :------- |
| 分页        | PageInput |         |          |
| owner_address | 字符串    |         |          |


```protobuf
message RequestListAssets {
  PageInput paging = 1;
  string owner_address = 2;
}
```

---

#### ResponseListAssets

| 名称   | 数据类型           | 默认 | 必须 |
| :----- | :------------------ | :------ | :------- |
| 代码   | StatusCode          |         |          |
| 页面   | PageInfo            |         |          |
| 资产 | [IndexedAssetState] |         |          |


```protobuf
message ResponseListAssets {
  StatusCode code = 1;
  PageInfo page = 2;
  repeated IndexedAssetState assets = 3;
}
```

#### GRPC示例

```elixir
> ForgeSdk.list_assets(ForgeAbi.RequestListAssets.new(owner_address: "z1SQYaJKUYksuev7ys465jPPyY5NX7sm3gX"))
{[
   %ForgeAbi.IndexedAssetState{
     address: "zjdpQe1af1uzXZYHUNy3AxjYPGrTdMtFRVmp",
     genesis_time: "2019-04-16 22:47:21.000000Z",
     moniker: "Schuyler Mann",
     owner: "z1SQYaJKUYksuev7ys465jPPyY5NX7sm3gX",
     readonly: false,
     renaissance_time: "2019-04-16 22:47:21.000000Z"
   }
 ],
 %ForgeAbi.PageInfo{
   cursor: "6sBGNbAnj%2BnQLoUhS4Ys5Q%3D%3D",
   next: false,
   total: 1
 }}
```
#### GraphQL示例

```graphql
{
  listAssets(ownerAddress:"z1SQYaJKUYksuev7ys465jPPyY5NX7sm3gX"){
    assets {
      address
      genesisTime
      moniker
      owner
      readonly
      renaissanceTime
    }
    account {
      address
      balance
      genesisTime
      migratedFrom
      migratedTo
      moniker
      nonce
      numAssets
      numTxs
      renaissanceTime
      totalReceivedStakes
      totalStakes
      totalUnstakes
    }
    code
    page {
      cursor
      next
      total
    }
  }
}
```

---

### 列出抵押

---

`rpc list_stakes(RequestListStakes) returns (ResponseListStakes);`

#### RequestListStakes

| 名称           | 数据类型     | 默认 | 必须 |
| :------------- | :------------ | :------ | :------- |
| 分页         | PageInput     |         |          |
| address_filter | AddressFilter |         |          |


```protobuf
message RequestListStakes {
  PageInput paging = 1;
  AddressFilter address_filter = 2;
}
```

---

#### ResponseListStakes

| 名称   | 数据类型           | 默认 | 必须 |
| :----- | :------------------ | :------ | :------- |
| 代码   | StatusCode          |         |          |
| 页面   | PageInfo            |         |          |
| stakes | [IndexedStakeState] |         |          |


```protobuf
message ResponseListStakes {
  StatusCode code = 1;
  PageInfo page = 2;
  repeated IndexedStakeState stakes = 3;
}
```

#### GRPC示例

#### GraphQL示例


---

### 列出账户

---

`rpc list_account(RequestListAccount) returns (ResponseListAccount);`

#### RequestListAccount

| 名称          | 数据类型     | 默认 | 必须 |
| :------------ | :------------ | :------ | :------- |
| owner_address | owner_address |         |          |


```protobuf
message RequestListAccount {
  owner_address owner_address = 1;
}
```

---

#### ResponseListAccount

| 名称    | 数据类型           | 默认 | 必须 |
| :------ | :------------------ | :------ | :------- |
| 代码    | StatusCode          |         |          |
| 账户 | IndexedAccountState |         |          |


```protobuf
message ResponseListAccount {
  StatusCode code = 1;
  IndexedAccountState account = 2;
}
```

#### GRPC示例

``` elixir
> ForgeSdk.list_account(ForgeAbi.RequestListAccount.new(owner_address: "z1QMx2X81CnESS6ZjFiCiL8skdGkjW3GqxS"))
%ForgeAbi.IndexedAccountState{
  address: "z1QMx2X81CnESS6ZjFiCiL8skdGkjW3GqxS",
  balance: %ForgeAbi.BigUint{value: <<3, 120, 45, 172, 233, 217, 50, 100>>},
  genesis_time: "2019-04-16 21:24:25.000000Z",
  migrated_from: "",
  migrated_to: "",
  moniker: "Sporer",
  nonce: 6,
  num_assets: 2,
  num_txs: 5,
  recent_num_txs: [],
  renaissance_time: "2019-04-16 22:55:01.000000Z",
  total_received_stakes: %ForgeAbi.BigUint{value: <<0>>},
  total_stakes: %ForgeAbi.BigUint{value: <<0>>},
  total_unstakes: %ForgeAbi.BigUint{value: <<0>>}
}
```

#### GraphQL示例


---

### 列出顶尖账户

---

`rpc list_top_accounts(RequestListTopAccounts) returns (ResponseListTopAccounts);`

#### RequestListTopAccounts

| 名称   | 数据类型 | 默认 | 必须 |
| :----- | :-------- | :------ | :------- |
| 分页 | PageInput |         |          |


```protobuf
message RequestListTopAccounts {
  PageInput paging = 1;
}
```

---

#### ResponseListTopAccounts

| 名称     | 数据类型             | 默认 | 必须 |
| :------- | :-------------------- | :------ | :------- |
| 代码     | StatusCode            |         |          |
| 页面     | PageInfo              |         |          |
| 账户 | [IndexedAccountState] |         |          |


```protobuf
message ResponseListTopAccounts {
  StatusCode code = 1;
  PageInfo page = 2;
  repeated IndexedAccountState accounts = 3;
}
```
#### GRPC示例

```elixir
> ForgeSdk.list_top_accounts(ForgeAbi.RequestListTopAccounts.new(paging: ForgeAbi.PageInput.new(size: 1)))
{[
   %ForgeAbi.IndexedAccountState{
     address: "z1VxVgwPjMZmQkF6QimxtQF6iZBDd1b3tzu",
     balance: %ForgeAbi.BigUint{value: <<3, 120, 45, 172, 233, 217, 183, 252>>},
     genesis_time: "2019-04-16 21:24:29.000000Z",
     migrated_from: "",
     migrated_to: "",
     moniker: "Kunde",
     nonce: 11,
     num_assets: 4,
     num_txs: 10,
     recent_num_txs: [0, 0, 0, 0, 0, 0, 11],
     renaissance_time: "2019-04-16 22:59:35.000000Z",
     total_received_stakes: %ForgeAbi.BigUint{value: <<0>>},
     total_stakes: %ForgeAbi.BigUint{value: <<0>>},
     total_unstakes: %ForgeAbi.BigUint{value: <<0>>}
   }
 ],
 %ForgeAbi.PageInfo{
   cursor: "MXj8MaYD5dKmMbkAx0aqJA%3D%3D",
   next: true,
   total: 13716
 }}
```
#### GraphQL示例

```graphql
{
  listTopAccounts {
    code
    accounts {
      address
      balance
      genesisTime
      migratedFrom
      migratedTo
      moniker
      nonce
      numAssets
      numTxs
      renaissanceTime
      totalReceivedStakes
      totalStakes
      totalUnstakes
    }
    page {
      cursor
      next
      total
    }
  }
}
```
---

### 列出资产交易

---

`rpc ResponseListAssetTransactions(RequestListAssetTransactions) returns (ResponseListAssetTransactions);`

#### RequestListAssetTransactions

| 名称    | 数据类型 | 默认 | 必须 |
| :------ | :-------- | :------ | :------- |
| 分页  | PageInput |         |          |
| 地址 | 字符串    |         |          |


```protobuf
message RequestListAssetTransactions {
  PageInput paging = 1;
  string address = 2;
}
```

---

#### ResponseListAssetTransactions

| 名称         | 数据类型            | 默认 | 必须 |
| :----------- | :------------------- | :------ | :------- |
| 代码         | StatusCode           |         |          |
| 页面         | PageInfo             |         |          |
| 交易 | [IndexedTransaction] |         |          |


```protobuf
message ResponseListAssetTransactions {
  StatusCode code = 1;
  PageInfo page = 2;
  repeated IndexedTransaction transactions = 3;
}
```

#### GRPC示例

```elixir
> ForgeSdk.list_asset_transactions(ForgeAbi.RequestListAssetTransactions.new(address: "zjdpQe1af1uzXZYHUNy3AxjYPGrTdMtFRVmp"))
{[
   %ForgeAbi.IndexedTransaction{
     code: 0,
     hash: "001336AEE33FE4DC9F44E924169FCF854A7A82E7782E7B414B02B8223A371DA5",
     receiver: "",
     sender: "z1SQYaJKUYksuev7ys465jPPyY5NX7sm3gX",
     time: "2019-04-16 22:47:21.000000Z",
     tx: %ForgeAbi.Transaction{
       chain_id: "forge",
       from: "z1SQYaJKUYksuev7ys465jPPyY5NX7sm3gX",
       itx: %Google.Protobuf.Any{
         type_url: "fg:t:create_asset",
         value: <<10, 13, 83, 99, 104, 117, 121, 108, 101, 114, 32, 77, 97, 110,
           110, 18, 50, 10, 16, 102, 103, 58, 120, 58, 114, 97, 110, 100, 111,
           109, 95, 100, 97, 116, 97, 18, 30, ...>>
       },
       nonce: 6747302986,
       pk: <<254, 174, 89, 124, 139, 30, 219, 183, 248, 82, 159, 188, 49, 186,
         246, 173, 18, 44, 187, 157, 123, 120, 79, 89, 121, 75, 62, 123, 218,
         122, 187, 26>>,
       signature: <<75, 156, 38, 79, 235, 7, 198, 112, 231, 27, 172, 22, 160,
         163, 125, 172, 198, 255, 190, 171, 198, 100, 25, 129, 81, 202, 195,
         191, 146, 228, 215, 214, 69, 3, 130, 232, ...>>,
       signatures: []
     },
     type: "create_asset",
     valid: true
   }
 ],
 %ForgeAbi.PageInfo{
   cursor: "6sBGNbAnj%2BnQLoUhS4Ys5Q%3D%3D",
   next: false,
   total: 1
 }}
 ```

#### GraphQL示例

```graphql
{
  listAssetTransactions(address:"zjdpQe1af1uzXZYHUNy3AxjYPGrTdMtFRVmp"){
    transactions {
      code
      hash
      receiver
      sender
      time
      type
      valid
      tx {
        pk
        signature
        chainId
        from
        itx{
          __typename ... on UpdateAssetTx{
            address
            data{
              value
              typeUrl
            }
          }
             __typename ... on CreateAssetTx{
            address
            data{
              value
              typeUrl
            }
          }
        }
        nonce
        signatures {
          pk
          signature
          signer
        }
      }
    }
  }
}
```


---

### 列出区块

---

`rpc list_blocks(RequestListBlocks) returns (RequestListBlocks);`

#### RequestListBlocks

| 名称                   | 数据类型   | 默认 | 必须 |
| :--------------------- | :---------- | :------ | :------- |
| 分页                 | PageInput   |         |          |
| 提议者               | 字符串      |         |          |
| time_filter            | RangeFilter |         |          |
| height_filter          | RangeFilter |         |          |
| num_txs_filter         | RangeFilter |         |          |
| num_invalid_txs_filter | RangeFilter |         |          |

```protobuf
message RequestListBlocks {
  PageInput paging = 1;
  string proposer = 2;
  TimeFilter time_filter = 3;
  RangeFilter height_filter = 4;
  RangeFilter num_txs_filter = 5;
  RangeFilter num_invalid_txs_filter = 6;
}
```

---

#### RequestListBlocks

| 名称   | 数据类型      | 默认 | 必须 |
| :----- | :------------- | :------ | :------- |
| 代码   | StatusCode     |         |          |
| 页面   | PageInfo       |         |          |
| 区块 | [IndexedBlock] |         |          |


```protobuf
message ResponseListBlocks {
  StatusCode code = 1;
  PageInfo page = 2;
  repeated IndexedBlock blocks = 3;
}
```

#### GRPC示例

```elixir
> ForgeSdk.list_blocks(ForgeAbi.RequestListBlocks.new(height_filter: ForgeAbi.RangeFilter.new(from: 3000, to: 3200)))
{[
   %ForgeAbi.IndexedBlock{
     height: 3124,
     num_invalid_txs: 0,
     num_txs: 0,
     proposer: "7A797378314244476F455277673634417753665662443754564832343943356D53434E39",
     time: "2019-04-17 01:20:27.000000Z"
   },
   ...
 ],
 %ForgeAbi.PageInfo{
   cursor: "cK1GAXeWPHkBuMksAIvI4w%3D%3D",
   next: true,
   total: 125
 }}
```
#### GraphQL示例

```graphql
{
  listBlocks(heightFilter:{from: "3000", to: "3200"}){
    code
    page {
      cursor
      next
      total
    }
    blocks {
      height
      numInvalidTxs
      numTxs
      proposer
      time
    }
  }
}
```

---

### 获取健康状态

---

`rpc get_health_status(RequestGetHealthStatus) returns (RequestGetHealthStatus);`

#### RequestGetHealthStatus

| 名称 | 数据类型 | 默认 | 必须 |
| :--- | :-------- | :------ | :------- |
|      |           |         |          |



```protobuf
message RequestGetHealthStatus {}
```

---

#### ResponseGetHealthStatus

| 名称          | 数据类型    | 默认 | 必须 |
| :------------ | :----------- | :------ | :------- |
| 代码          | StatusCode   |         |          |
| health_status | HealthStatus |         |          |


```protobuf
message ResponseGetHealthStatus {
  StatusCode code = 1;
  HealthStatus health_status = 2;
}
```

#### GRPC示例

```elixir
> ForgeSdk.get_health_status(ForgeAbi.RequestGetHealthStatus.new())
%ForgeAbi.HealthStatus{
  consensus: %ForgeAbi.ConsensusStatus{
    block_height: 3210,
    health: true,
    synced: true
  },
  forge: %ForgeAbi.ForgeStatus{
    abci_server: %ForgeAbi.AbciServerStatus{
      abci_consensus: "ok",
      abci_info: "ok"
    },
    abi_server: "ok",
    forge_web: "ok",
    health: true
  },
  network: %ForgeAbi.NetworkStatus{health: false, num_peers: 0},
  storage: %ForgeAbi.StorageStatus{
    disk_space: %ForgeAbi.DiskSpaceStatus{forge_usage: "", total: ""},
    health: true,
    indexer_server: "ok",
    state_db: "ok"
  }
}
```
#### GraphQL示例

```graphql
{
  getHealthStatus{
    code
    healthStatus{
      consensus {
        blockHeight
        health
        synced
      }
      forge {
        abiServer
        forgeWeb
        health
      }
      network {
        health
        numPeers
      }
      storage {
        health
        indexerServer
        stateDb
      }
    }
  }
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzEwNjIzMjEzLDI4MDYzNTMwLC0yMTA4NT
M5MTY3LC0xMTMxNTkxNzI2XX0=
-->