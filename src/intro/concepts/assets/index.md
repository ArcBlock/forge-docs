---
title: Assets
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

> In Forge, the essence of an asset is data. Any data that needs to be recorded on the chain can be put on the chain in the form of assets.

## scenes to be used

**Asset**The usage scenarios are very extensive, when you need to make any records of the data, such as ownership, change records, etc., you can create a**assets**And update its status through transactions.

There are many usage scenarios for Asset, including but not limited to:

- **Generate tickets**: Alice needs to create tickets for her own event so that participants can buy tickets to participate in the event. Alice can pass [`create_asset`](../../../reference/txs/asset/create_asset) Create a "ticket" asset and store it on the chain.
- **Update tickets**: After creating the ticket, Alice finds that the event time on the ticket is written incorrectly, and she can [`update_asset`](../../../reference/txs/asset/update_asset)Update ticket information. And this updated transaction will remain on the chain as a record.
- **Transfer tickets**: Bob wants to buy a ticket to participate in an event hosted by Alice. [`exchange`](../../../reference/txs/trade/exchange)Pay Alice, and after both parties sign, the owner of this ticket will change from Alice to Bob.
- **Destruction of tickets**: Alice decides that everyone with a ticket can redeem a souvenir, but a ticket can only be redeemed once. Bob can pass [`consume_asset`](../../../reference/txs/asset/consume_asset)Exchange souvenirs.
- **Batch ticketing**: Tickets sold in cinemas have standard formats, using Forge-supported AssetFactory and `acquire_asset` The function can realize a function similar to a ticket vending machine in the real world.
- **Issue a certificate**: After the user of the online learning website finishes a course, he can create a course certificate for him, and then ask him to hold a certificate of a course when studying other courses.
- **Membership certificate**: Paid subscription platform users actually pay for a pass, and check some passes that require payment to view content.

