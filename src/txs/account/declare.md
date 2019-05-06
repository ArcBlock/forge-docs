# Declare Transaction

**Declare** transaction declares a wallet into an account of the chain. In Forge, only a wallet has a corresponding account, it can send or receive transactions, or carry out whatever activities permitted by the chain.

## Protocol definition

To declare a wallet you shall use `DeclareTx` message:

```proto
message DeclareTx {
  string moniker = 1;
  string issuer = 2;

  google.protobuf.Any data = 15;
}
```

You just need to fill `moniker` for your wallet and then assemble and sign this transaction. Since in `Trasnaction` message, your address and pk are provided, the generated account state will use those information.

Here's an example of sending a declare tx:

```elixir
> wallet = ForgeSdk.create_wallet()
> ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: wallet)
```

## Restricted Declaration

For certain applications, accounts are a controlled resources that not everyone can get freely. Thus we provided restricted declaration, which application owner can just set `restricted = true` in forge configuration like this:

```toml
...

[forge.transaction.declare]
restricted = true

...
```

Then a normal declare transaction would fail. Under this setting, declaration can be carried out only if it is endorsed (multi-signed) by an existing account in the chain.

This feature can be used to implement a) a referral system, like gmail in the early ages b) paid accounts.
