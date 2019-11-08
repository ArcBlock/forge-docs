---
title: 'Wallet RPC'
description: 'Wallet RPC'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'rpc'
  - 'wallet'
---


## Declare Node

### Usage

`declare_node(RequestDeclareNode)`

```protobuf
message RequestDeclareNode { bool validator = 1; }
```

| Name      | Data Type | Default | Required |
| :-------- | :-------- | :------ | :------- |
| validator | bool      |         |          |

### Response

Use of `declare_node(RequestDeclareNode)` returns `ResponseDeclareNode`

```protobuf
message ResponseDeclareNode {
  StatusCode code = 1;
  WalletInfo wallet = 3;
}
```

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| wallet | WalletInfo |         |          |
