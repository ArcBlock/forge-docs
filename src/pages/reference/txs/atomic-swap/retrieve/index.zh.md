---
title: Retrieve Swap
description: Retrieve Swap
keywords: ""
robots: "index,follow"
category: ''
layout: documentation
tags:
  - atomic-swap
  - retrieve
---

**RetrieveSwap** 接收方发送交易，将令牌和资产从交换状态移到他或她自己的状态。要求接收者指定在此事务中要检索的交换状态的地址，并且还要求显示其 sha3-256 输出等于哈希键的随机数的原始值。交易通过后，所有处于交换状态的资产和令牌都将转移到接收方，并将哈希键写入交换状态。

## 协议定义

的 `RetrieveSwapTx`  定义为：

```protobuf
message RetrieveSwapTx {
  string address = 1;
  bytes hashkey = 2;

  google.protobuf.Any data = 15;
}
```

- `address`  是交换状态的地址。
- `hashkey`  是随机数的原始值。

## 例

这是有关如何发送检索交换交易的示例。

```elixir
# Declare sender and receiver
sender = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice"), wallet: w)
receiver = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob"), wallet: w)

# Generates a random number as hashkey.
hashkey = :crypto.strong_rand_bytes(32)
# Calculates the sha3 output as hashlock.
hashlock = Mcrypto.hash(%Mcrypto.Hasher.Sha3{}, hashkey)

# Assemble and send the SetupSwapTx
itx = ForgeAbi.SetupSwapTx.new(
  value: ForgeAbi.token_to_unit(1),
  assets: [],
  receiver: receiver.address,
  locktime: 1000000,
  hashlock: hashlock
)
hash = ForgeSdk.setup_swap(itx, wallet: sender, send: :commit)

# Calculates the swap address created by this transaction.
address = ForgeSdk.Util.to_swap_address(hash)

# Assemble and send the RetrieveSwapTx
itx = ForgeAbi.RetrieveSwapTx.new((address: address, hashkey: hashkey)
ForgeSdk.retrieve_swap(itx, wallet: receiver, send: :commit)
```
