Possible causes:
1. Sender should be moderator
2. `DeployProtocolTx.address`, `DeployProtocolTx.name`, `DeployProtocolTx.namespace`, `DeployProtocolTx.code` should not be empty. The size of `DeployProtocolTx.description` should not exceed max size.
3. `DeployProtocolTx.address` should be correctly calculated using `DeployProtocolTx`.
4. `type_url` and the module doesn't match.
5. the binary of the protocol is modified on purpose.
6. Version of new protocol should be bigger than the old ones.
