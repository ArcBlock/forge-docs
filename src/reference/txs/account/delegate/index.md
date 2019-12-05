---
title: 'Delegate Transaction'
description: 'Delegate Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'account'
  - 'delegate'
---

**`DelegateTx`** is used for an account to delegate its signature rights to other accounts. This is useful if user wants to reduce the times of using an important account to sign transactions by using other accounts to perfrom certain activities.

After **`DelegateTx`** executes successfully, a delegation relationship is established between the two accounts. And the delegatee account can sign transactions on behalf of the delagator account based on the rule specified in the **`DelegateTx`**.

## Sample Code

The following shows how to use `DelegateTx` in Protocol Buffers.

```protobuf
message DelegateTx {
  string address = 1;
  string to = 2;
  repeated DelegateOp ops = 3; //

  google.protobuf.Any data = 15;
}

message DelegateOp {
  string type_url = 1;
  repeated string rules = 2;
}
```

| Name | Data Type | Description |
| - | - | - |
| `address` | string | Address of the delegation between sender and receiver, calculated by SDK|
| `to`| string | delegatee's address|
| `ops`| repeated(DelegatedOp) |A list of rules delegated to the delegatee. If rules are empty, signature for this type_url is entirely delegated.
| `data` (optional)| [Google.Protobuf.Any](https://developers.google.com/protocol-buffers/docs/proto3#any) | Custom user data |

## Sample Usage

### Configuration

To `DelegateTx`, user needs to have following setup in configuration. See detailed instructions to [Set Up Forge Configuration](../../../instruction/configuration).

```toml
[forge.transaction.delegate]

delta_interval = 18000
type_urls = ["fg:t:transfer", "fg:t:exchange"]
```

| Name | Data Type | Description |
| - | - | - |
| `delta_interval` | int | The number of blocks for a single delegation interval, used by the rules to limit the frequency of certain behavior. |
| `type_url`| list[string] | A list of transactions that can be delegated. Transactions whose type_urls are not listed here are not allowed to be delegated.|

::: tip
For example, if the `delta_interval` is set to `10`, then the interval for this delegation is 10 blocks. If the delegation rules are that the delegatee can only sign less than five transactions, the delegatee can only sign less than five transactions *every `10` blocks*.
:::

### `DelegateTx` with Single Signature

Alice wants to delegate the transfer rights to Betty with these limitations:

- Total txs Betty can sign within a deletagation interval: `10`
- Total balance within a deletagation interval Betty can consume: `155 ABT`
- Total balance Betty can consume: `1550 ABT`
- For a single transaction:
  - Betty cannot transfer any asset
  - Betty can transfer maximum value of 15.5 ABT

```elixir
type_url = "fg:t:transfer"
max_units = 15.5 |> ForgeAbi.token_to_unit() |> ForgeSdk.display()
rules = [
  "itx.value <= #{max_units} and itx.assets == []",
  "state.balance_delta + itx.value < #{max_units * 10}",
  "state.num_txs_delta < 5",
  "state.balance + itx.value < #{max_units * 100}",
]

itx = ForgeAbi.DelegateTx.new(
    to: betty.address,
    ops: [ForgeAbi.DelegateOp.new(type_url: type_url, rules: rules)]
  )

ForgeSdk.delegate(itx, wallet: alice)
```

Once the delegation is setup, Betty can sign `transferTx` on behalf of Alice. Blow shows how to Betty can send 10 tokens to Charlie on behalf of Alice:

```elixir
itx = ForgeAbi.TransferTx.new(to: charlie.address, value: ForgeSdk.token_to_unit(10))
ForgeSdk.transfer(itx, wallet: betty, delegatee: alice.address)
```

::: tip
When an delegatee is signing a transaction on behalf of the delegator, an extra field `delegatee` which contains the delegatee's address should be passed in.
:::

### `DelegateTx` with Multiple Signatures

Below shows if Alice delegated the rights for `ExchangeTx` to Betty, how Charlie can get Alice's `infinite stone` with 100 tokens. Since Betty have the signature rights for `ExchangeTx`, she can now perform the multisig for Alice:

```elixir
e1 = ForgeAbi.ExchangeInfo.new(value: ForgeSdk.token_to_unit(100))
e2 = ForgeAbi.ExchangeInfo.new(assets: [stone_address])

itx = ForgeAbi.ExchangeTx.new(sender: e1, receiver: e2)
tx = ForgeSdk.prepare_exchange(itx, wallet: charlie)

tx = ForgeSdk.finalize_exchange(tx, wallet: betty, delegatee: alice.address)
hash = ForgeSdk.send_tx(tx: tx)
```

::: tip
Similar to transaction with single signature, When an delegatee is signing a transaction on behalf of the delegator, an extra field `delegatee` which contains the delegatee's address should be passed in.
:::

## Delegation state

A delegation state is kept once a delegation is setup. The state contains a map with its key as `type_url` and the value as `DelegateOpState`, which contains statistics value that could be used in delegate rules.

```protobuf
message DelegateOpState {
  string rule = 1;
  uint64 num_txs = 2;
  uint64 num_txs_delta = 3;

  BigUint balance = 4;
  BigUint balance_delta = 5;
}

message DelegateState {
  string address = 1;
  map<string, DelegateOpState> ops = 2;

  StateContext context = 14;
  google.protobuf.Any data = 15;
}
```
