---
title: "钱包 RPC"
description: "钱包 RPC"
keywords: ""
robots: "index,follow"
category: "docs"
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

#### GRPC 示例

```elixir

```

#### GraphQL 示例

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA2Mjk3NzY5OSwxMTc0OTk1Mjc1XX0=
-->
