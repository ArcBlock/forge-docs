---
title: 'Logging'
description: 'Forge Logs'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'core'
  - 'log'
---

Forge produces logs for troubleshooting whenever there's an issue. For `tendermint` or `ipfs` they will also provide logs. Here's a summary for default log location:

```
~/.forge_release
├── core
│   └── logs
│       ├── error.log
│       ├── mempool.log
│       └── transaction.log
├── ipfs
│   └── logs
│       └── ipfs.log
└── tendermint
    └── logs
        └── tendermint.log
```

Here we will take a look at Forge logs

## Error Log

Error log shows the errors produced from Forge core. It mostly are detailed crash logs for Elixir/Erlang processes. Useful for debugging purpose.

## Mempool Log

Mempool log shows the logs for tenderint's mempool. After each transaction got checked, it will be send to tendermint's mempool, waiting to be included in the next block.

There is only one tendermint phase:

- Check Tx

```
16:34:28.556 application=forge pid=<0.2689.0> [info] [consensus check tx]: hash=E60D0AFC68378F371B783E8AE87DA0CC155C314C4FF046ECC7CF314B158C9580
```

## Transaction Log

Transaction log shows the transaction related logs. Whenever there are new block being proposed, there are few tendermint phases:

- Begin Block
- Deliver Tx
- End Block
- Commit Block

```
16:05:14.662 application=forge pid=<0.2690.0> [info] [consensus begin block]: chain id=forge, app hash=, height=1, num_txs=0, total_txs=0, proposer=BBAA954FF7B3F2182A6808D4614CC96C199CE739, time=2019-02-10 19:22:08Z
16:05:14.669 application=forge pid=<0.2690.0> [info] [consensus end block]: height=1 total_txs=0
16:05:14.678 application=forge pid=<0.2690.0> [info] [consensus commit block]: height=1 total_txs=0 app_hash=8D6B9CD27160CF8EEEDA14F1BD57733D07E160EF6415E1DF16F4EFF46C0BC2C3
```

For the empty block, there's no deliver tx info.

```
16:25:36.904 application=forge pid=<0.2690.0> [info] [consensus begin block]: chain id=forge, app hash=7A8E6ACE2E14965B5CE9795CA9CA888CD3F5997A1DB02536B51BDF2044EBEB95, height=245, num_txs=174, total_txs=174, proposer=BBAA954FF7B3F2182A6808D4614CC96C199CE739, time=2019-03-21 23:25:31Z
16:25:36.906 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=0 hash=20680DF6C5488B82CE69F092EC4A1743643F2E39917E358AEA3F485BAF10A83C
16:25:36.918 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=1 hash=93832E48280130834A3019F40A5DDBCAE73B498D0B0E47C799D8F2231B7F0F75
...
16:25:37.317 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=173 hash=857FE499FCE6583FB4CF0AEDA650E8610C15B87BF2ADCA734699DA18A6F931EA
16:25:37.319 application=forge pid=<0.2690.0> [info] [consensus end block]: height=245 total_txs=174
16:25:37.389 application=forge pid=<0.2690.0> [info] [consensus commit block]: height=245 total_txs=174 app_hash=3828FFDBAE0ACE2410A21E7D3B95AF25219C37F83232FCCE721F584F4AD6D3F6
```

For non empty block, there's deliver tx info between begin block and end block.

### Deliver Tx

By default, for each transaction we provide 3 log items:

- consensus deliver tx: the height of the block, tx index and hash.
- start tx: besides height / tx_index / hash, it also include type_url and sender address.
- finished tx: besides the data in start tx, it also provided important info:
  - status: if status is not `ok`. Then this is an invalid tx. The status code would indicate what error happened on this tx.
  - total time spent: as each tx will go through a list of pipelines, it gaves the performance metrics for each pipeline in `us`. For more information, see [Forge TX Protocol](../../concepts/tx_protocol).

```
16:25:37.317 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=173 hash=857FE499FCE6583FB4CF0AEDA650E8610C15B87BF2ADCA734699DA18A6F931EA
16:25:37.317 application=forge_tx pid=<0.2690.0> [info] [pipeline] Started tx: height=245, tx_index=173, hash=857FE499FCE6583FB4CF0AEDA650E8610C15B87BF2ADCA734699DA18A6F931EA, type_url=fg:t:declare, sender=z1kfuhzPXCbpddtCqi641sXwgQQMY6YWvLN.
16:25:37.319 application=forge_tx pid=<0.2690.0> [info] [pipeline] Finished tx: height=245, tx_index=173, type_url=fg:t:declare, status=ok. Total time spent: %{final_update: 30, post_update: 46, post_verify: 37, pre_update: 6, pre_verify: 664, update: 194, verify: 612}
```

## Tendermint Log

For more infomation on how to read tendermint log, please refer to [their documentation](https://tendermint.com/docs/tendermint-core/how-to-read-logs.html#walkabout-example).

## IPFS Log

IPFS's log doesn't have lots of information in there yet.