[ABT Wallet](https://abtwallet.io) Several standard asset displays are built in: certificates, badges, tickets, and more.

## Basic operation

Around various possible usage scenarios, Forge abstracts several operations on Assets, and each operation has a corresponding contract:

- [CreateAsset](../../../reference/txs/asset/create_asset): Creating Assets on the Chain
- [UpdateAsset](../../../reference/txs/asset/update_asset): Update Assets on the chain, only some fields in the Asset state can be updated, such as moniker, data
- [ConsumeAsset](../../../reference/txs/asset/consume_asset): Destroy the asset on the chain. After the asset is destroyed, it cannot be updated or transferred, but it is still publicly verifiable
- [CreateAssetFactory](../../../reference/txs/asset/create_asset_factory): Creating an Asset Factory
- [AcquireAsset](../../../reference/txs/asset/acquire_asset): Get Asset from Asset Factory, support multiple transactions in a single transaction

## Asset status

### data structure

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

### inquiry mode

There are two ways:

- Via gRPC interface [`get_asset_state`](../../../reference/rpc/state#get_asset_state) Get Asset Status
- Via GraphQL interface `getAssetState` Querying Asset Status

GraphQL interface query statements and results are as follows:

```graphql
{
  getAssetState(address: "zjdgDq2ztW5dpvgnh3foeUy8FKGXtH4vJpra") {
    code
    state {
      address
      consumedTime
      issuer
      moniker
      owner
      parent
      readonly
      transferrable
      ttl
      data {
        typeUrl
        value
      }
      context {
        genesisTime
        renaissanceTime
      }
    }
  }
}
```

The results obtained are as follows:

```json
{
  "data": {
    "getAssetState": {
      "code": "OK",
      "state": {
        "address": "zjdgDq2ztW5dpvgnh3foeUy8FKGXtH4vJpra",
        "consumedTime": null,
        "context": {
          "genesisTime": "2019-12-03T09:25:25Z",
          "renaissanceTime": "2019-12-03T09:25:25Z"
        },
        "data": {
          "typeUrl": "json",
          "value": "{\"backgroundUrl\":\"\",\"type\":3,\"status\":0,\"issuer\":{\"did\":\"zNKrrPHwBnyVoMVZ6ZFtpqnLGsCQXwisEu6j\",\"pk\":\"zF45oaAdEaz1XXhCcsRDpGTFS1JiUsoAzFn2t3MQAnrWd\",\"name\":\"ArcBlock\",\"url\":\"https://www.arcblock.io\",\"logo\":\"https://releases.arcblockio.cn/arcblock-logo.png\"},\"data\":{\"name\":\"Atomic Swap 尝鲜 ①\",\"description\":\"完成 Atomic Swap 的通证兑换 Badge 测试\",\"reason\":\"报名并现场参加了 ArcBlock 的 DevCon0\",\"logoUrl\":\"https://releases.arcblockio.cn/arcblock-logo.png\",\"recipient\":{\"did\":\"z1dTSGFBaKwfNXUomQgiYVF5m6zTQ7SG3Ev\",\"pk\":\"z4tH5vytTrfMu1PjMye3G4E75e3CTwpy4KkNVjroLXbe3\",\"name\":\"z1dTSGFBaKwfNXUomQgiYVF5m6zTQ7SG3Ev\",\"location\":\"北京市朝阳区\"},\"issueTime\":1575365127515,\"expireTime\":-1},\"signature\":\"z5iKwF4X8AC9NgAqeodvmdEBzxg8jW5rFgoKC7hivp5PAWFtJjsKzdTWgagyJ1H2ctcTuXPDyxN9KKNE8qjsS1zfH\"}"
        },
        "issuer": "zNKrrPHwBnyVoMVZ6ZFtpqnLGsCQXwisEu6j",
        "moniker": "Atomic Swap 尝鲜 ①",
        "owner": "zNKrrPHwBnyVoMVZ6ZFtpqnLGsCQXwisEu6j",
        "parent": "",
        "readonly": false,
        "transferrable": true,
        "ttl": 0
      }
    }
  }
}
```

## Asset security

### Privacy requirements

Once the asset is stored on the chain, anyone with the asset address can view all the information in the asset status. In theory, any data can be stored in the asset. As for what kind of data is stored, the developer can choose according to the actual scenario:

- If it is a weak type, no privacy protection is required: for example, the certificate can be directly UTF8 encoded and stored in plain text in a readable manner. `data` Domain, so that is fully publicly verifiable
- If it is strongly typed, some privacy protection requirements are required: `data` The domain can be saved in serialized format as [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any), Without this asset content `proto buffer` The person of the file will not be able to directly decode the content of the asset, but technically it is possible to view some of the fields
- If it is sensitive: such as contracts, pay slips, etc., in order to protect the security of asset content, the asset content should be stored in a hash operation `data` Domain, and put the real content in the off-chain database

### Prevent counterfeiting

Forge has built-in asset anti-counterfeiting logic, that is, two identical assets are not allowed. However, during the dApp development process, the developer may mistake the forged asset as the correct asset when the verification of the asset is not strict enough. One solution is to attach the creator pair when the asset is created `data` The signature of the domain content so that it can be easily verified.

Like this [Testing assets on the chain](https://playground.network.arcblockio.cn/node/explorer/txs/6F37DF6E1272E7C149A8F8D5C6720B42E754656F9B1DF6E07CCD27818E51909A) `data` The type of domain is `json`, The content is:

```json
{
  "backgroundUrl": "",
  "type": 3,
  "status": 0,
  "issuer": {
    "did": "zNKrrPHwBnyVoMVZ6ZFtpqnLGsCQXwisEu6j",
    "pk": "zF45oaAdEaz1XXhCcsRDpGTFS1JiUsoAzFn2t3MQAnrWd",
    "name": "ArcBlock",
    "url": "https://www.arcblock.io",
    "logo": "https://releases.arcblockio.cn/arcblock-logo.png"
  },
  "data": {
    "name": "Atomic Swap 尝鲜 ①",
    "description": "完成 Atomic Swap 的通证兑换 Badge 测试",
    "reason": "报名并现场参加了 ArcBlock 的 DevCon0",
    "logoUrl": "https://releases.arcblockio.cn/arcblock-logo.png",
    "recipient": {
      "did": "z1dTSGFBaKwfNXUomQgiYVF5m6zTQ7SG3Ev",
      "pk": "z4tH5vytTrfMu1PjMye3G4E75e3CTwpy4KkNVjroLXbe3",
      "name": "z1dTSGFBaKwfNXUomQgiYVF5m6zTQ7SG3Ev",
      "location": "北京市朝阳区"
    },
    "issueTime": 1575365127515,
    "expireTime": -1
  },
  "signature": "z5iKwF4X8AC9NgAqeodvmdEBzxg8jW5rFgoKC7hivp5PAWFtJjsKzdTWgagyJ1H2ctcTuXPDyxN9KKNE8qjsS1zfH"
}
```

one of them `signature` Is the asset creator `data` The signature is made so that even if the asset is transferred to other people, it is easy to verify whether the creator is the desired address.
