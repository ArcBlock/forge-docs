---
title: 'Account Migrate Transaction'
description: 'Account Migrate Transaction'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'account'
  - 'account_migrate'
---

**`AccountMigrateTx`** is used to migrate the contents of an existing wallet to a new wallet. This can be done for many reasons, including security (e.g., your wallet's secret key has been exposed).

After **`AccountMigrateTx`** executes successfully, all of your assets and tokens in your former wallet will have been carried over to your new wallet. Your old wallet will be sealed, and all references to your old wallet's address will be redirected to the address of your new wallet.

## Sample Code

The following shows how to use `AccountMigrateTx` in Protocol Buffers.

```protobuf
message AccountMigrateTx {
  bytes pk = 1;
  WalletType type = 2 [ deprecated = true ];
  string address = 3;

  google.protobuf.Any data = 15;
}
```

| Name | Data Type | Description |
| - | - | - |
| `pk` | bytes | Public key of new wallet |
| `type` | WalletType |  **Deprecated.** Wallet type of new wallet |
| `address` | string | Address of new wallet |
| `data` | [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | Custom user data |

## Sample Usage

There are two steps involved when using AccountMigrateTx to migrate the contents of your wallet.

1. Declare your old wallet.

```elixir
old_wallet = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: old_wallet)
```

1. Migrate the contents of your old wallet to your new wallet.

```elixir
new_wallet = ForgeSdk.create_wallet()
ForgeSdk.account_migrate(ForgeAbi.AccountMigrateTx.new(pk: new_wallet.pk, address: new_wallet.address), wallet: old_wallet)
```
