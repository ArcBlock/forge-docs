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

**Account Migrate** transaction can migrate an existing account from an old wallet to a new wallet. This is useful when the secret key of your wallet is potentially exposed (e.g. you lost the paper that has printed secret key), for security purpose you issue an account migrate transaction and switch your old wallet to a newly generated wallet. After this migration, all your existing token balance are carried over in the new account, and the asset your previously owned are eligible to be transferred or be used.

## Protocol definition

To migrate an account you shall use `AccountMigrateTx` message:

```proto
message AccountMigrateTx {
  bytes pk = 1;        // new public key
  WalletType type = 2 [ deprecated = true ]; // new wallet type, not used any more since address is embedded with this info.
  string address = 3;  // new wallet address

  google.protobuf.Any data = 15;
}
```

You need to fill `pk` and `address` into this itx and then assemble and sign this transaction with the old wallet. Once it is executed in the chain, your old account will be sealed and all reference to the old address will point to a new address.

Here's an example of sending an account migration transaction:

```elixir
old_wallet = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: old_wallet)
# after a while you feel old_wallet is not safe any more
new_wallet = ForgeSdk.create_wallet()
ForgeSdk.account_migrate(ForgeAbi.AccountMigrateTx.new(pk: new_wallet.pk, address: new_wallet.address), wallet: old_wallet)
```
