# Type

## Type List

- AbciContext
- BigUint
- BigSint
- BlockInfo
- ChainInfo
- CircularQueue
- ConsensusParams
- ForgeStatistics
- GenesisInfo
- GeoInfo
- Multisig
- NetInfo
- NodeInfo
- PeerInfo
- StakeContext
- StakeSummary
- StateContext
- [Transaction](#Transaction)
- [TransactionInfo](#TransactionInfo)
- [TxStatistics](#TxStatistics)
- [TxStatus](#TxStatus)
- [UnconfirmedTxs](#unconfirmedtxs)
- [UpgradeTask]
- [UpgradeTasks]
- [Validator]
- ValidatorInfo
- ValidatorsInfo
- WalletType
- WalletInfo

## Transaction

```protobuf
message Transaction {
  string from = 1;
  uint64 nonce = 2;
  bytes signature = 3;
  // use DID for the chain. "did:" prefix is omitted
  string chain_id = 4;
  // we will support multiple signatures in case of certain tx need multiple
  // parties' signature.
  repeated Multisig signatures = 5;
  // at current version we don't have a VM to process byte
  // code so this should always be empty. Forge will reject
  // tx with non-empty byte_code
  // bytes byte_code = 6;

  google.protobuf.Any itx = 7;
}
```

## TransactionInfo
```protobuf
message TransactionInfo {
  Transaction tx = 1;
  uint64 height = 2;
  uint32 index = 3;
  string hash = 4;
  repeated abci_vendor.KVPair tags = 5;
  StatusCode code = 6;
}
```

## TxStatistics

```protobuf
message TxStatistics {
  uint64 num_account_migrate_txs = 1;
  uint64 num_create_asset_txs = 2;
  uint32 num_consensus_upgrade_txs = 3;
  uint64 num_declare_txs = 4;
  uint64 num_declare_file_txs = 5;
  uint64 num_exchange_txs = 6;
  uint64 num_stake_txs = 7;
  uint32 num_sys_upgrade_txs = 8;
  uint64 num_transfer_txs = 9;
  uint64 num_update_asset_txs = 10;
  uint64 num_consume_asset_txs = 11;
}
```

## TxStatus

```protobuf
message TxStatus {
  StatusCode code = 1;
  string hash = 2;
}

```

## UnconfirmedTxs

```protobuf
message UnconfirmedTxs {
  uint32 n_txs = 1;
  repeated Transaction txs = 2;
}
```

## UpgradeTask

```protobuf
message UpgradeTask {
  UpgradeType type = 1;
  string data_hash = 2;               // data shall be first put into IPFS
  repeated UpgradeAction actions = 4; // actions
}
```


## UpgradeTasks

```protobuf
message UpgradeTasks { repeated UpgradeTask item = 1; }
```

## Validator

```protobuf
message Validator {
  string address = 1;
  // setting power to 0 will remove existing address from validator
  uint64 power = 2;
}
```

## ValidatorInfo

```protobuf
message ValidatorInfo {
  string address = 1;
  abci_vendor.PubKey pub_key = 2;
  uint64 voting_power = 3;
  string proposer_priority = 4;
  string name = 5;
}
```

## ValidatorsInfo

```protobuf
message ValidatorsInfo {
  uint64 block_height = 1;
  repeated ValidatorInfo validators = 2;
}
```


## WalletType

```protobuf
message WalletType {
  KeyType pk = 1;
  HashType hash = 2;
  EncodingType address = 3;
  RoleType role = 4;
}
```

## WalletInfo

```protobuf
message WalletInfo {
  WalletType type = 1;
  bytes sk = 2;
  bytes pk = 3;
  string address = 4;
}
```
