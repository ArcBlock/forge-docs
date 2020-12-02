---
title: '如何写一个智能合约'
description: ''
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'txs'
  - 'exchange'
---

## 如何写交易协议

如需写交易协议，您需要准备以下文件：

- config.yml 或 config.json：配置此交易协议。由`forge-compiler`使用，了解协议中需汇编哪些文件以及包含哪些元数据。

- 一个proto文件（可选）：您交易协议的 protobuf 定义。必须在 config.yml 中引用。

- 一个pipeline文件（可选）：您交易协议的交易管道必须在 config.yml 中引用。

- 一系列源代码：交易协议的逻辑。

写了新的 tx 协议后，您可以直接通过`forge-compiler`进行汇编：

```bash
$ forge-compiler config.yml
```

或将其加入`Makefile`，则`make build-protocols`会为您处理。

汇编的结果是 based64 encoded (padding: false)部署协议 itx。对于您的本地节点，您可以使用管理员的钱包将其发送至链。

### config.yml

以下为 config.yml 的示例：

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

type_urls 是您在 ForgeAbi 注册的类型 url 的地图（密钥是 type_url，值为模块名称。在此提到的 type_urls 将被`ForgeAbi.encode_any` / `ForgeAbi.decode_any`使用。

版本必须单调递增。Forge 会拒绝在旧版本安装 tx 协议。

### 协议源代码

通常，如果您的协议不太复杂，您只需要单一文件。文件结构如下：

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

如果您的代码逻辑过于复杂，无法放入一个文件，您可以使用多个源文件，只需记得在 config.yml 中引用它们即可。

## 协议改进指南

Protobuf 消息模型确保如果我们遵守特定规则，便可以通过向后兼容的改变改进消息。这些规则是：

- 现有字段不应重新编号。如果您已使用了`string name = 1`，之后便不得进行`string name = 2`。

- 现有字段类型不得改变。您不能将`BigSint value = 2`改为`BigUint value = 2`。例外：

1. 一般字段可被升级为"之一"

2. 一般字段可被升级为重复字段。

- 新字段不得重复使用任何之前分配的字段编号。

- 默认枚举的选择应在未来有意义，或应被设置为未指定。
