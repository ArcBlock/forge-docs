---
title: 'Declare Transaction'
description: 'Declare Transaction'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'account'
  - 'declare'
---

**`DeclareTx`** is used to declare an account for a wallet on the chain. Before user declares an account on the chain, no one else is aware of this account's existence and this account cannot participate in any activities.

After **`DeclareTx`** executes successfully, the declared account is now known to the chan, and therefore can send/receive transactions and participate in other chain activities.

## Sample Code

The following shows how to use `DeclareTx` in Protocol Buffers.

```protobuf
message DeclareTx {
  string moniker = 1;
  string issuer = 2;

  google.protobuf.Any data = 15;
}
```

| Name | Data Type | Description |
| - | - | - |
| `moniker` | string | Nickname for the account|
| `issuer`(optional) | string | The account that issued this account |
| `data` (optional)| [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | Custom user data |

## Sample Usage

```elixir
wallet = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: wallet)
```

## Restricted Declaration

For certain applications, accounts are a controlled resources that not everyone can get freely. Thus we provided restricted declaration, which application owner can just set `restricted = true` in forge configuration like this:

```toml
...
[forge.transaction.declare]
restricted = true
...
```

Then a normal declare transaction would fail. Under this setting, declaration can be carried out only if it is endorsed (multi-signed) by an existing account in the chain.

This feature can be used to implement a) a referral system, like gmail in the early ages b) paid accounts.
