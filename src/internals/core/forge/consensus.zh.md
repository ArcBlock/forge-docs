---
title: 'forge consensus app 的实现'
description: '详细讲述 forge consensus app 的内部实现'
keywords: 'consensus'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'consensus'
---

处理 forge consensus 的 app。在实现 forge 之初，我们把 consensus 设计为一个单独的可插拔的组件。将来，如果我们自己实现了支持 ABCI 的 consensus engine，就可以把 tendermint 替换掉。因而，在 consensus app 里，我们定义了两套 protocol，来规范 consensus engine 的行为。其一，consensus engine 的基本接口，它涵盖了 consensus engine 如何启动和停止，如何生成配置等：

```elixir
defprotocol Consensus.Engine do
  @moduledoc """
  Consensus engine protocol
  """

  @type t :: Consensus.Engine.t()

  @dialyzer {:nowarn_function, __protocol__: 1}

  @doc """
  Initialize a consensus engine. It should generate everything to run the consensus engine.
  """
  @spec init(t(), map()) :: map() | {:error, term()}
  def init(engine, config)

  @doc """
  Generate the configuration
  """
  @spec gen_config(t(), map()) :: map() | {:error, term()}
  def gen_config(engine, config)

  @doc """
  Generate genesis file
  """
  @spec gen_genesis(t(), map()) :: map() | {:error, term()}
  def gen_genesis(engine, config)

  @doc """
  Generate the node key
  """
  @spec gen_key(t()) :: map() | {:error, term()}
  def gen_key(engine)

  @doc """
  Start the consensus engine
  """
  @spec start(t()) :: map() | {:error, term()}
  def start(engine)

  @doc """
  Stop the consensus engine
  """
  @spec stop(t()) :: map() | {:error, term()}
  def stop(engine)

  @doc """
  Restart the consensus engine
  """
  @spec restart(t()) :: map() | {:error, term()}
  def restart(engine)

  @doc """
  Start rpc server for the consensus engine
  """
  @spec start_rpc(t()) :: map() | {:error, term()}
  def start_rpc(engine)

  @doc """
  Stop rpc server for the consensus engine
  """
  @spec stop_rpc(map()) :: map() | {:error, term()}
  def stop_rpc(engine)
end
```

其二，consensus engine RPC 接口，涵盖了基本的 blockchain RPC 的接口：

```elixir
defprotocol Consensus.Rpc do
  @moduledoc """
  Consensus RPC protocol
  """

  @type t :: Consensus.Rpc.t()

  alias Consensus.Engine.Tendermint.KeyInfo
  alias ForgeAbi.{BlockInfo, PageInfo, PageInput, Transaction, TransactionInfo}

  @doc """
  Send out the signed transaction, wait until tx is committed.
  This will use grpc endpint `CoreGrpc.BroadcastAPI.Stub.broadcast_tx` for better performance.
  """
  @spec send_commit(t(), Transaction.t()) :: {:ok, map()} | {:error, term()}
  def send_commit(engine, tx)

  @doc """
  Send out the signed transaction. Just broadcast it.
  """
  @spec send_broadcast(t(), Transaction.t()) :: {:ok, map()} | {:error, term()}
  def send_broadcast(engine, tx)

  @doc """
  generate tx hash by tx.
  """
  @spec get_tx_hash(t(), Transaction.t() | binary()) :: String.t()
  def get_tx_hash(engine, tx)

  @doc """
  check if a tx or a tx hash exists
  """
  @spec tx_exists?(t(), Transaction.t() | String.t()) :: {:ok, boolean()} | {:error, term()}
  def tx_exists?(engine, tx)

  @doc """
  get node hash by pk.
  """
  @spec get_node_hash(t(), binary()) :: String.t()
  def get_node_hash(engine, pk)

  @doc """
  get node validator key information.
  """
  @spec get_validator_key_info(t()) :: KeyInfo.t() | nil
  def get_validator_key_info(engine)

  @doc """
  get node key information.
  """
  @spec get_node_key_info(t()) :: KeyInfo.t() | nil
  def get_node_key_info(engine)

  @doc """
  Generate a tendermint node id based on node pub key
  """
  @spec get_node_id(t(), binary()) :: String.t()
  def get_node_id(engine, pk)

  @doc """
  Retrieve a tx by hash.
  """
  @spec get_tx(t(), binary()) :: {:ok, TransactionInfo.t()} | {:error, term()}
  def get_tx(engine, hash)

  @doc """
  Query a transaction by key and value
  """
  @spec query_tx(t(), binary(), binary()) :: {:ok, [TransactionInfo.t()]} | {:error, term()}
  def query_tx(engine, key, value)

  @doc """
  Get the chain status of the consensus engine
  """
  @spec get_chain_status(t()) :: {:ok, map()} | {:error, term()}
  def get_chain_status(engine)

  @doc """
  Get the node status of the consensus engine
  """
  @spec get_node_status(t()) :: {:ok, map()} | {:error, term()}
  def get_node_status(engine)

  @doc """
  Get block data by its height
  """
  @spec get_block(t(), non_neg_integer()) :: {:ok, BlockInfo.t()} | {:error, term()}
  def get_block(engine, height)

  @doc """
  Get blocks data by min height and max height
  """
  @spec get_blocks(t(), non_neg_integer(), non_neg_integer(), PageInput.t() | nil, boolean()) ::
          {:ok, {[BlockInfo.t()], PageInfo.t()}} | {:error, term()}
  def get_blocks(engine, min_height, max_height, paging, mt_excl)

  @doc """
  Get unconfirmed txs by given `limit` which is a maximum number of entries (max: 100).
  """
  @spec get_unconfirmed_txs(t(), non_neg_integer()) :: {:ok, map()} | {:error, term()}
  def get_unconfirmed_txs(engine, limit)

  @doc """
  Get number of unconfirmed txs
  """
  @spec get_num_unconfirmed_txs(t()) :: {:ok, non_neg_integer()} | {:error, term()}
  def get_num_unconfirmed_txs(engine)

  @doc """
  Get the network inforamtion
  """
  @spec get_net_info(t()) :: {:ok, map()} | {:error, term()}
  def get_net_info(engine)

  @doc """
  Get the validators inforamtion
  """
  @spec get_validators_info(t()) :: {:ok, map()} | {:error, term()}
  def get_validators_info(engine)

  @doc """
  Get the genesis inforamtion
  """
  @spec get_genesis_info(t()) :: {:ok, map()} | {:error, term()}
  def get_genesis_info(engine)
end
```

在这两个 protocol 的基础上，我们实现了对 tendermint 接口的封装。

此外，为了提高 tendermint RPC 的效率，我们提供了一个 RPC 的连接池，用来高效访问 tendermint RPC；连接池里的任何连接掉线，都会重新连接。
