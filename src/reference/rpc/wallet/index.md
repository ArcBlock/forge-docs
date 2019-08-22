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

Wallet RPC helps user manage their wallet, like create, load, recover etc.

## RPC list

- [Create Wallet](#create-wallet)
- [Load Wallet](#load-wallet)
- [Recover Wallet](#recover-wallet)
- [List Wallet](#list-wallet)
- [Remove Wallet](#remove-wallet)
- [Declare Node](#declare-node)

---

### Create Wallet

---

`rpc create_wallet(RequestCreateWallet) returns (ResponseCreateWallet);`

#### RequestCreateWallet

| Name       | Data Type  | Default | Required |
| :--------- | :--------- | :------ | :------- |
| passphrase | string     |         |          |
| type       | WalletType |         |          |
| moniker    | string     |         |          |

```protobuf
message RequestCreateWallet {
  string passphrase = 1;
  WalletType type = 2;
  string moniker = 3;
}
```

---

### ResponseCreateWallet

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| token  | string     |         |          |
| wallet | WalletInfo |         |          |

```protobuf
message ResponseCreateWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

#### GRPC example

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

#### GraphQL example

### Load Wallet

---

`rpc load_wallet(RequestLoadWallet) returns (ResponseLoadWallet);`

#### RequestLoadWallet

| Name       | Data Type | Default | Required |
| :--------- | :-------- | :------ | :------- |
| address    | string    |         |          |
| passphrase | string    |         |          |

```protobuf
message RequestLoadWallet {
  string address = 1;
  string passphrase = 2;
}
```

---

### ResponseLoadWallet

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| token  | string     |         |          |
| wallet | WalletInfo |         |          |

```protobuf
message ResponseLoadWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

#### GRPC example

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

#### GraphQL example

### Recover Wallet

---

`rpc recover_wallet(RequestRecoverWallet) returns (ResponseRecoverWallet);`

#### RequestRecoverWallet

| Name       | Data Type  | Default | Required |
| :--------- | :--------- | :------ | :------- |
| data       | bytes      |         |          |
| type       | WalletType |         |          |
| passphrase | string     |         |          |
| moniker    | string     |         |          |

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

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| token  | string     |         |          |
| wallet | WalletInfo |         |          |

```protobuf
message ResponseRecoverWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

#### GRPC example

```
> ForgeSdk.recover_wallet
```

#### GraphQL example

### List Wallet

---

`rpc list_wallet(RequestListWallet) returns (stream ResponseListWallet);`

#### RequestListWallet

```protobuf
message RequestListWallet {}
```

---

### ResponseListWallet

| Name       | Data Type | Default | Required |
| :--------- | :-------- | :------ | :------- |
| StatusCode | code      |         |          |
| address    | string    |         |          |

```protobuf
message ResponseListWallet {
  StatusCode code = 1;
  string address = 2;
}
```

#### GRPC example

```elixir
> ForgeSdk.list_wallet()
["z11316Do74hbGsppsVwB4dtguPkaLjuwW7f8", "z114LHvpHPpDe4qnTGpWdPFibXWEMpPokK1R",
 "z114jALcNqbWuxwoFpbWfnu2pe5nBvEuU1W5", "z115LDoHYJsgLrGKauvyF4jaAFqhNDa2Ra76",
 "z11G65tRo2eGFVCjCBj7fdRhVSbzYSUCG6zb", "z11PYpcvZ6JnPnJ9KddmyJ82U1S15LenvWAh"]
```

#### GraphQL example

### Remove Wallet

---

`rpc remove_wallet(RequestRemoveWallet) returns (ResponseRemoveWallet);`

#### RequestRemoveWallet

| Name    | Data Type | Default | Required |
| :------ | :-------- | :------ | :------- |
| address | string    |         |          |

```protobuf
message RequestRemoveWallet { string address = 1; }
```

---

### ResponseRemoveWallet

```protobuf
message ResponseRemoveWallet { StatusCode code = 1; }
```

#### GRPC example

```elixir
> ForgeSdk.remove_wallet(ForgeAbi.RequestRemoveWallet.new(address: "z11316Do74hbGsppsVwB4dtguPkaLjuwW7f8"))
:ok
```

#### GraphQL example

### Declare Node

---

`rpc declare_node(RequestDeclareNode) returns (ResponseDeclareNode);`

#### RequestDeclareNode

| Name      | Data Type | Default | Required |
| :-------- | :-------- | :------ | :------- |
| validator | bool      |         |          |

```protobuf
message RequestDeclareNode { bool validator = 1; }
```

---

### ResponseDeclareNode

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| wallet | WalletInfo |         |          |

```protobuf
message ResponseDeclareNode {
  StatusCode code = 1;
  WalletInfo wallet = 3;
}
```

#### GRPC example

```elixir

```

#### GraphQL example
