---
title: 'forge config app 的实现'
description: '详细讲述 forge config app 的内部实现'
keywords: 'config'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'config'
---

处理 forge config 的 app。定义了一个 protocol：

```elixir
defprotocol Forge.Config do
  @doc """
  Parse configuration (mainly expand the path and normalize things)
  """
  @spec parse(map(), map()) :: map()
  def parse(parser, config)
end
```

用来 parse 从 forge.toml 里读取出来的内容。toml 文件里的每个 table 都有一个 parser：

- cache：解析 cache 配置
- forge_app：解析 forge-app 配置
- forge：解析 forge 相关的配置
- ipfs：目前已废弃
- tendermint：解析 tendermint 相关的配置
