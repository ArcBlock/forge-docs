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


Migrage an existing account from an old wallet to a new wallet.

## Overview

If your wallet's secret key is potentially exposed (e.g. you lost the paper that has printed secret key), for security purpose you issue an account migrate transaction and switch your old wallet to a newly generated wallet.

 After this migration, all your existing token balance are carried over in the new account, and the asset your previously owned are eligible to be transferred or be used. Once it is executed in the chain, your old account will be sealed and all reference to the old address will point to a new address.

## Transaction Structure

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
