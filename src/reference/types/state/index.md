---
title: 'State'
description: 'State'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'types'
  - 'state'
---

### AccountState

```protobuf
message AccountState {
  BigUint balance = 1;
  uint64 nonce = 2;
  uint64 num_txs = 3;
  string address = 4;
  bytes pk = 5;
  WalletType type = 6 [ deprecated = true ];
  string moniker = 7;
  StateContext context = 8;
  string issuer = 9;
  BigUint gas_balance = 10;

  // the address that is being migrated. Once this is set this account state is
  // read only. No further tx can alter this account state. And tx with "from"
  // equal to the old address will be rejected by Forge
  repeated string migrated_to = 13;
  repeated string migrated_from = 14;

  uint64 num_assets = 15;
  // 16-49 reserve for future

  StakeContext stake = 16;
  CircularQueue pinned_files = 17;
  PokeInfo poke = 18;
  // The current deposit this account has received. It cannot exceed the deposit
  // cap.
  BigUint deposit_received = 19;

  google.protobuf.Any data = 50;
}
```

### AssetState

```protobuf
message AssetState {
  string address = 1;
  string owner = 2;
  string moniker = 3;
  bool readonly = 4;
  bool transferrable = 5;
  uint32 ttl = 6;
  // once it is consumed, it is untransferrable
  google.protobuf.Timestamp consumed_time = 7;
  // who issued the asset
  string issuer = 8;
  // parent address for the asset state, e.g. a ticket is inherited from an
  // event
  string parent = 9;

  // 10-12 is reserved

  StakeContext stake = 13;
  StateContext context = 14;

  // 13-49 reserve for future

  google.protobuf.Any data = 50;
}
```

### BlacklistState

```protobuf
message BlacklistState { repeated string address = 1; }
```

### CoreProtocol

```protobuf
message CoreProtocol {
  string name = 1;
  string address = 2;
}
```

### ForgeState

```protobuf
message ForgeState {
  string address = 1;
  // consensus parameters, in future we shall be able to modify it
  ConsensusParams consensus = 2;
  map<uint64, UpgradeTasks> tasks = 3;
  map<uint32, StakeSummary> stake_summary = 4;
  string version = 5;
  // string data_version = 6; current data version deprecated

  // app state returned by forge app
  bytes forge_app_hash = 7;

  ForgeToken token = 8;
  TransactionConfig tx_config = 9;
  StakeConfig stake_config = 10;
  PokeConfig poke_config = 11;
  repeated CoreProtocol protocols = 12;
  map<string, uint32> gas = 13;
  UpgradeInfo upgrade_info = 14;

  google.protobuf.Any data = 15; // forge app can define their own app state
}
```

### DelegateOpState

```protobuf
message DelegateOpState {
  // all the individual rules in DelegateTx will be concat into one per type_url
  // by "AND"
  string rule = 1;

  uint64 num_txs = 2;
  uint64 num_txs_delta = 3;

  BigUint balance = 4;
  BigUint balance_delta = 5;
}
```

### DelegateOpState

```protobuf
message DelegateState {
  string address = 1;
  map<string, DelegateOpState> ops = 2;

  // state context, replace exiting fields
  StateContext context = 14;
  // forge app can extend this
  google.protobuf.Any data = 15;
}
```

### ProtocolState

```protobuf
message ProtocolState {
  string address = 1;
  DeployProtocolTx itx = 2;
  // root hash of the MPT of this tx protocol
  bytes root_hash = 3;
  ProtocolStatus status = 4;

  repeated string migrated_to = 12;
  repeated string migrated_from = 13;

  StateContext context = 14;
  google.protobuf.Any data = 15; // forge app can define their own app state
}
```

### RootState

```protobuf
message RootState {
  string address = 1;
  bytes account = 2;
  bytes asset = 3;
  bytes receipt = 4;
  bytes protocol = 5;
  bytes governance = 6;
  bytes custom = 7;
}
```

### StakeState

```protobuf
message StakeState {
  string address = 1;
  string from = 2;
  string to = 3;
  BigUint balance = 4;
  string message = 5;

  // state context, replace exiting fields
  StateContext context = 14;
  // forge app can extend this
  google.protobuf.Any data = 15;
}
```

### StatisticsState

```protobuf
message StatisticsState {
  string address = 1;
  uint64 num_blocks = 2;
  uint64 num_txs = 3;
  BigUint num_stakes = 4;
  uint32 num_validators = 5;
  TxStatistics tx_statistics = 6;
}
```

### SwapState

```protobuf
message SwapState {
  string hash = 1;
  string address = 2;
  bytes hashkey = 3;
  string sender = 4;
  string receiver = 5;
  BigUint value = 6;
  repeated string assets = 7;
  uint32 locktime = 8;
  bytes hashlock = 9;
  StateContext context = 10;
}
```

### TetherInfo

```protobuf
message TetherInfo {
  bool available = 1;
  string hash = 2;
}
```

### TetherState

```protobuf
message TetherState {
  string hash = 1;
  bool available = 2;
  string custodian = 3;
  string depositor = 4;
  string withdrawer = 5;
  BigUint value = 6;
  BigUint commission = 7;
  BigUint charge = 8;
  string target = 9;
  google.protobuf.Timestamp locktime = 10;
  string address = 11;
}
```
