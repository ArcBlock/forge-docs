---
title: 'forge manager app 的实现'
description: '详细讲述 forge manager app 的内部实现'
keywords: 'manager'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'manager'
---

处理 forge manager 的 app。manager 用来监控 daemon 和 configuration 的变化，然后采取相应的措施。因为 Forge 里集成了 tendermint 和 ipfs（后遭废弃），以后可能还有更多的 daemon，因此需要有一个专门的类似 supervisor 的角色来监控这些 daemon 和他们的 configuration。这个 supervisor，我们管它叫 forge manager。

forge manager 定义了两个 protocol：Adapter 和 Watchlist。Adapter 定义了控制一个 daemon 的接口：

```elixir
defprotocol Manager.Adapter do
  @moduledoc """
  Manager protocol
  """

  @type t :: Manager.Adapter.t()

  @doc """
  Start a new manager
  """
  @spec start(t(), map()) :: map() | {:error, term()}
  def start(manager, config)

  @doc """
  Restart the resource
  """
  @spec restart(t(), atom()) :: map() | {:error, term()}
  def restart(manager, name)

  @doc """
  If restart the resource.
  """
  @spec if_restart(t(), atom()) :: {boolean(), term()}
  def if_restart(manager, name)

  @doc """
  Stop the resource
  """
  @spec stop(t(), atom()) :: map() | {:error, term()}
  def stop(manager, name)

  @doc """
  Retrieve a resource by name
  """
  @spec get(t(), atom()) :: map() | {:error, term()}
  def get(manager, name)

  @doc """
  Find a resource by attribute
  """
  @spec find_by_key(t(), atom() | String.t(), any()) :: map() | {:error, term()}
  def find_by_key(manager, key, value)

  @doc """
  Recover the dead resource
  """
  @spec recover(t()) :: map() | {:error, term()}
  def recover(manager)
end
```

Watchlist 定义了要监控的文件的列表：

```elixir
defprotocol Manager.Watchlist do
  @moduledoc """
  Watchlist protocol
  """

  @type t :: Manager.Watchlist.t()

  @doc """
  Get the file list to be watched
  """
  @spec watchlist(t()) :: Keyword.t()
  def watchlist(engine)
end
```

对于 daemon 的监控，我们使用了 [erlexec](https://github.com/saleyn/erlexec)，它可以把一个 erlang process 和一个 daemon link 起来，这样，当 daemon crash 时， process 可以收到通知。在 Forge 里，我们随时都需要知道 consensus engine 等这些外部资源的状态；一旦发生 crash，需要根据不同的返回值决定是否重启。


