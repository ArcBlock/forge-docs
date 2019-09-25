---
title: 'Overview'
description: 'Overview'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'intro'
  - 'index'
---
# Quickstart

Forge is a framework that allows you to launch your decentralized applications (DApps) on your own blockchains.

## Installation

Currently, Forge is supported on machines running one of the following operating systems:

* [CentOS](/forge-centos.md)
* [Ubuntu](/forge-ubuntu.md)
* [macOS](/forge-macos.md)

If you are using other operating systems, you can run Forge using Docker.

## Getting Started with Forge Web

Forge Web is a web interface that provides you with visual tools for working with Forge and its blockchain.

Once you've installed and started Forge, you can get a high-level view of how Forge stores transactions and data. Forge Web starts by default whenever your start Forge, so you can point your browser to `http://localhost:8210` to access the:

* **Dashboard**: Provides an overview of what is occurring on the chain
* **Block Explorer**: Allows you to view and query the data and states on the chain
* **RPC Playground**: Provides you a playground/sandbox area to interact with the RPCs provided by Forge

When you first get started with Forge Web, you will not have any data. You can get started with test data by running Forge Simulator (see the following section for additional details).

For additional information about Forge Web, please review its [documentation](https://docs.arcblock.io/forge/latest/tools/forge_web.html).

## Creating Test Wallets and Transactions Using Forge Simulator

Forge comes with `forge-simulator`, a tool designed to help you generate wallets and transactions for use with simulations.

To start Forge Simulator, run in the Command Line:

```shell
forge simulator start
```

Shortly after you've started the simulator, you'll see newly-created transactions and wallets when viewing Forge Web. The simulator will create 10,000 wallets and some transactions between those wallets. In addition to seeing this data on the Forge Web Dashboard, you'll see data available in the Block Explorer as well.

## Create a Wallet and Send Transactions

At this point, you've used several Forge tools, including the CLI, Forge Web, and Forge Simulator. In this step, we will use these tools to **create a wallet** and **send your first transaction**.

### Create a Wallet

Wallets are addresses generated using public key encryption algorithms. You need a wallet to send and receive transactions, since it is the method by which your identity (as well as the authenticity of the transaction) is verified. Forge allows you to choose the algorithm combinations to generate new wallets (e.g., **ED25519** for public key encryption, **SHA-3** for public key hash, and **Base58** for the address itself).

#### Use the ArcBlock Wallet App

The most secure way to create a wallet is to use the [ArcBlock Wallet App](https://www.arcblock.io/en/post/2019/05/15/abt-wallet-walkthrough).

Make note of your wallet address, since you will need it in the following steps.

#### Viewing Wallet Information

Now that you've created a wallet, you will use Forge's Block Explorer to view information about the wallet.

After you've launched the Block Explorer, provide the address of your wallet into the search bar and press Enter. You will see transaction-related information for the wallet in question.

Notice that there will be one transaction, even if your wallet is newly-created.

![](https://docs.arcblock.io/forge/latest/assets/img/search_wallet_result.1a4d9233.jpg)

This is the **Declare Account** transaction, and if you click on the transaction's hash, you'd see further information.

![](https://docs.arcblock.io/forge/latest/assets/img/declare_tx.c0364e3c.jpg)

In Forge, wallets cannot be used with executing the **Declare Account** transaction, since the transaction:

* Creates the default state for the wallet
* Registers the wallet, its type, and its public key in the blockchain

This differs from other wallet implementations. Forge's primary purpose is to assist developers in building rich applications, so putting the state of the wallet on the chain in advance simplifies a lot of use cases and its implementation.

### Send a Transaction

Now that you have a wallet, you can send a transaction.

The following example will show you how to execute a transfer transaction using some of the 10,000 tokens automatically issued to newly-created wallets for development purposes. You will do this using the Forge CLI.

To begin, run the following in the Command Line:

`forge tx:send`

This launches a wizard that will prompt you to provide the information required to complete the transaction.

You'll be asked to:

* Confirm the wallet you want to use
* Provide the passphrase for the wallet
* Select the transaction type
* Provide your itx data object

Please note that when you're prompted `Please enter the itx data object` and you press Enter, an editor will open with default values; you can copy and paste the provided JSON to proceed.

For example, the following JSON object indicates that you want to send 1000 units to the address indicated.

```json
{
  "to": "z11...kis",
  "value": "1000",
  "assets": [],
  "data": null
}
```

Forge will auto-fill several values on your behalf, including:

| Parameter | Description |
| - | - |
| from | the sender address |
| nonce | nonce value for this transaction |
| signature | the sender's signature for this transaction |
| chain_id | the chain to which this transaction belongs |

The full transaction Forge sends to the blockchain is similar to this:

```shell
$ forge tx EAF...A4
{
  from: 'z1...bB',
  nonce: 3,
  signature: 'Ojx...SCQ==',
  chainId: 'forge',
  signatures: [],
  itx: {
    type: 'TransferTx',
    value: {
      to: 'z1...is',
      value: '1000',
      assets: []
    }
  }
}
```

Once the transaction executes on the chain, you can get the updated account state for both the sending and receiving wallets:

```shell
$ forge account z1...bB
{
  balance: '9999.9999999999999 TOKEN',
  nonce: 3,
  numTxs: 2,
  ...
}
```

## SDKs

To help you build applications using Forge, SDKs are available to help developers with tasks like:

* Build applications using Forge
* Create and manipulate wallets
* Read and write on-chain data
* Derive and validate decentrialized IDs (DID)
* Assemble, encode, and sign transactions that can be sent to Forge-powered blockchains

Currently, Forge offers SDKs for the following languages:

* JavaScript (Node.js)
* Python
* Elixir
