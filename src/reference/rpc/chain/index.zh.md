---
title: 'Chain API'
description: ''
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'rpc'
  - 'chain'
---

## Get Chain Info

### Usage

`get_chain_info(RequestGetChainInfo)`

```protobuf
message RequestGetChainInfo {}
```

### Response

Use of `get_chain_info(RequestGetChainInfo)` returns `ResponseGetChainInfo`

```protobuf
message ResponseGetChainInfo {
  StatusCode code = 1;
  ChainInfo info = 2;
}
```

| Name | Data Type                               |
| :--- | :-------------------------------------- |
| code | StatusCode                              |
| info | [ChainInfo](../../types/type#chaininfo) |

## Get Node Info

### Usage

`get_node_info(RequestGetNodeInfo)`

```protobuf
message RequestGetNodeInfo {}
```

### Response

Use of `get_node_info(RequestGetNodeInfo)` returns `ResponseGetNodeInfo`

```protobuf
message ResponseGetNodeInfo {
  StatusCode code = 1;
  NodeInfo info = 2;
}
```

| Name | Data Type                             |
| :--- | :------------------------------------ |
| code | StatusCode                            |
| info | [NodeInfo](../../types/type#nodeinfo) |

## Send Tx

### Usage

`send_tx(RequestSendTx)`

```protobuf
message RequestSendTx {
  Transaction tx = 1;
  WalletInfo wallet = 2;
  string token = 3;
  bool commit = 4;
}
```

| Name   | Data Type                                   | Default | Required |
| ------ | ------------------------------------------- | ------- | -------- |
| tx     | [Transaction](../../types/type#transaction) |         | Yes      |
| wallet | [WalletInfo](../../types/type#walletinfo)   |         | Yes      |
| token  | string                                      | ""      | No       |
| commit | bool                                        | false   | No       |

### Response

Use of `get_tx(RequestSendTx)` returns `ResponseSendTx`

```protobuf
message ResponseSendTx {
  StatusCode code = 1;
  string hash = 2;
}
```

| Name | Data Type  |
| :--- | :--------- |
| code | StatusCode |
| hash | string     |

## Get Block

### Usage

`get_block(RequestGetBlock)`

```protobuf
message RequestGetBlock { uint64 height = 1;
```

| Name   | Data Type | Default | Required |
| ------ | --------- | ------- | -------- |
| height | int       |         | Yes      |

### Response

Use of `get_block(RequestGetBlock)` returns `ResponseGetBlock`

```protobuf
message ResponseGetBlock {
  StatusCode code = 1;
  BlockInfo block = 2;
}
```

| Name  | Data Type                               |
| :---- | :-------------------------------------- |
| code  | StatusCode                              |
| block | [BlockInfo](../../types/type#blockinfo) |

## Get Blocks

### Usage

`get_blocks(RequestGetBlocks)`

```protobuf
message RequestGetBlocks {
  PageInput paging = 1;
  RangeFilter height_filter = 2;
  bool empty_excluded = 3;
}
```

| Name           | Data Type                                         | Default | Required |
| -------------- | ------------------------------------------------- | ------- | -------- |
| paging         | [PageInfo](../../types/trace_type#pageinfo)       | null    |          |
| height_filter  | [RangeFilter](../../types/trace_type#rangefilter) | null    |          |
| empty_excluded | bool                                              | false   |          |

### Response

Use of `get_blocks(RequestGetBlocks)` returns `ResponseGetBlocks`

```protobuf
message ResponseGetBlocks {
  StatusCode code = 1;
  PageInfo page = 2;
  repeated BlockInfoSimple blocks = 3;
}
```

| Name   | Data Type                                                          |
| :----- | :----------------------------------------------------------------- |
| code   | StatusCode                                                         |
| page   | [PageInfo](../../types/trace_type#pageinfo)                        |
| blocks | repeated [BlockInfoSimple](../../types/trace_type#blockinfosimple) |

## Get Tx

### Usage

`get_tx(RequestGetTx)`

```protobuf
message RequestGetTx { string hash = 1; }
```

| Name | Data Type | Default | Required |
| ---- | --------- | ------- | -------- |
| hash | string    |         | Yes      |

### Response

Use of `get_tx(RequestGetTx)` returns `ResponseGetTx`

```protobuf
message ResponseGetTx {
  StatusCode code = 1;
  TransactionInfo info = 2;
}
```

| Name | Data Type                                           |
| :--- | :-------------------------------------------------- |
| code | StatusCode                                          |
| info | [TransactionInfo](../../types/type#transactioninfo) |

## Multisig

### Usage

`multisig(RequestMultisig)`

```protobuf
message RequestMultisig {
  Transaction tx = 1;
  google.protobuf.Any data = 2;
  WalletInfo wallet = 3;
  string token = 4;
  string delegatee = 5;
}
```

| Name      | Data Type                                                                             | Default | Required |
| --------- | ------------------------------------------------------------------------------------- | ------- | -------- |
| tx        | [Transaction](../../types/type#transaction)                                           |         | No       |
| data      | [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) |         | No       |
| wallet    | [WalletInfo](../../types/type#walletinfo)                                             |         | Yes      |
| token     | string                                                                                |         | No       |
| delegatee | string                                                                                | ""      | No       |

### Response

```protobuf
message ResponseMultisig {
  StatusCode code = 1;
  Transaction tx = 2;
}
```

| Name | Data Type                                   |
| :--- | :------------------------------------------ |
| code | StatusCode                                  |
| tx   | [Transaction](../../types/type#transaction) |
