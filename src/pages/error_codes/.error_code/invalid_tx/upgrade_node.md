Possible causes:
1. `tx.from` should be the same as moderator address
2. `UpgradeNodeTx.version` should be bigger than forge version
3. `UpgradeNodeTx.height` should be bigger than current block height.
4. an existing upgrade_node operation is going to be carried out while the new upgrade_node tx has no `override` flag.
