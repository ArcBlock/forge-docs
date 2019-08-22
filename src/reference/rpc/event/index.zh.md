---
title: "事件 RPC"
description: "事件 RPC"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "rpc"
  - "event"
---

事件 RPC 帮助用户与其感兴趣的活动互动。所有活动均以交易形式存在。通过使用事件 RPC，用户可收到其请求的交易类型更新的事实信息。

## RPC 列表

- [订阅](#subscribe)
- [取消订阅](#unsubscribe)

### 订阅

---

订阅交易的特定主题。服务器以流格式退回该主题下的所有交易。

`subscribe(RequestSubscribe) returns (stream ResponseSubscribe)`

#### RequestSubscribe

| 名称 | 数据类型  | 默认 | 必须 |
| :--- | :-------- | :--- | :--- |
| 类型 | TopicType | 转移 |      |
| 过滤 | 字符串    | ''   |      |

```protobuf
message RequestSubscribe {
  TopicType type = 1;
  string filter = 2;
}
```

---

#### ResponseSubscribe

| 名称              | 数据类型                                |
| :---------------- | :-------------------------------------- |
| 代码              | int                                     |
| 以下一种          |                                         |
| 转移              | [交易](../../types/type#transaction) |
| account_migrate   | [交易](../../types/type#transaction) |
| 确认              | [交易](../../types/type#transaction) |
| create_asset      | [交易](../../types/type#transaction) |
| 交换              | [交易](../../types/type#transaction) |
| 撤销              | [交易](../../types/type#transaction) |
| begin_block       | RequestBeginBlock                       |
| end_block         | RequestEndBlock                         |
| 声明              | [交易](../../types/type#transaction) |
| update_asset      | [交易](../../types/type#transaction) |
| consensus_upgrade | [交易](../../types/type#transaction) |
| declare_file      | [交易](../../types/type#transaction) |
| sys_upgrade       | [交易](../../types/type#transaction) |
| 抵押              | [交易](../../types/type#transaction) |
| account_state     | [交易](../../types/type#transaction) |
| asset_state       | [交易](../../types/type#transaction) |
| forge_state       | [交易](../../types/type#transaction) |
| stake_state       | [交易](../../types/type#transaction) |

```protobuf
message ResponseSubscribe {
  StatusCode code = 1;
  oneof value {
    string topic = 2;
    Transaction transfer = 3;
    Transaction account_migrate = 4;
    Transaction confirm = 5;
    Transaction create_asset = 6;
    Transaction exchange = 7;
    Transaction revoke = 8;

    abci_vendor.RequestBeginBlock begin_block = 16;
    abci_vendor.RequestEndBlock end_block = 17;

    Transaction declare = 19;
    Transaction update_asset = 20;
    Transaction consensus_upgrade = 21;
    Transaction declare_file = 22;
    Transaction sys_upgrade = 23;
    Transaction stake = 24;

    Transaction account_state = 129;
    Transaction asset_state = 130;
    Transaction forge_state = 131;
    Transaction stake_state = 132;
  }
}
```

#### GRPC 示例

Python

```python
[1]request = RequestSubscribe(type=16)
[2]response_stream = EventStub.subsribe(request)
[3]for response in response_stream:
      print(response)

topic: "WwUhZY4y4mUBMsQOj64eDPJRssDrJr+CSXAiEqWVoF8="
begin_block {
  hash: "\267\370\234\343\037\361\304\367\350\002V\321\215\311q)\002l\322+\322\026zX\277M\326\t_z\352G"
  header {
    version {
      Block: 10
      App: 1
    }
    chain_id: "forge"
    height: 14649
    time {
      seconds: 1553669448
      nanos: 273006000
    }
    total_txs: 586
    last_block_id {
      hash: "\214\305r\260\351\363\226\233=k\350\255\244G\2238\273Mo=ZZ\244\207\212\021\277\030\202ZH\030"
      parts_header {
        total: 1
        hash: "\2113\024Fx\207\313!\244n\221\000\215N\253q\325p^\332\310\317G;w\321,\325\362\315\251O"
      }
    }
    last_commit_hash: "\033\370v\341\256\037#\022\367\026\024i(t\007\001lD\017\274+\322\3636a\257Q|>\314Z\337"
    validators_hash: "\243\275\322\270\024\231\375\231\236\005\271u\005\264\210ZK\353\025#\305\205\371\373?\243\240O\177\037dl"
    next_validators_hash: "\243\275\322\270\024\231\375\231\236\005\271u\005\264\210ZK\353\025#\305\205\371\373?\243\240O\177\037dl"
    consensus_hash: "\004\200\221\274}\334(?w\277\277\221\327<D\332X\303\337\212\234\274\206t\005\330\267\363\332\255\242/"
    app_hash: "K\352*\233W\225P\004\003\222\344>\010]\024vd\002-\221\334\212\215\212p\330GA\357\260\325\320"
    proposer_address: "\257ok\244\022v\003\234\021F\255d\224\275\036&=\236\343\372"
  }
  last_commit_info {
    votes {
      validator {
        address: "\257ok\244\022v\003\234\021F\255d\224\275\036&=\236\343\372"
        power: 10
      }
      signed_last_block: true
    }
  }
}
begin_block {
```

#### GraphQL 示例

```graphql
subscription {
  subscribe(type: "16") {
    beginBlock {
      hash
      header {
        height
      }
    }
  }
}
```

响应

```
{
  "data": {
    "subscribe": {
      "beginBlock": {
        "hash": "z1mqumuIlE1bu623mDVXiiTGz6P9GjfreMu7m6AjkaA",
        "header": {
          "height": 14916
        }
      }
    }
  }
}
```

### 取消订阅

---

取消订阅特定主题的交易。服务器停止退回这个主题的交易。

`rpc unsubscribe(RequestUnsubscribe) returns (ResponseUnsubscribe)`

#### RequestSubscribe

| 名称 | 数据类型 | 默认 | 必须 |
| :--- | :------- | :--- | :--- |
| 主题 | 字符串   |      | 是   |

---

```protobuf
message RequestUnsubscribe { string topic = 1; }
```

<!-- output -->

#### ResponseSubscribe

| 名称 | 日期 类型  |
| :--- | :--------- |
| 代码 | StatusCode |

```protobuf
message ResponseUnsubscribe { StatusCode code = 1; }
```

#### GRPC 示例

python

```python
[1]request = RequestUnsubscribe(topic="WwUhZY4y4mUBMsQOj64eDPJRssDrJr+CSXAiEqWVoF8=")
[2]EventStub.unsubsribe(request)
```

#### GraphQL 示例

```graphql
mutation {
  unsubscribe(topic: "WwUhZY4y4mUBMsQOj64eDPJRssDrJr+CSXAiEqWVoF8=") {
    code
  }
}
```

响应

```
{
  "data": {
    "unsubscribe": {
      "code": "OK"
    }
  }
}
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNzY3NzUxNl19
-->
