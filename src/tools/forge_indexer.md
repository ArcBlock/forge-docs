---
title: 'Forge Indexer'
description: 'Forge Indexer'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'tools'
  - 'forge_indexer'
---

By default, forge indexer is enabled. Every operation executed in chain will be indexed into a sqlite3 db (by tuning the configuration you can change it to use postgres).

These data will be indexed:

- transaction list (thus you can filter txs by its type)
- states (thus you can get the richest accounts from the system)

We will expose more details for the forge indexer later.
