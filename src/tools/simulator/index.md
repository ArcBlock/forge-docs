---
title: 'Forge Simulator'
description: 'Forge Simulator'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'tools'
  - 'simulator'
---

Simulator is used to generate various traffic into the chain. Thus you can use it to test the behavior of the chain. Currently these transactions are supported by simulator:

- declare
- transfer
- exchange
- create asset
- consume asset
- update asset
- account migration
- poke

When you first start simulator, it will generate 10, 000 wallets and declare those wallets into the chain. Then it will randomly send txs between registered wallets with the following configuration:

```yaml
pools:
  account_migrate: 5
  create_asset: 5
  declare: 5
  exchange: 5
  transfer: 10
  update_asset: 5
  consume_asset: 5
  poke: 5
meta:
  tick: 200
simulations:
  - name: declare new account
    interval: 1
    num: 1
    type: declare

  - name: create assets
    interval: 2
    num: 2
    type: create_asset

  - name: update assets
    interval: 2
    num: 2
    type: update_asset

  - name: exchange token and assets
    interval: 2
    num: 2
    type: exchange
    settings:
      value: '1000..20000'

  - name: transfer token
    interval: 2
    num: 2
    type: transfer
    settings:
      value: '50..200'
      asset: false

  - name: transfer token and assets
    interval: 5
    num: 2
    type: transfer
    settings:
      value: '1000..5000'
      asset: true
      after: []

  - name: migrate wallets
    interval: 5
    num: 1
    type: account_migrate

  - name: create asset, consume then transfer
    interval: 5
    num: 2
    type: consume_asset

  - name: poke to get tx
    interval: 100
    num: 1
    type: poke
```
