---
title: assets
description: >-
  If the Forge chain is compared to a huge key-value pair storage engine, then
  the asset address is the key and the data in the asset is the value
keywords: asset
robots: "index,follow"
category: docs
layout: documentation
tags:
  - intro
  - concepts
---

> In Forge, the essence of assets is data. Any data that needs to be recorded on the chain can be put on the chain in the form of assets.

## scenes to be used

**assets**The usage scenarios are very extensive. When you need to make any records of the data, such as ownership, change records, etc., you can create a**assets**And update its status through transactions. There are many use cases for assets, including but not limited to:

- **Generate new tickets**: Alice needs to create tickets for her own event so that participants can buy tickets to participate in the event. Alice can pass [`create_asset`](../../../reference/txs/asset/create_asset) Create a "ticket" asset and store it on the chain.
- **Update tickets**: After creating the ticket, Alice finds that the event time on the ticket is written incorrectly, and she can [`update_asset`](../../../reference/txs/asset/update_asset)Update ticket information. And this updated transaction will remain on the chain as a record.
- **Change ticket ownership**: Bob wants to buy a ticket to participate in an event hosted by Alice. [`exchange`](../../../reference/txs/trade/exchange)Pay Alice, and after both parties sign, the owner of this ticket will change from Alice to Bob.
- **Use tickets**: Alice decides that everyone with a ticket can redeem a souvenir, but a ticket can only be redeemed once. Bob can pass [`consume_asset`](../../../reference/txs/asset/consume_asset)Exchange souvenirs.
- **Mass production**: Tickets sold in cinemas have standard formats, using Forge-supported AssetFactory and `acquire_asset` The function can realize a function similar to a ticket vending machine in the real world.

## Status of the asset

by [`get_asset_state`](../../../reference/rpc/state#get_asset_state)API can get the current state of the asset.

```protobuf
message AssetState {
  string address = 1;
  string owner = 2;
  string moniker = 3;
  bool readonly = 4;
  bool transferrable = 5;
  uint32 ttl = 6;
  google.protobuf.Timestamp consumed_time = 7;
  string issuer = 8;
  string parent = 9;

  StakeContext stake = 13;
  StateContext context = 14;

  google.protobuf.Any data = 50;
}
```

| Name              | Data Type                                                                             | Description                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| address           | string                                                                                | The address of the asset                                                                                                         |
| owner             | string                                                                                | Address of the asset owner                                                                                                       |
| moniker           | string                                                                                | Nickname of the asset                                                                                                            |
| readonly          | bool                                                                                  | Whether the asset is read-only. `True`Means that assets cannot be changed.                                                       |
| transferrable     | bool                                                                                  | Whether it can be transferred. `True`Means that assets can be transferred.                                                       |
| ttl               | int                                                                                   | Time To Live (ttl) refers to how long an asset will remain after it is first used.                                               |
| consumed_time     | Google.Protobuf.Timestamp                                                             | The time the asset was used.                                                                                                     |
| parent            | string                                                                                | The parent address of the asset. Such as `asset_factory`The generated asset, its upper address is `asset_factory`the address of. |
| `data` (optional) | [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | User-defined asset content.                                                                                                      |

## Asset security

### Serialization of asset data

Once the asset is stored on the chain, anyone with the asset address can view all the information in the asset status. In theory, any data can be stored in the asset, so developers have two choices:

- Asset content is saved in serialized format as [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any)Exist `data` in. If the other party does not have the content of this asset `protobuf` File, the contents of the asset cannot be decoded.
- If asset content does not pass `protobuf` The serialized file is saved in a way that is also readable in plain text after encoding such as UTF-8. In order to protect the security of the asset content, users can save the asset content on the chain after hashing.

### Prevent counterfeit assets

Forge has built-in asset anti-counterfeiting logic, that is, two identical assets are not allowed. However, during the dApp development process, the developer may mistake the forged asset as the correct asset when the verification of the asset is not strict enough. One solution is to attach the creator pair when the asset is created `data` The signature of the domain content so that it can be easily verified.
