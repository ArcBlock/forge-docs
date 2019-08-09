---
title: 'Create Asset Factory Transaction'
description: 'Create Asset Factory Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'asset'
  - 'create_asset_factory'
---

**Create Asset Factory** is used to solve a general problem, here's the original proposal:

> From event chain (and future certificate app or the use cases like movie tickets, lecture tickets) we found a common requirement that when the issuer creates an asset, they normally want to create a factory that can further create actual asset based on a template, then when someone wants to buy this asset, it just generates the actual asset and transfers it to the buyer.

> So we can have a create_asset_factory protocol and the factory will generate an asset state with given address.

> When a user uses transfer tokens to this address, it will then generate the asset based on the asset factory and put its owner as the user's address, then it will move the tokens from user's account to the asset factory's issuer's account.

You could think asset factory is like a vending machine, you pay the requirement tokens and the asset will be generated and given to you.

Note create asset factory tx is currently in **BETA**, its interface is subjected to change (aggressively).

## Protocol definition

To create an asset factory you shall use `CreateAssetTx` message with `AssetFactory` as its data (yeah we're reusing CreateAssetTx without reinvent the wheels):

```proto
message AssetAttributes {
  bool transferrable = 1;
  uint32 ttl = 2;
}

message AssetFactory {
  string description = 1;
  uint32 limit = 2;
  BigUint price = 3;
  string template = 4;
  repeated string allowed_spec_args = 5;
  string asset_name = 6;

  AssetAttributes attributes = 7;
}

message CreateAssetTx {
  string moniker = 1;
  google.protobuf.Any data = 2;
  bool readonly = 3;
  bool transferrable = 4;
  uint32 ttl = 5;
  string parent = 6;
  string address = 7;
}
```

If you look back on the protocol definition of the [create asset tx](create_asset.md), you would find out that fields in `AssetFactory` are designed to be able to generate a `CreateAssetTx` internally. That's the purpose of the template, allowed_spec_args, asset_name and attributes:

- template: the template that asset factory will use to generate the asset, template is string that could be processed by EEx with the given args, and its output is json. Then the json will be parsed and converted against the asset_name. e.g. If your asset name is `Ticket`,e.g. the the generated json data will be converted with `ForgeAbi.Ticket.new(json)`.
- allowed_spec_args: allowed args for the template. In transfer tx, user can transfer tokens to this AssetFactory address with a json string containing necessary args, once the json is parsed, it will be checked against this, if any field not in the list, the transfer tx will fail.
- asset_name: the protobuf message name for the asset. Note that this message shall be registered to forge.
- attributes: asset attributes will be copied to generated asset. Note assets generated from asset factory is read only.

Let's take a movie ticket as an example. Say you want to generate tickets with these information:

- time: date & time of the movie.
- name: name of the movie.
- room: which room the ticket could be used in.
- row: which row the ticket belongs to.
- seat: which seat number the ticket belongs to.

You could create a factory with all these as variable, or fix name, time and room as constant per factory. Let's say you want to create one factory for one show in one room like this:

```js
template = {
  row: '{{ row }}',
  seat: '{{ seat }}',
  room: '5C',
  time: '11:00am 04/30/2019',
  name: 'Avengers: Endgame',
};
```

Then you can create a factory like this (room 5C has 200 seats):

```js
factory = {
  description: 'Movie ticket factory',
  limit: 200,
  price: 10,
  template: template,
  allowed_spec_args: ['row', 'seat'],
  asset_name: 'Ticket',
  attributes: {
    transferrable: true,
    // ticket is valid in 3 hours after consumption
    ttl: 3600 * 3,
  },
};
```

The asset_name `Ticket` represents this message:

```proto
message Ticket {
  string row = 1;
  string seat = 2;
  string room = 3;
  string time = 4;
  string name = 5;
}
```

and when a user tries to acquire an asset, a new Ticket instance will be created by applying user provided args to the template in the factory. And then a `CreateAssetTx` is generated internally (no footprint in receipt db, just generated for validation and create the actual asset state).

Now let's see the example code for the whole process of the asset factory:

```elixir
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
```

To acquire an asset from the asset factory, please see [Acquire Asset](./acquire_asset.md).

[1] the link might not be accessible because we haven't open sourced forge.
