---
title: 'forge storage app 的实现'
description: '详细讲述 forge storage app 的内部实现'
keywords: 'storage'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'storage'
---

处理 forge storage 的 app。和 consensus engine 类似，定义了两个接口：

```elixir
defprotocol Storage.Engine do
  @moduledoc """
  Storage engine protocol
  """
  @type t :: Storage.Engine.t()

  @dialyzer {:nowarn_function, __protocol__: 1}

  @doc """
  Initialize a storage engine. It should generate everything to run the storage engine.
  """
  @spec init(t(), map()) :: map() | {:error, term()}
  def init(engine, config)

  @doc """
  Generate the configuration
  """
  @spec gen_config(t(), map()) :: map() | {:error, term()}
  def gen_config(engine, config)

  @doc """
  Generate the node key
  """
  @spec gen_key(t()) :: map() | {:error, term()}
  def gen_key(engine)

  @doc """
  Start the storage engine
  """
  @spec start(t()) :: map() | {:error, term()}
  def start(engine)

  @doc """
  Restart the storage engine
  """
  @spec restart(t()) :: map() | {:error, term()}
  def restart(engine)

  @doc """
  Stop the storage engine
  """
  @spec stop(t()) :: map() | {:error, term()}
  def stop(engine)
end
```

以及 Rpc：

```elixir
defprotocol Storage.Rpc do
  @moduledoc """
  Storage RPC protocol
  """
  @type t :: Storage.Rpc.t()

  @doc """
  Save a file into the storage
  """
  @spec store(t(), binary()) :: {:ok, String.t()} | {:error, String.t()}
  def store(engine, data)

  @doc """
  Save a file stream into the storage
  """
  @spec store_stream(t(), Enumerable.t()) :: {:ok, String.t()} | {:error, String.t()}
  def store_stream(engine, data_stream)

  @doc """
  Load a file from the storage
  """
  @spec load(t(), String.t()) :: {:ok, binary()} | {:error, String.t()}
  def load(engine, hash)

  @doc """
  Load a file stream from the storage
  """
  @spec load_stream(t(), String.t()) :: {:ok, Enumerable.t()} | {:error, String.t()}
  def load_stream(engine, hash)

  @doc """
  Pin a file into the storage
  """
  @spec pin(t(), String.t()) :: :ok | {:error, any()}
  def pin(engine, hash)
end
```

不过，storage engine 并未在 forge 里面启用。
