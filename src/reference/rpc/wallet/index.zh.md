---
title: "钱包 RPC"
description: "钱包 RPC"
keywords: ""
robots: "index,follow"
category: ""
layout: "documentation"
tags:
  - "rpc"
  - "wallet"
---

### 声明节点

---

`rpc declare_node(RequestDeclareNode) returns (ResponseDeclareNode);`

#### RequestDeclareNode

| 名称   | 数据类型 | 默认 | 必须 |
| :----- | :------- | :--- | :--- |
| 验证器 | bool     |      |      |

```protobuf
message RequestDeclareNode { bool validator = 1; }
```

---

### ResponseDeclareNode

| 名称 | 数据类型   | 默认 | 必须 |
| :--- | :--------- | :--- | :--- |
| 代码 | StatusCode |      |      |
| 钱包 | WalletInfo |      |      |

```protobuf
message ResponseDeclareNode {
  StatusCode code = 1;
  WalletInfo wallet = 3;
}
```
