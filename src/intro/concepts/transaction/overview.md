# Transactions

In Forge, the smallest unit of activity that can happen on an ABT Node is called a **transaction**. Everything that occurs on an ABT Node is a combination of various transactions.

Forge supports a number of transactions, but they fall into four primary groups:

* Asset-related: aids the creation and manipulation of non-fungible assets
* Declare-related: used to register new items to the chain
* Transfer-related: used to transfer tokens and assets between accounts
* Governance-related: used for administrative tasks like creating polls and upgrades

## Transaction Body

A typical transaction looks as follows:

```
message Transaction {
  string from = 1;
  uint64 nonce = 2;
  string chain_id = 3;
  bytes pk = 4;
  bytes signature = 13;
  repeated Multisig signatures = 14;
  google.protobuf.Any itx = 15;
}
```

| Parameter | Description |
| - | - |
| `from` | Address of the sender initiating the transaction |
| `nonce` | Integer tracking how many transactions the sender has initiated |
| `chain_id` | String tracking the chain on which the transaction occurs |
| `pk` | Sender's public key |
| `signature` | Sender's signature for this transaction; used by receiver to verify that the contents of the transactions has not been tampered with |
| `signatures` | Extra multisig if the transaction requires additional endorsement from the receiver or a third-party account |
| `itx` | Defines the transaction's type and what activity the transaction represents (e.g., `itx = TransferTx;` indicates a transfer of assets from one account to another) |

## The Transaction Protocol

The transaction protocol is used to execute transactions. You can install, upgrade, activate, or deactivate the transaction protocol on all running nodes of a chain on an ad hoc basis.