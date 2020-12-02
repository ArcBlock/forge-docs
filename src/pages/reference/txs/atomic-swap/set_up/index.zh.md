---
title: Setup Swap
description: Setup Swap
keywords: ""
robots: "index,follow"
category: ''
layout: documentation
tags:
  - atomic-swap
  - set_up
---

**SetupSwap** 交易是原子交换过程的第一步。此事务的目的是在链上创建一个交换状态，以临时持有令牌和资产。这些资产和令牌由哈希锁保护，哈希锁是 sha3-256 随机数的输出。为了获得资产和令牌，接收者必须知道这个随机数。交易通过后，资产和令牌将转移到交换状态，并被锁定，直到交易者指定的区块号为止。 `locktime`。

通常，“SetupSwap” 交易应成对出现在两个链中。例如，如果 Alice 在链 A 上为 Bob 设置了交换，则 Bob 应该使用以下方式在链 B 上为 Alice 设置交换：**相同的哈希锁**  作为整个原子交换过程的下一步。

## 协议定义

`SetupSwapTx`  被定义为：

```protobuf
message SetupSwapTx {
  BigUint value = 1;
  repeated string assets = 2;
  string receiver = 3;
  bytes hashlock = 4;
  uint32 locktime = 5;

  google.protobuf.Any data = 15;
}
```

- `value`  是要交换的代币数量。
- `assets`  是要交换的资产的地址。
- `receiver`  是唯一允许获得令牌和资产的帐户地址。
- `hashlock`  是随机数的 sha3-256 值。
- `locktime`  是块高度，在此高度之前，发件人无法撤消交换。

`SwapState`  被定义为：

```proto
message SwapState {
  string hash = 1;
  string address = 2;
  bytes hashkey = 3;
  string sender = 4;
  string receiver = 5;
  BigUint value = 6;
  repeated string assets = 7;
  uint32 locktime = 8;
  bytes hashlock = 9;
  StateContext context = 10;
}
```

- `hash`  是 SetupSwapTx 的哈希值。
- `adress`  是交换状态的地址。注意，交换地址是基于哈希值生成的。
- `hashkey`  是发件人确定的随机数。创建后立即为空。
- `sender`  是发件人的地址。
- `receiver`  是收件人的地址。
- `value`  是要交换的令牌。
- `assets`  是要交换的资产地址列表。
- `locktime`  是块高度，在此高度之前，发件人无法撤消交换。
- `hashlock`  是随机数的 sha3-256 值。
- `context`  是交换状态的状态上下文。

## 例

这是有关如何发送设置交换交易的示例。

```elixir
# Declare sender and receiver
sender = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice"), wallet: w)
receiver = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob"), wallet: w)

# Generate a random number as hashkey.
hashkey = :crypto.strong_rand_bytes(32)
# Calculate the sha3 output as hashlock.
hashlock = Mcrypto.hash(%Mcrypto.Hasher.Sha3{}, hashkey)

# Assemble and send the SetupSwapTx
itx = ForgeAbi.SetupSwapTx.new(
  value: ForgeAbi.token_to_unit(1),
  assets: [],
  receiver: receiver.address,
  locktime: 1000000,
  hashlock: hashlock
)
ForgeSdk.setup_swap(itx, wallet: sender, send: :commit)
```
