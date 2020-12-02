---
title: 'How to Write A Smart Contract'
description: ''
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'txs'
  - 'exchange'
---

## How to write a transaction protocol

To write a new transaction protocol you basically need to prepare the following files:

- config.yml or config.json: configuration for this transaction protocol. Used by `forge-compiler` to know which files to compile and what metadata to include in the protocol.
- a proto file (optional): the protobuf definition for your transaction protocol. Must be referenced in config.yml.
- a pipeline file (optional): the transaction pipeline for your transaction protocol. Must be referenced in config.yml.
- a set of source code: the logic of the transaction protocol.
  Once you write a new tx protocol, you can either compile it directly with `forge-compiler`:

```bash
$ forge-compiler config.yml
```

or add it into `Makefile` so that `make build-protocols` will take care it for you.
The compiled result is a url based64 encoded (padding: false) deploy protocol itx. For your local node, you can use a moderator's wallet to send it to the chain.

### config.yml

An example of config.yml looks like this:

```yml
name: consume_asset
version: 0
namespace: CoreTx
description: Consume an asset that is owned by self
type_urls:
  fg:t:consume_asset: ForgeAbi.ConsumeAssetTx
proto: protocol.proto
pipeline: protocol.yml
sources:
  - protocol.ex
```

type_urls are a map of type urls (key is the type_url and value is the module name) that you'd register to ForgeAbi. The type_urls mentioned here will be used by `ForgeAbi.encode_any` / `ForgeAbi.decode_any`.
version must be monotonically increasing. Forge will refuse to install a tx protocol with an old version.

### protocol source code

Normally you just need a single file if your protocol is not too complex. The file structure looks like this:

```elixir
defmodule CoreTx.ProtocolName do
  # RPC helper function for sdk to use
  defmodule Rpc do
    import ForgeSdk.Tx.Builder, only: [tx: 1]
    tx :protocol_name
  end
  # customized pipe for Check pipeline
  defmodule CheckTx do
    use ForgePipe.Builder
    def init(opts), do: opts
    def call(info, _opts) do
      info
    end
  end
  # customized pipe for Verify pipeline
  defmodule CheckTx do
    use ForgePipe.Builder
    def init(opts), do: opts
    def call(info, _opts) do
      info
    end
  end
  # customized pipe for Update pipeline
  defmodule UpdateTx do
    use ForgePipe.Builder
    def init(opts), do: opts
    def call(info, _opts) do
      info
    end
  end
end
```

If your code logic is too complex to put into one file, you can use multiple source files, just remember to reference them into the config.yml.

## Guide on protocol upgrade

Protobuf message model ensures that if we're following certain rules, we can upgrade the message with backward-compatible changes. These rules are:

- Existing fields should not be renumbered. If you have already used `string name = 1` you can not do `string name = 2` later on.
- Existing fields should not have their types changed. You can't change `BigSint value = 2` to `BigUint value = 2`. Exceptions:
  1. regular field can be upgraded to an oneof
  2. a regular field can be upgraded to a repeated field.
- New fields should not reuse any previously assigned field number.
- Enum defaults should be picked such that they make sense looking forward, or be set to UNSPECIFIED.
