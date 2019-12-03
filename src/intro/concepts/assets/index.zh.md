---
title: '资产（Asset）'
description: '如果把 Forge 链比作巨大的键值对存储引擎，那么资产地址就是键，资产里面的数据就是值'
keywords: 'asset'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'intro'
  - 'concepts'
---

> 在 Forge 中，Asset 的本质是数据。任何需要被记录在链上的数据，都能以资产的形式放在链上。

## 使用场景

**Asset**的使用场景非常广泛，当你需要对数据做任何记录，比如所有权、变更记录等等，都可以通过创建一个**资产**并通过交易对其状态更新。

Asset 有很多使用场景，包括但不限于：

- **生成门票**：Alice 需要为自己举办的活动创建门票，让参与者可以购票参与活动。Alice 可以通[`create_asset`](../../../reference/txs/asset/create_asset) 创建一种 “门票” 的资产，将其存在链上。
- **更新门票**：创建完门票之后，Alice 发现门票上活动的时间写错了，她可以通过[`update_asset`](../../../reference/txs/asset/update_asset)更新门票的信息。而这条更新的交易也会作为记录留在链上。
- **转移门票**：Bob 希望能购买一张门票参加 Alice 举办的活动，可以通过[`exchange`](../../../reference/txs/trade/exchange)付款给 Alice，双方签名之后，这张门票的所有人就会从 Alice 变成 Bob。
- **销毁门票**：Alice 决定每个有门票的人都可以兑换一个纪念品，但一张票只能兑换一次。Bob 可以通过[`consume_asset`](../../../reference/txs/asset/consume_asset)兑换纪念品。
- **批量出票**：电影院售出的门票都有标准的格式，使用 Forge 支持的 AssetFactory 和 `acquire_asset` 功能可以实现类似于现实世界中的自动售票机的功能。
- **颁发证书**：在线学习网站的用户学完某门课程之后，可以给他创建一个节课证书，然后在学习其他课程的时候要求他持有某门课程的证书。
- **会员证明**：付费订阅平台用户付费其实购买的是一张通行证，查看某些需要付费才能查看内容的通行证。

[ABT Wallet](https://abtwallet.io) 会内置几种标准的 Asset 展示：证书、徽章、门票等等。

## 基本操作

围绕着各种可能的使用场景，Forge 对 Asset 抽象了几种操作，每种操作分别有对应的合约：

- [CreateAsset](../../../reference/txs/asset/create_asset)：创建链上 Asset
- [UpdateAsset](../../../reference/txs/asset/update_asset)：更新链上 Asset，只能更新 Asset 状态中的部分字段，比如 moniker、data
- [ConsumeAsset](../../../reference/txs/asset/consume_asset)：销毁链上 Asset，销毁之后 Asset 不可更新、不可转移，但是还是公开可验证
- [CreateAssetFactory](../../../reference/txs/asset/create_asset_factory)：创建 Asset 工厂
- [AcquireAsset](../../../reference/txs/asset/acquire_asset)：从 Asset 工厂获取 Asset，支持单个交易获取多个

## 资产状态

### 数据结构

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

| Name              | Data Type                                                                             | Description                                                                            |
| ----------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| address           | string                                                                                | 资产的地址                                                                             |
| owner             | string                                                                                | 资产所有人的地址                                                                       |
| moniker           | string                                                                                | 资产的昵称                                                                             |
| readonly          | bool                                                                                  | 资产是否只读。`True`意味着资产不可更改。                                               |
| transferrable     | bool                                                                                  | 是否可以转让。`True`意味着资产可以转让。                                               |
| ttl               | int                                                                                   | Time To Live(ttl) 指资产第一次被使用之后，还会存留多久。                               |
| consumed_time     | Google.Protobuf.Timestamp                                                             | 资产被使用的时间。                                                                     |
| parent            | string                                                                                | 资产的上一级地址。如`asset_factory`生成的资产，其上一级地址就是`asset_factory`的地址。 |
| `data` (optional) | [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | 用户定义的资产内容。                                                                   |

### 查询方式

有两种方式：

- 通过 gRPC 接口 [`get_asset_state`](../../../reference/rpc/state#get_asset_state) 获取 Asset 状态
- 通过 GraphQL 接口 `getAssetState` 查询 Asset 状态

GraphQL 接口查询语句和结果如下：

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

得到的结果如下：

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

## 资产的安全

### 隐私需求

一旦资产被保存在链上，任何有这个资产地址的人都可以查看资产状态里的所有信息，理论上资产里面可以存放任何数据，至于存储什么样的数据，开发者可以根据实际场景去选择：

- 如果是弱类型的，不需要隐私保护：比如证书，可以直接 UTF8 编码后以明文可读的方式存储在 `data` 域中，这样就是完全公开可验证的
- 如果是强类型的，需要部分隐私保护需求：`data` 域可以是序列化后的格式保存成 [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any)，没有这个资产内容的 `proto buffer` 文件的人将无法直接解码资产的内容，但技术上是可以查看里面的部分字段内容
- 如果是敏感的：比如合同、工资条等，为了保护资产内容的安全，应该将资产内容经过哈希运算后保存在 `data` 域中，而把真实内容放在链下的数据库里面

### 防止伪造

Forge 内置了资产防伪逻辑，即不允许完全相同的两个资产，但是在 dApp 开发过程中，开发者可能在校验资产方面不够严谨的情形下错误的把伪造的资产当成是正确的资产，有一个解决办法就是在资产创建时附上创建者对 `data` 域内容的签名，这样就很容易校验出来。

比如这个[测试链上的 Asset](https://playground.network.arcblockio.cn/node/explorer/txs/6F37DF6E1272E7C149A8F8D5C6720B42E754656F9B1DF6E07CCD27818E51909A) `data` 域的类型是 `json`，内容是：

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

其中的 `signature` 就是 Asset 创建者对整个 `data` 做的签名，这样即使资产转移给了其他人，也很容易验证出来创建人是否是期望的那个地址。
