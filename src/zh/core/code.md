# Forge 状态代码


```proto

enum StatusCode {
  ok = 0;

  // common code
  // 1 - 15
  invalid_nonce = 1;
  invalid_signature = 2;
  invalid_sender_state = 3;
  invalid_receiver_state = 4;
  insufficient_data = 5;
  insufficient_fund = 6;
  invalid_owner = 7;
  invalid_tx = 8;
  unsupported_tx = 9;
  expired_tx = 10;
  too_many_txs = 11;

  // 16 - 2047 various errors
  invalid_moniker = 16;
  invalid_passphrase = 17;

  invalid_multisig = 20;
  invalid_wallet = 21;
  invalid_chain_id = 22;

  consensus_rpc_error = 24;
  storage_rpc_error = 25;
  noent = 26;
  account_migrated = 27;

  unsupported_stake = 30;
  insufficient_stake = 31;
  invalid_stake_state = 32;
  expired_wallet_token = 33;
  banned_unstake = 34;
  invalid_asset = 35;
  invalid_tx_size = 36;
  invalid_signer_state = 37;
  invalid_forge_state = 38;
  expired_asset = 39;
  untransferrable_asset = 40;
  readonly_asset = 41;
  consumed_asset = 42;

  forbidden = 403;
  internal = 500;
  timeout = 504;

  // user defined status code shall start from 600
}
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTk5MjkzMTg2NF19
-->