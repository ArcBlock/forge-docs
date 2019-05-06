# Acquire Asset Transaction

**Acquire Asset** is used to buy/get an asset from the given [asset factory](../create_asset_factory).

Note `AssetFactory` and `AcquireAssetTx` are currently in **BETA**, its interface is subjected to change (aggressively).

## Protocol definition

To acquire an asset you shall use `AcquireAssetTx` message:

```proto
message AssetSpec {
  string address = 1;
  string data = 2;
}

message AcquireAssetTx {
  string to = 1;
  repeated AssetSpec specs = 2;

  google.protobuf.Any data = 15;
}

```

We call the args provided to asset factory template **asset spec**. An asset spec contains an address and data:

* address: address is the address of the generated asset. The sender shall apply the spec to the template to generate a structure of the asset, and then generate the CreateAssetTx, and then calculate the address. SDK could help to alleviate the process. By introducing the address here we ensure that one spec could only be applied once to the asset factory. For example, if ticket with row 10 and seat 2 has been generated, you cannot acquire it again.
* data: data is a json string that contains args for the asset factory template.

In many cases, the buyer may buy multiple assets in one transaction. For example, you'd buy two movie tickets once - if this request cannot be fulfilled, you would rather not buying it or switch to another show of the movie. Thus in the `AcquireAssetTx` we allow repeated specs, so that multiple assets could be acquired either all fulfilled or all failed.


Here's an example of acquiring an asset:

```elixir
# code to create asset factory
w = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "theater"), wallet: w)
w1 = ForgeSdk.create_wallet()
ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "tyr"), wallet: w)

# Note application shall already registered `Ticket` into Forge via `deploy_protocol`.
factory = %{
  description: "movie ticket factory",
  limit: 5,
  price: ForgeAbi.token_to_unit(1),
  template: ~s({
      "row": "{{ row }}",
      "seat": "{{ seat }}",
      "time": "11:00am 04/30/2019",
      "room": "4"
    }),
  allowed_spec_args: ["row", "seat"],
  asset_name: "Ticket",
  attributes: %ForgeAbi.AssetAttributes{
    transferrable: true,
    ttl: 3600 * 3
  }
}

ForgeSdk.create_asset_factory("Avenerages: Endgame", factory, wallet: w)


# code to acquire asset
specs =
  Enum.map(["0", "2"], fn seat ->
    apply(ForgeAbi.AssetSpec, :new, [%{data: ~s({"row": "15", "seat": "#{seat}"})}])
  end)

itx = ForgeAbi.AcquireAssetTx.new(to: address, specs: specs)

ForgeSdk.acquire_asset(itx, wallet: w1)
```
