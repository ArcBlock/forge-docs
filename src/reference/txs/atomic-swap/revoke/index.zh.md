---
title: Revoke Swap
description: Revoke Swap
keywords: ""
robots: "index,follow"
category: docs
layout: documentation
tags:
  - atomic-swap
  - revoke
---

**RevokeSwap** 交易将处于交换状态的资产和令牌赎回回交换的发送方。如果发送者出于任何原因想要停止原子交换，则此事务很有用。但是为了保护接收者，发送者只能在其锁定时间之后撤消交换。

## 协议定义

```protobuf
message RevokeSwapTx {
  string address = 1;

  google.protobuf.Any data = 15;
}
```

- `address`  是要撤销的交换状态的地址。

## 例

这是如何发送撤销交换交易的示例。

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

# Assemble and send the RevokeSwapTx
itx = ForgeAbi.RevokeSwapTx.new(address: address)
ForgeSdk.revoke_swap(itx, wallet: sender, send: :commit)
```
