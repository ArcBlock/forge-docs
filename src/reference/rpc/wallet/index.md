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


## Create Wallet

### Usage

`create_wallet(RequestCreateWallet)`

```protobuf
message RequestCreateWallet {
  string passphrase = 1;
  WalletType type = 2;
  string moniker = 3;
}
```

| Name       | Data Type  | Default | Required |
| :--------- | :--------- | :----: | :-------: |
| passphrase | string     |         |    Yes      |
| type (deprecated)      | WalletType |         |          |
| moniker    | string     |  ""       |    No      |

---

### Response

Use of `create_wallet(RequestCreateWallet)` returns `ResponseCreateWallet`

```protobuf
message ResponseCreateWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| token  | string     |         |          |
| wallet | WalletInfo |         |          |


### gRPC example

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

### GraphQL example

## Load Wallet

### Usage

`load_wallet(RequestLoadWallet)`

```protobuf
message RequestLoadWallet {
  string address = 1;
  string passphrase = 2;
}

| Name       | Data Type | Default | Required |
| :--------- | :-------- | :------ | :------- |
| address    | string    |         |          |
| passphrase | string    |         |          |


```

### Response
Use of `load_wallet(RequestLoadWallet)` returns `ResponseLoadWallet`

```protobuf
message ResponseLoadWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| token  | string     |         |          |
| wallet | WalletInfo |         |          |

### GRPC example

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

## Recover Wallet

### Usage

`recover_wallet(RequestRecoverWallet)`

```protobuf
message RequestRecoverWallet {
  bytes data = 1;
  WalletType type = 2;
  string passphrase = 3;
  string moniker = 4;
}
```

| Name       | Data Type  | Default | Required |
| :--------- | :--------- | :------ | :------- |
| data       | bytes      |         |          |
| type       | WalletType |         |          |
| passphrase | string     |         |          |
| moniker    | string     |         |          |

### Response

Use of `recover_wallet(RequestRecoverWallet)` returns `(ResponseRecoverWallet)`

```protobuf
message ResponseRecoverWallet {
  StatusCode code = 1;
  string token = 2;
  WalletInfo wallet = 3;
}
```

| Name   | Data Type  | Default | Required |
| :----- | :--------- | :------ | :------- |
| code   | StatusCode |         |          |
| token  | string     |         |          |
| wallet | WalletInfo |         |          |

## List Wallet

### Usage

`list_wallet(RequestListWallet)`

```protobuf
message RequestListWallet {}
```

### Response
Use of `list_wallet(RequestListWallet)` returns `stream ResponseListWallet`

```protobuf
message ResponseListWallet {
  StatusCode code = 1;
  string address = 2;
}
```

| Name       | Data Type | Default | Required |
| :--------- | :-------- | :------ | :------- |
| StatusCode | code      |         |          |
| address    | string    |         |          |

### GRPC example

```elixir
> ForgeSdk.list_wallet()
["z11316Do74hbGsppsVwB4dtguPkaLjuwW7f8", "z114LHvpHPpDe4qnTGpWdPFibXWEMpPokK1R",
 "z114jALcNqbWuxwoFpbWfnu2pe5nBvEuU1W5", "z115LDoHYJsgLrGKauvyF4jaAFqhNDa2Ra76",
 "z11G65tRo2eGFVCjCBj7fdRhVSbzYSUCG6zb", "z11PYpcvZ6JnPnJ9KddmyJ82U1S15LenvWAh"]
```

## Remove Wallet

### Usage

`remove_wallet(RequestRemoveWallet)`

| Name    | Data Type | Default | Required |
| :------ | :-------- | :------ | :------- |
| address | string    |         |          |

```protobuf
message RequestRemoveWallet { string address = 1; }
```

### Response

Use of `remove_wallet(RequestRemoveWallet)` returns `ResponseRemoveWallet`

```protobuf
message ResponseRemoveWallet { StatusCode code = 1; }
```

### GRPC example

```elixir
> ForgeSdk.remove_wallet(ForgeAbi.RequestRemoveWallet.new(address: "z11316Do74hbGsppsVwB4dtguPkaLjuwW7f8"))
:ok
```

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
