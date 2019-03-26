# Javascript SDK

## Wallets

Before sending any data to forge powered blockchain, we should be aware that, all transaction must be signed with a wallet (secretKey/publicKey pair).

Forge have built-in ability to manage wallets on the node(all keystore files are stored on the disk). But for end users, they usually manage wallets by their own.

Cryptography is hard! So we created a multi-language package called `mcrypto` to help developers manipulate wallets that are compatible with forge.

For javascript developers, here is an example of generating a wallet:

First, we init a npm project, and add dependency:

```shell
mkdir -p /tmp/playground
cd /tmp/playground
npm init -y
npm install @arcblock/forge-wallet @arcblock/mcrypto -S
touch index.js
```

Then, create a wallet from random (`edit index.js`):

```javascript
const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');

const wallet = fromRandom(
  WalletType({
    role: types.RoleType.ROLE_ACCOUNT,
    pk: types.KeyType.ED25519,
    hash: types.HashType.SHA3,
  })
);

console.log(wallet.toJSON());
```

Run `node index.js`, we will get a json format of the wallet:

```text
{ type:
   { role: 'ROLE_ACCOUNT',
     pk: 'ED25519',
     hash: 'SHA3',
     address: 'BASE58' },
  sk:
   '0x4a455329916bb264b769872311a9f2d0326fff455c57efa258c479cb82592c081147119c8ec917a5dfdcdbf270746c1d7d3d60b48538fb8e149c066df198046a',
  pk:
   '0x1147119c8ec917a5dfdcdbf270746c1d7d3d60b48538fb8e149c066df198046a',
  address: 'z1fAm2fG3Mvx9uCAghVw1WQmmqteHJj4jWd' }
```

Please note that, forge supports many wallet types, the above wallet type is a typical one, it's ok to stick with it when testing.

> TODO: add documentation for all supported wallet types

## Read/Write blockchain data

Since forge support read/write data using both graphql way and grpc way. We have to separate library to help developers do this.

> Since we are going to send transactions to a running blockchain, we need to have a running forge node, if you donnot know how to setup and runninga forge node, reference documentation for forge-cli.

### GraphQL Client

Once we are familiar with wallets, sending data to forge powered blockchain is as easy as an cake!

First, we need to add `@arcblock/graphql-client` as project dependency:

```shell
npm install @arcblock/graphql-client -S
```

Then, create a `GraphQLClient` instance, point the instance to our running node:

```javascript
const GraphqlClient = require('@arcblock/graphql-client');

const client = new GraphqlClient('http://localhost:8210/api'); // local

(async () => {
  const res = await client.getChainInfo();
  console.log(res);
})();
```

Run above script, we can get something similar to:

```json
{
  "code": "OK",
  "info": {
    "address": "zyt1k617i54j9JQjJYj1TxwVxjdkoC7pL19V",
    "appHash": "963637c36a95f1c7c7bae4d9d5cdd8661510a0ad63adc2c4418b8d8c4ea05e02",
    "blockHash": "20aeec043532a7d80eb191fb27421381c5d5a4c28f1f95117e7d1fa78b2fb119",
    "blockHeight": 764,
    "blockTime": "2019-03-26T12:15:02Z",
    "consensusVersion": "0.31.0",
    "dataVersion": "1.5",
    "forgeAppsVersion": [[Object]],
    "id": "6e9068eb4ac26ccf1c219309e42bf8d987590ac3",
    "moniker": "forge",
    "network": "forge",
    "supportedTxs": [
      "fg:t:update_asset",
      "fg:t:transfer",
      "fg:t:sys_upgrade",
      "fg:t:stake",
      "fg:t:exchange",
      "fg:t:declare_file",
      "fg:t:declare",
      "fg:t:consensus_upgrade",
      "fg:t:create_asset",
      "fg:t:consume_asset",
      "fg:t:poke",
      "fg:t:account_migrate"
    ],
    "synced": true,
    "totalTxs": 89541,
    "version": "0.20.1",
    "votingPower": 10
  }
}
```

If you successfully connected to your local forge node with `GraphQLClient`, let's move on and send a transaction.

Before sending any transaction with the random wallet, we should declare that wallet on chain.

> The following script used another package to do data formatting before sending the data onto blockchain
> Add the package with `npm install @arcblock/forge-util`

```javascript
const GraphqlClient = require('@arcblock/graphql-client');
const { types } = require('@arcblock/mcrypto');
const { fromRandom, WalletType } = require('@arcblock/forge-wallet');
const { hexToBytes } = require('@arcblock/forge-util');

const wallet = fromRandom(
  WalletType({
    role: types.RoleType.ROLE_ACCOUNT,
    pk: types.KeyType.ED25519,
    hash: types.HashType.SHA3,
  })
);

const client = new GraphqlClient('http://localhost:8210/api'); // local

(async () => {
  const res = await client.sendDeclareTx({
    wallet,
    data: {
      moniker: 'forge_test_user',
      pk: Buffer.from(hexToBytes(wallet.publicKey)),
      type,
    },
  });

  console.log(res);
})();
```

Run above script, we will get:

```text
Result { code: 'OK',
  hash:
   'E7040867630DAED6E53457C0BA202D0635ACE887F127630B99FF933C1A1B449C' }
```

The hash `E7040867630DAED6E53457C0BA202D0635ACE887F127630B99FF933C1A1B449C` is the transaction hash returned from forge blockchain, and it should be different from your script, and everytime you run the script, because the wallet is random.

If you want to inspect the transaction, use forge-web or forge-cli:

- `forge tx E7040867630DAED6E53457C0BA202D0635ACE887F127630B99FF933C1A1B449C`
- search `E7040867630DAED6E53457C0BA202D0635ACE887F127630B99FF933C1A1B449C` in the explorer search box

### gRPC Client

> TODO

## DID

> TODO
