---
title: 'Consume Asset Transaction'
description: 'Consume Asset Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'asset'
  - 'consume_asset'
---

**`ConsumeAssetTx`** is used to consume an asset. This can be used if the asset needs to be marked as a state where no further change should happen.

After **`ConsumeAssetTx`** is executed, asset `readonly` would be set to `True`, `transferrable` would be set to `False`, which means this asset can no longer be updated or transferred to other people.

## Sample Code

```protobuf
message ConsumeAssetTx {
  string issuer = 1;
  string address = 2;

  google.protobuf.Any data = 15;
}
```
| Name | Data Type | Description |Required|
| - | - | - | - |
|issuer| string|Could be the same as `from`, or different, depending on use case. when this tx is being mutisigned by the asset holder. | Yes|
|address| string| Address of the parent asset. If this is provided, besides issuer we will verify if the parent address of the asset equals to this address.||
| `data` (optional)| [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | Custom user data |

## Sample Usage

A museum issued a ticket and Alice bought it. At the door of the meseum, Alice need to consume the asset, which she
scan a QR code with a pre-populated ConsumeAssetTx. Most of the time, this pre-populated tx shall be signed by the account of the door so that one can trace where and how Alice consumed this asset, however we don't want anyone to be able to create this tx to allure Alice to consume the asset, thus the door shall be an account that issued by the museum. The chain will make sure only accounts that has this issuer would be able to successfully sign this tx.

```elixir
# say we have two wallets: cinema and alice, alice has an asset ticket
itx = ForgeAbi.ConsumeAssetTx.new(issuer: cinema.address)
tx = ForgeSdk.prepare_consume_asset(itx, wallet: cinema)
# then alice attach her signature to this tx
tx = ForgeSdk.finalize_consume_asset(tx, ticket.address, wallet)
```

## Who can prepare a `ConsumeAssetTx`

Thus to consume an asset, the initiator must be the wallets belong to the issuer of the asset, e.g. a cinema. The consume transaction is pre-signed at the check point (e.g. the door of the cinema), and the user could then multi-sign the transaction with the asset address included in the data field of the multisig message. See below explanation.
