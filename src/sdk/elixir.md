# Forge Elixir/Erlang SDK

## Forge SDK

To develop applications on top of the forge, you shall pick up a SDK. Forge SDK is intended to make the interaction with the chain built by Forge as easy as possible. All SDK APIs are organized into the following categories:

- chain APIs: provide the client wrapper for chain related gRPC
- wallet APIs: provide the client wrapper for wallet related gRPC
- state APIs: provide the client wrapper for state related gRPC
- subscription APIs: provide the client wrapper for subscription related gRPC
- transaction APIs: the gRPC for transaction is send_tx, this set of APIs provide helper functions to make building and sending a tx easy.
- misc APIs: parsing configuration, initialize sdk and more.

Github link, please see:
- [Forge SDK](https://github.com/ArcBlock/forge-elixir-sdk)
- [Abt Did](https://github.com/ArcBlock/abt-did-elixir)
- [Forge Abi](https://github.com/ArcBlock/forge-abi)

For more document, please see:
- [Forge SDK overview](https://docs.arcblock.io/forge/latest/sdk/)
- [Forge SDK](https://hexdocs.pm/forge_sdk/ForgeSdk.html)
- [Abt Did](https://hexdocs.pm/abt_did_elixir/AbtDid.html)
- [Forge Abi](https://hexdocs.pm/forge_abi/ForgeAbi.html)

## Installation

For every new release we ship osx and ubuntu binaries. If you're using these two platforms, you can install latest forge-cli:

```bash
$ npm install -g @arcblock/forge-cli
```

And then run:

```bash
$ forge init
$ forge start
$ forge web start
```

Once forge is started, you can open `http://localhost:8210` in your browser. Since there's no any data in your chain (if it is your first run), you can run our simulator to inject some random data:

```bash
$ forge simulator start
```

## Usage

### Step 0

First get your Forge running on local with [Forge CLI](../tools/forge_cli.md).

### Step 1

Find the config your forge is using by `forge config`

### Step 2

Set `FORGE_CONFIG` as your environment variable, pointing to the config your forge is running on.


## Tutorials

### Level 1: Transfer Money

**Scenario**: Alice wants to transfer 10 TBA to Bob.

::: tip Notes
**TBA** is the default currency on Forge Chain. 1 TBA has 16 digits, so it shows as `10000000000000000`.
:::

#### Step 1: create wallets for Alice and Bob

```elixir
w1 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice_wallet"), wallet: w1)
w2 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob_wallet"), wallet: w2)
```

::: tip Notes
`moniker` is a nickname for this wallet on Forge. `passphrase` is used by Forge to encrypt the wallet into a keystore file. More details about wallet declaration rules are [here](../intro/concepts.md).
:::

Let's take a look at Alice's wallet and here account details

```elixir
ForgeSdk.get_account_state(address: w1.address)
```

#### Step 2: Help Alice send a Checkin Transaction to get some money

Now you have created wallets for Alice and Bob, but there's no money in their accounts. Let's help Alice to earn some money by sending a **Checkin** transaction.

```elixir
ForgeSdk.checkin(wallet: w1)
```
Receiving the **hash** means the transaction has been passed to Forge, but doens't mean the transaction is successful. To confirm that the transaction is sent successfully, let's dive deeper into the tranaction details.

```elixir
ForgeSdk.get_tx(hash: "89FA6DAF67C8F54870599313079DC6F8D7CD483864FE7A7BCDFB9DF4D8ECDAD1")
```

If `code` in `TransactionInfo` returns `0`, that means the transaction has been executed successfully. Now Alice should have 25 TBA in her account.

Now let's check Alice's account balance. There should be 25 TBA in `balance` in `AccountState`.

```elixir
ForgeSdk.get_account_state(address: w2.address)
```

::: tip Notes
**Checkin**: Each account can send a **Checkin Transaction** to get 25 TBA each day.
**Hash**: The calculated hash of the signed transaction. Each transaction should have its own unique **hash**.
:::

#### Step 3: Transfer the money from Alice to Bob

Now Alice has 25 TBA in her account and Bob has nothing. We can help Alice transfer 10 TBA to Bob by sending out a **transfer transaction**.

```elixir
itx = ForgeAbi.TransferTx.new(to: w2.address, value: ForgeSdk.token_to_unit(10))
# sign with alice's wallet
tx1 = ForgeSdk.transfer(itx, wallet: w1)
ForgeSdk.get_tx(hash: tx1)
ForgeSdk.get_account_state(address: w1.address)
```

Now we can see tht Alice just successfully transferred 10 TBA to Bob's Account!

 🎉 Congratulations! You have finished the Level 1 tutorial! Now you should have a general sense about how Forge works. If you want more challenges, go checkout Level 2 and Level 3 tutorials.

 ### Level 2: Sell a Used Laptop

 **Scenario**: Bob wants to sell a used laptop to Alice.

#### Step 1: Create accounts for Alice and Bob

```elixir
w1 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice_wallet"), wallet: w1)
w2 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob_wallet"), wallet: w2)
```

After creating accounts for Alice and Bob, we help Alice to get some money to buy Bob's laptop

```elixir
ForgeSdk.checkin(wallet: w1)
```

#### Step 2: Create a laptop asset for Bob

In real world, Bob could have just sold Alice his laptop. With Forge SDK, any physical item can exist in the form of **asset**.

Let's try to help Bob create a laptop asset with the **CreateAssetTx**. The `data` field is for users to put item-specific information, where `type_url` is hints for how to decode the serialized `value` field. In this tutorial, for simplicity purpose, we only put the name of thel laptop.

```elixir
asset_data = Google.Protobuf.Any.new(type_url: "laotop", value: "brand new")
hash = ForgeSdk.create_asset(ForgeAbi.CreateAssetTx.new(data: asset_data), wallet: w2)
asset_address = ForgeSdk.get_address(hash)
```

Then we can see how the asset acutally look like.

```elixir
ForgeSdk.get_asset_state(address: asset_address)
```

The laset field is the `data` field, where we can see `type_url: "laotop", value: "brand new"`. You can also put more complicated information inside, like serialized protobuf message.

#### Step 3 : Exchange the asset with money

Now Alice has 25 TBA in her account, and Bob has a laptop asset. What should Bob do if he wants to sell the laptop asset for 10 TBA? He can initiate an **ExchangeTx**.

Since Bob is going to be the sender, we put the laptop `asset_address` as what he will exchange. Similarly, Alice will exchange 10 TBA.

```elixir

sender_info = ForgeAbi.ExchangeInfo.new(assets: [asset_address])
receiver_info = ForgeAbi.ExchangeInfo.new(value: ForgeSdk.token_to_unit(10))
itx = ForgeAbi.ExchangeTx.new(to: w1.address, sender: sender_info, receiver: receiver_info)
# bob generate the tx
tx = ForgeSdk.prepare_exchange(itx, wallet: w2)
# bob gave the tx to alice to multi-sign
tx1 = ForgeSdk.finalize_exchange(tx, wallet: w1)
hash = ForgeSdk.send_tx(tx: tx1)
```

Now if we check the laptop's owner, the `owner` in `AssetState` should be Alice's address.

```elixir
ForgeSdk.get_asset_state(address: asset_address)
```

Alice's account should have only 15 TBA after she pays for the laptop.

```elixir
ForgeSdk.get_account_state(address: w1.address)
```

 🎉 🎉Congratulations! You have finished the Level 2 tutorial! Now you should have a general sense about how to create an asset and exchange assets with Forge SDK. Try and create more complicated assets!
