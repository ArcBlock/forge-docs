---
title: '2. Accounts'
description: 'Accounts'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'intro'
  - 'concepts'
---
# Accounts

An **account** is a unique address that Forge uses to identify individual users. Each user can have as many accounts as they would like.

In addition to the unique address, an account comes with a **secret key (SK)** and a **public key (PK)**.

Users need at least one account before they can send and receive transactions using Forge.

*Please note that we will use the terms **account** and **wallet** interchangeably.*

## The Anatomy of an Account

```code
message WalletInfo {
  WalletType type = 1;
  bytes sk = 2;
  bytes pk = 3;
  string address = 4;
}
```

| Parameter | Description |
| - | - |
| `type` | Cryptographic algorithms used to generate the account |
| `sk` | Secret key |
| `pk` | Public key |
| `address` | Wallet/account address, which also the account address |

## Keys

The account's secret and public keys are important, because:

* The **secret key** is used to calculate the public key
* The **public key** is used to calculate the address

It's important to keep the secret keys safe, since knowledge of the secret key allows others to spoof signatures to send unauthorized transactions.

## Signatures

Each transaction carries a signature generated using the sender's secret key. The recipient can verify the sender's signature using the sender's public key, which is published on the ABT node. This helps ensure that the transaction content received is exactly as it was when the sender initiated the transaction.

## Working with Accounts in Forge

Forge offers a variety of actions related to working with accounts, including:

* Creating an account
* Loading an account
* Recovering an account
* Listing an account
* Removing an account