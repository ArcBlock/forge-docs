# Delegate Transaction

**Declare** transaction declares a wallet into an account of the chain. In Forge, only a wallet has a corresponding account, it can send or receive transactions, or carry out whatever activities permitted by the chain.

an account can delegate its signature rights to other accounts by sending a **Delegate** transaction. The delegate transaction can contain a list of type urls and the rules applied to those type urls. Once the delegation between two accounts are established, a delegation state will be stored in the MPT (inside account column family) for validation and statistics purpose.

## Configuration

delegate tx has its own configuration, and this configuration will be kept in forge state as a consensus parameters.

```toml
[forge.transaction.delegate]

# delta interval
delta_interval = 18000
# allowed type_urls for delegation
type_urls = ["fg:t:transfer", "fg:t:exchange"]
```

The `delta_interval` is the number of blocks for a period, we use this to keep the number of transactions and number of tokens in this interval. The `type_url` is a whitelist that only the txs in this list could be delegated.

## Protocol definition

To delegate certain rights you shall use `DelegateTx` message:

```proto
message DelegateTx {
  string address = 1; // address of the delegation between sender and receiver
  string to = 2;      // delegatee's address
  repeated DelegateOp ops = 3; // a list of operations permitted

  google.protobuf.Any data = 15;
}

// if rules are empty, signature for this type_url is entirely delegated
// otherwise rules are checked one by one, relationship between rules is AND.
// a rule is an expression defined in rule_parser
// (github.com/arcblock/rule-parser) one can setup
message DelegateOp {
  string type_url = 1;
  repeated string rules = 2;
}
```

## Delegate Tx Usage

## Normal Tx

Below is an example for a delegation - alice wants to delegate the transfer rights to betty with these limitations:

- total txs she can sign within predefined interval: 10
- total balance within predefined interval she can consume: 155 ABT
- total balance she can consume: 1550 ABT
- for single tx:
  - cannot transfer any assets
  - maximum value is 15.5 ABT

The code (using elixir SDK) looks like this:

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

One the delegation is setup, betty can do transfer on behalf of alice - say she wants to send 10 tokens to charlie:

```elixir
itx = ForgeAbi.TransferTx.new(to: charlie.address, value: ForgeSdk.token_to_unit(10))
ForgeSdk.transfer(itx, wallet: betty, delegatee: alice.address)
```

Here the only difference for doing the delegated transfer is to pass `delegatee` address.

## Multisig Tx

Delegation could also be applied to tx that requires multisig. Say alice delegated the rights for `exchange` to betty, and charlie wants to get alice's infinite stone with 100 tokens. Since betty have the signature rights for that, she can do the multisig:

```elixir
e1 = ForgeAbi.ExchangeInfo.new(value: ForgeSdk.token_to_unit(100))
e2 = ForgeAbi.ExchangeInfo.new(assets: [stone_address])

itx = ForgeAbi.ExchangeTx.new(sender: e1, receiver: e2)
tx = ForgeSdk.prepare_exchange(itx, wallet: charlie)

tx = ForgeSdk.finalize_exchange(tx, wallet: betty, delegatee: alice.address)
hash = ForgeSdk.send_tx(tx: tx)
```

Same as previous example, here to do delegated multisig, one just need to pass the `delegatee` address.

## Delegation state

As said in previous doc, a delegation state is kept once a delegation is setup. The state contains a map with its key as `type_url` and the value as `DelegateOpState`, which contains statistics value that could be used in delegate rules.

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
