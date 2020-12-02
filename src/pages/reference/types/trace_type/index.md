---
title: 'Trace Type'
description: 'Trace Type'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'types'
  - 'trace_type'
---


### AbciServerStatus

```protobuf
message AbciServerStatus{
  string abci_consensus = 1;
  string abci_info = 2;
}
```

### AddressFilter

```protobuf
message AddressFilter {
  string sender = 1;
  string receiver = 2;
  Direction direction = 3;
}
```

### BlockInfoSimple

```protobuf
message BlockInfoSimple {
  uint64 height = 1;
  uint32 num_txs = 2;
  google.protobuf.Timestamp time = 3;
  bytes app_hash = 4;
  bytes proposer = 5;
  uint64 total_txs = 6;
  repeated string txs_hashes = 7;
  repeated string invalid_txs_hashes = 8;
  bytes consensus_hash = 9;
  bytes data_hash = 10;
  bytes evidence_hash = 11;
  bytes last_commit_hash = 12;
  bytes last_results_hash = 13;
  bytes next_validators_hash = 14;
  bytes validators_hash = 15;
  abci_vendor.Version version = 16;
  abci_vendor.BlockID last_block_id = 17;
}
```

### ConsensusStatus

```protobuf
message ConsensusStatus{
  bool health = 1;
  bool synced = 2;
  uint64 block_height = 3;
}
```

### Direction

```protobuf
enum Direction {
  mutual = 0;
  one_way = 1;
  union = 2;
}
```

### DiskSpaceStatus

```protobuf
message DiskSpaceStatus {
  string forge_usage = 1;
  string total = 2;
}
```

### ForgeStatus

```protobuf
message ForgeStatus{
  bool health = 1;
  string abi_server = 2;
  string forge_web = 3;
  AbciServerStatus abci_server = 4;
}
```

### HealthStatus

```protobuf
message HealthStatus {
  ConsensusStatus consensus = 1;
  NetworkStatus network = 2;
  StorageStatus storage = 3;
  ForgeStatus forge = 4;
}
```

### IndexedAccountState

```protobuf
message IndexedAccountState {
  string address = 1;
  BigUint balance = 2;
  uint64 num_assets = 3;
  uint64 num_txs = 4;
  uint64 nonce = 5;
  string genesis_time = 6;
  string renaissance_time = 7;
  string moniker = 8;
  string migrated_from = 9;
  string migrated_to = 10;
  BigUint total_received_stakes = 11;
  BigUint total_stakes = 12;
  BigUint total_unstakes = 13;
  repeated uint64 recent_num_txs = 14;
}
```

### IndexedAssetState

```protobuf
message IndexedAssetState {
  string address = 1;
  string owner = 2;
  string genesis_time = 3;
  string renaissance_time = 4;
  string moniker = 5;
  bool readonly = 6;
}
```

### IndexedBlock

```protobuf
message IndexedBlock {
  uint64 height = 1;
  string time = 2;
  string proposer = 3;
  uint64 num_txs = 4;
  uint64 num_invalid_txs = 5;
}
```

### IndexedStakeState

```protobuf
message IndexedStakeState {
  string address = 1;
  BigUint balance = 2;
  string sender = 3;
  string receiver = 4;
  string genesis_time = 5;
  string renaissance_time = 6;
  string message = 7;
  uint32 type = 8;
}
```

### IndexedTransaction

```protobuf
message IndexedTransaction {
  string hash = 1;
  string sender = 2;
  string receiver = 3;
  string time = 4;
  string type = 5;
  Transaction tx = 6;
  bool valid = 20;
  StatusCode code = 21;
}
```

### NetworkStatus

```protobuf
message NetworkStatus{
  bool health = 1;
  uint32 num_peers = 2;
}
```

### PageInfo

```protobuf
message PageInfo {
  string cursor = 1;
  bool next = 2;
  uint32 total = 3;
}
```

### PageInput

```protobuf
message PageInput {
  string cursor = 1;
  uint32 size = 2;
  repeated PageOrder order = 3;
}
```

### PageOrder

```protobuf
message PageOrder {
  string field = 1;
  string type = 2;
}
```

### RangeFilter

```protobuf
message RangeFilter {
  uint64 from = 1;
  uint64 to = 2;
}
```

### StorageStatus

```protobuf
message StorageStatus{
  bool health = 1;
  string indexer_server = 2;
  string state_db = 3;
  DiskSpaceStatus disk_space = 4;
}
```

### TimeFilter

```protobuf
message TimeFilter {
  string start_date_time = 1;
  string end_date_time = 2;
}
```

### TypeFilter

```protobuf
message TypeFilter {
  repeated string types = 1;
}
```

### Validity

```protobuf
enum Validity {
  both = 0;
  valid = 1;
  invalid = 2;
}
```

### ValidityFilter

```protobuf
message ValidityFilter {
  Validity validity = 1;
}
```
