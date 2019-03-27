# Event RPC

Event RPCs help users to interact with activities they are interested in. All activities exist in the form of transactions. By using event RPCs, users can receive real-time information on updates of the transactions type they requested.

## RPC list

- [Subscribe](#subscribe)
- [Unsubscribe](#unsubscribe)

### Subscribe

---

subscribe a certian topic of transactions. Server returns all transactions under that topic in a stream format.

`subscribe(RequestSubscribe) returns (stream ResponseSubscribe)`


#### RequestSubscribe

| Name   | Data Type | Default  | Required |
| :----- | :-------- | :------- | :------- |
| type   | TopicType | transfer |          |
| filter | string    | ''       |          |

```protobuf
message RequestSubscribe {
  TopicType type = 1;
  string filter = 2;
}
```

---

#### ResponseSubscribe

| Name              | Data Type                                      |
| :---------------- | :--------------------------------------------- |
| code              | int                                            |
| One Of Below      |                                                |
| transfer          | [Transaction](../../types/type.md#transaction) |
| account_migrate   | [Transaction](../../types/type.md#transaction) |
| confirm           | [Transaction](../../types/type.md#transaction) |
| create_asset      | [Transaction](../../types/type.md#transaction) |
| exchange          | [Transaction](../../types/type.md#transaction) |
| revoke            | [Transaction](../../types/type.md#transaction) |
| begin_block       | RequestBeginBlock                              |
| end_block         | RequestEndBlock                                |
| declare           | [Transaction](../../types/type.md#transaction) |
| update_asset      | [Transaction](../../types/type.md#transaction) |
| consensus_upgrade | [Transaction](../../types/type.md#transaction) |
| declare_file      | [Transaction](../../types/type.md#transaction) |
| sys_upgrade       | [Transaction](../../types/type.md#transaction) |
| stake             | [Transaction](../../types/type.md#transaction) |
| account_state     | [Transaction](../../types/type.md#transaction) |
| asset_state       | [Transaction](../../types/type.md#transaction) |
| forge_state       | [Transaction](../../types/type.md#transaction) |
| stake_state       | [Transaction](../../types/type.md#transaction) |

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

#### GRPC Example

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

#### GraphQL Example

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

response

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

### Unsubscribe

---

Unsubscribe a certian topic of transactions. Server stops return this topic of transactions.

`rpc unsubscribe(RequestUnsubscribe) returns (ResponseUnsubscribe)`

#### RequestSubscribe

| Name  | Data Type | Default | Required |
| :---- | :-------- | :------ | :------- |
| topic | string    |         | Yes      |

---

```protobuf
message RequestUnsubscribe { string topic = 1; }
```

<!-- output -->

#### ResponseSubscribe

| Name | Data Type  |
| :--- | :--------- |
| code | StatusCode |

```protobuf
message ResponseUnsubscribe { StatusCode code = 1; }
```

#### GRPC Example

python

```python
[1]request = RequestUnsubscribe(topic="WwUhZY4y4mUBMsQOj64eDPJRssDrJr+CSXAiEqWVoF8=")
[2]EventStub.unsubsribe(request)
```

#### GraphQL Example

```graphql
mutation {
  unsubscribe(topic: "WwUhZY4y4mUBMsQOj64eDPJRssDrJr+CSXAiEqWVoF8=") {
    code
  }
}
```

response

```
{
  "data": {
    "unsubscribe": {
      "code": "OK"
    }
  }
}
```
