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

钱包 RPC 帮助用户管理其钱包，如创建、加载、恢复等。

## RPC 列表

- [创建钱包](#create-wallet)
- [加载钱包](#load-wallet)
- [恢复钱包](#recover-wallet)
- [列出钱包](#list-wallet)
- [移除钱包](#remove-wallet)
- [声明节点](#declare-node)

---

### 创建钱包

---

`rpc create_wallet(RequestCreateWallet) returns (ResponseCreateWallet);`

#### RequestCreateWallet

| 名称 | 数据类型   | 默认 | 必须 |
| :--- | :--------- | :--- | :--- |
| 密码 | 字符串     |      |      |
| 类型 | WalletType |      |      |
| 姓名 | 字符串     |      |      |

```protobuf
message RequestCreateWallet {
  string passphrase = 1;
  WalletType type = 2;
  string moniker = 3;
}
```

---

### ResponseCreateWallet

| 名称 | 数据类型   | 默认 | 必须 |
| :--- | :--------- | :--- | :--- |
| 代码 | StatusCode |      |      |
| 凭证 | 字符串     |      |      |
| 钱包 | WalletInfo |      |      |

```protobuf
message ResponseCreateWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

#### GRPC 示例

```elixir
> {w, t} = ForgeSdk.create_wallet(moniker: "arcblock", passphrase: "abcd1234")
{%ForgeAbi.WalletInfo{
   address: "z11G65tRo2eGFVCjCBj7fdRhVSbzYSUCG6zb",
   pk: <<27, 242, 2, 33, 236, 174, 199, 94, 89, 160, 83, 74, 99, 98, 120, 244,
     175, 191, 238, 13, 40, 166, 132, 18, 33, 247, 25, 236, 166, 101, 115,
     235>>,
   sk: <<231, 135, 155, 9, 108, 84, 181, 233, 21, 193, 84, 69, 212, 138, 24, 89,
     122, 163, 239, 67, 160, 35, 201, 206, 247, 60, 43, 122, 76, 76, 226, 103,
     27, 242, 2, 33, 236, 174, 199, 94, 89, 160, 83, 74, 99, 98, ...>>,
   type: nil
 }, "c8b11353a2b9917d4f32042255b6eb49"}
```

#### GraphQL 示例

### 加载钱包

---

`rpc load_wallet(RequestLoadWallet) returns (ResponseLoadWallet);`

#### RequestLoadWallet

| 名称 | 数据类型 | 默认 | 必须 |
| :--- | :------- | :--- | :--- |
| 地址 | 字符串   |      |      |
| 密码 | 字符串   |      |      |

```protobuf
message RequestLoadWallet {
  string address = 1;
  string passphrase = 2;
}
```

---

### ResponseLoadWallet

| 名称 | 数据类型   | 默认 | 必须 |
| :--- | :--------- | :--- | :--- |
| 代码 | StatusCode |      |      |
| 凭证 | 字符串     |      |      |
| 钱包 | WalletInfo |      |      |

```protobuf
message ResponseLoadWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

#### GRPC 示例

```elixir
> {w, t} = ForgeSdk.load_wallet(address: "z11G65tRo2eGFVCjCBj7fdRhVSbzYSUCG6zb", passphrase: "abcd1234")
{%ForgeAbi.WalletInfo{
   address: "z11G65tRo2eGFVCjCBj7fdRhVSbzYSUCG6zb",
   pk: <<27, 242, 2, 33, 236, 174, 199, 94, 89, 160, 83, 74, 99, 98, 120, 244,
     175, 191, 238, 13, 40, 166, 132, 18, 33, 247, 25, 236, 166, 101, 115,
     235>>,
   sk: "",
   type: nil
 }, "a804e2c6c4f96fde25c475237f7fbb73"}
```

#### GraphQL 示例

### 恢复钱包

---

`rpc recover_wallet(RequestRecoverWallet) returns (ResponseRecoverWallet);`

#### RequestRecoverWallet

| 名称 | 数据类型   | 默认 | 必须 |
| :--- | :--------- | :--- | :--- |
| 数据 | 字节       |      |      |
| 类型 | WalletType |      |      |
| 密码 | 字符串     |      |      |
| 姓名 | 字符串     |      |      |

```protobuf
message RequestRecoverWallet {
  bytes data = 1;
  WalletType type = 2;
  string passphrase = 3;
  string moniker = 4;
}
```

---

### ResponseRecoverWallet

| 名称 | 数据类型   | 默认 | 必须 |
| :--- | :--------- | :--- | :--- |
| 代码 | StatusCode |      |      |
| 凭证 | 字符串     |      |      |
| 钱包 | WalletInfo |      |      |

```protobuf
message ResponseRecoverWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

#### GRPC 示例

```
> ForgeSdk.recover_wallet
```

#### GraphQL 示例

### 列出钱包

---

`rpc list_wallet(RequestListWallet) returns (stream ResponseListWallet);`

#### RequestListWallet

```protobuf
message RequestListWallet {}
```

---

### ResponseListWallet

| 名称       | 数据类型 | 默认 | 必须 |
| :--------- | :------- | :--- | :--- |
| StatusCode | 代码     |      |      |
| 地址       | 字符串   |      |      |

```protobuf
message ResponseListWallet {
  StatusCode code = 1;
  string address = 2;
}
```

#### GRPC 示例

```elixir
> ForgeSdk.list_wallet()
["z11316Do74hbGsppsVwB4dtguPkaLjuwW7f8", "z114LHvpHPpDe4qnTGpWdPFibXWEMpPokK1R",
 "z114jALcNqbWuxwoFpbWfnu2pe5nBvEuU1W5", "z115LDoHYJsgLrGKauvyF4jaAFqhNDa2Ra76",
 "z11G65tRo2eGFVCjCBj7fdRhVSbzYSUCG6zb", "z11PYpcvZ6JnPnJ9KddmyJ82U1S15LenvWAh"]
```

#### GraphQL 示例

### 移除钱包

---

`rpc remove_wallet(RequestRemoveWallet) returns (ResponseRemoveWallet);`

#### RequestRemoveWallet

| 名称 | 数据类型 | 默认 | 必须 |
| :--- | :------- | :--- | :--- |
| 地址 | 字符串   |      |      |

```protobuf
message RequestRemoveWallet { string address = 1; }
```

---

### ResponseRemoveWallet

```protobuf
message ResponseRemoveWallet { StatusCode code = 1; }
```

#### GRPC 示例

```elixir
> ForgeSdk.remove_wallet(ForgeAbi.RequestRemoveWallet.new(address: "z11316Do74hbGsppsVwB4dtguPkaLjuwW7f8"))
:ok
```

#### GraphQL 示例

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
