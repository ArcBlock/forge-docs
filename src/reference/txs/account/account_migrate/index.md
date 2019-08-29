---
title: 'Account Migrate Transaction'
description: 'Account Migrate Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'account'
  - 'account_migrate'
---

## What is AccountMigrateTx

Migrage an existing account to a new account.

## Why AccountMigrateTx

**AccountMigrateTx** helps you switch your old wallet to a newly generated wallet, when your old wallet's secret key is potentially exposed (e.g. you lost the paper that has printed secret key).

## Result of AccountMigrateTx

After this transaction is executed, all your previous assets and token balance in the old wallet will be carried over to the new wallet. Meanwhile, your old account will be sealed and all reference to the old address will be redirected to the new address.

## Code Sample: AccountMigrateTx

```protobuf
message AccountMigrateTx {
  bytes pk = 1;
  WalletType type = 2 [ deprecated = true ];
  string address = 3;

  google.protobuf.Any data = 15;
}
```
|  Name   |                                       Data Type                                       |              Explanation               |
| :------ | :------------------------------------------------------------------------------------ | :------------------------------------- |
| pk      | bytes                                                                                 | Public key of new wallet               |
| type    | WalletType                                                                            | (Deprecated) Wallet type of new wallet |
| address | string                                                                                | Address of new wallet                  |
| data    | [google.protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | User customed data                     |

## Example Usage

### Step 1: Use your old wallet

```elixir
old_wallet = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: old_wallet)
```

### Step 2: Migrage your old wallet to a new one

```elixir
new_wallet = ForgeSdk.create_wallet()
ForgeSdk.account_migrate(ForgeAbi.AccountMigrateTx.new(pk: new_wallet.pk, address: new_wallet.address), wallet: old_wallet)
```
