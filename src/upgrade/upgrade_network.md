---
title: 'Upgrade Forge Network'
description: 'Upgrade Forge Network'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'upgrade'
  - 'upgrade_network'
---

If you have an existing network running on a specific version, please follow the following upgrade path:

- Send a `upgrade node` tx to the network. For your local test network, you can use the moderator address to send this tx. See [moderator account for development](moderator.md).
- In the upgrade node tx, you shall provide the version to be upgraded, and the height. Note once your tx is executed, it cannot be revoked. If the node hasn't reach the height, you still can send another upgrade node tx with `override` option to override existing upgrade parameters.
- The node will stop at the given height. Then you need to upgrade the node manually with the version required by the upgrade tx.
- Once you have upgraded the node, run `forge start` to start the node again. It should start syncing with the new version.

## Example

Say there's a chain called sisyphus.abtnetwork.io. It is running at version 0.23.1. At height 150, the operator upgraded it to 0.23.4. If you want to setup a new node with sisyphus.abtnetwork.io, you can do this in your node:

- install latest forge cli - `npm install -g @arcblock/forge-cli` (see [installation chapter](../install) for more information).
- run `forge init 0.23.1` to install forge 0.23.1 to your local node.
- run `forge join https://sisyphus.abtnetwork.io/api` to retrieve the configuration of this network. This will join your local node into sisyphus network.
- run `forge start` to start syncing against the network.
- When your node reached block height 150, the node will stop syncing.
- run `forge stop`.
- run `forge init 0.23.4` to install forge 0.23.4 to your local node.
- run `forge start`. It will start syncing with the version of 0.23.4.
