# Consume Asset Transaction

**Consume Asset** transaction is used to consume an asset owned by you. The use cases like:

* you show/use your ticket to the officer of a park, a cinema, a museum, a fitness center
* you use your asset as a certificate to get certain one time benefits

Thus to consume an asset, the initiator must be the wallets belong to the issuer of the asset, e.g. a cinema. The consume transaction is pre-signed at the check point (e.g. the door of the cinema), and the user could then multi-sign the transaction with the asset address included in the data field of the multisig message. See below explanation.

## Protocol definition

To update an asset you shall use `UpdateAssetTx` message:

```proto
message ConsumeAssetTx {
  string issuer = 1;
  string address = 2;

  google.protobuf.Any data = 15;
}
```

Here the `issuer` could be the same as `from`, or different, depending on use case. when this tx is being mutisigned by the asset holder, the wallet could check if the issuer is the issuer of the asset, otherwise wallet shall refuse signing it. when it is being executed in the chain, at verify state stage, we shall check `from` of this tx:

* the same as the issuer
* `from.issuer == issuer`

For example, a museum issued a ticket and Alice bought it. At the door of the meseum, Alice need to consume the asset, which she
scan a QR code with a pre-populated ConsumeAssetTx. Most of the time, this pre-populated tx shall be signed by the account of the door so that one can trace where and how Alice consumed this asset, however we don't want anyone to be able to create this tx to allure Alice to consume the asset, thus the door shall be an account that issued by the museum. The chain will make sure only accounts that has this issuer would be able to successfully sign this tx.

The `address` is the parent address of this asset. As an asset might belong to another asset, for example a ticket belongs to a specific concert or movie asset. If this is provided, besides issuer we will verify if the parent address of the asset equals to this address. `address` is optional here.

Here's an example of consuming an asset:

```elixir
# say we have two wallets: cinema and alice, alice has an asset ticket
itx = ForgeAbi.ConsumeAssetTx.new(issuer: cinema.address)
tx = ForgeSdk.prepare_consume_asset(itx, wallet: cinema)
# then alice attach her signature to this tx
tx = ForgeSdk.finalize_consume_asset(tx, ticket.address, wallet)
```
