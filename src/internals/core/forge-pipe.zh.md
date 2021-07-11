---
title: 'forge-pipe：Forge TX pipeline 的实现基础'
description: '详细讲述 forge-pipe 的内部实现'
keywords: 'pipeline'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'pipeline'
---

Forge TX 处理的流程和 elixir 的 Plug 非常类似。在定义 pipeline 的处理流程时采用 declarative language（Plug 使用 elixir，Forge 使用 yaml），整个 pipeline 的执行从上到下依次执行，只要中间任何一个环节不返回 `:ok`，pipeline 就终止，tx 处理失败；否则，tx 处理成功。

## 数据结构

### ForgePipe.Info

处理 tx pipeline 的核心结构，类似 Plug.Conn。

- `app_hash`：在处理这个 tx 时候当前的 app_hash。处理完成 tx 之后 app_hash 会变化。
- `last_block`: 处理这个 tx 之前的 block height。
- `tx`: 待处理的 tx（类型为：Transaction）
- `itx`: 待处理的 itx（类型为具体的 itx 类型，比如 TransferTx）
- `itx_data`: itx 内部的 data 域，已 decode。
- `receiver`: 接收者的地址。大部分情况下，这个地址是 `itx.to`，有些情况可能来自 multisig 中签名的地址，比如 `ConsumeAssetTx`。
- `sender_state`: 发送者地址。
- `receiver_state`: 接收者的 state。
- `context`: abci context。在 mempool check 阶段，context 为空（我们不能依赖 context 中的内容）；deliver tx 阶段，可以使用 context 中的内容。
- `db_handler`: 读写 state db 的 handler。
- `app_handler`: 读写 app 状态的 handler。deprecated
- `event_handler`: 处理 event 的 handler。
- `index_handler`: 处理 index db 的 handler。
- `stat_handler`: 处理 statistics 的 handler。
- `consensus_handler`: 处理和 tendermint 打交道的 handler。
- `consensus_engine`: consensus engine pid / name
- `storage_handler`: deprecated
- `storage_engine`: deprecated
- `blacklist_handler`: 处理黑名单的 handler。目前没有使用。
- `priv`: priv data。在处理 tx 的过程中，pipeline 可以往这里塞任何数据，供之后的 pipes 使用。
- `status`: 处理结果（StatusCode）
- `halted`: pipeline 是否停止。如果 halted 被置上，整个 pipeline 将停止。
- `data`: tx data（binary）。
- `forge_key`: forge state key
- `forge_state`: forge state
- `pipeline`: 当前处理的 pipeline 的名称，供 debug 使用。
- `tags`: response tag。已经 deprecated。
- `timestamps`: 计算 pipeline 执行时间的开始时间戳。
- `tx_config`: tx config
- `tx_size`: tx size
- `type_url`: type url
- `gas`: gas


## Pipeline 的实现

Forge 中所有的 tx 都以 pipeline 的形式组织。每个 pipe 都实现了 `Forge.Pipe` behavior：

```elixir
defmodule Forge.Pipe do
  @moduledoc """
  Pipe behavior
  """
  alias ForgePipe.Info
  @type opts :: binary | tuple | atom | integer | float | [opts] | %{opts => opts}

  @callback init(opts) :: opts
  @callback call(Info.t(), opts) :: Info.t()
end
```

所以执行的逻辑是：

```
   pipe1.init(opts)          pipe2.init(opts)             ...    pipeN.init(opts)
       |                         |                         |         |
-> pipe1.call(info, opts) -> pipe2.call(info, opts)       ... -> pipeN.call(info, opts)
```

info 一开始由 forge abci server 在处理 deliver_tx 消息时准备好，传递给 pipeline，之后整个过程不断地被更新，并且传递给下一个 pipe。中间只要有任何一个 pipe 返回不是 `:ok` 的 StatusCode，info 的 halted 会被置上，在 pipeline 循环处理过程 forge 中会终止整个 pipeline，并且返回当前的错误码。

因而，我们可以这样描述一个 tx 的 pipeline（选自 transfer 的 verify pipeline）：

```elixir
defmodule CoreTx.Transfer.Verify do
  @moduledoc(false)
  use ForgePipe.Builder

  pipe Forge.Pipe.VerifyMultisig, []

  pipe Forge.Pipe.ExtractState, from: [:tx, :from], status: :invalid_sender_state, to: [:sender_state]

  pipe Forge.Pipe.VerifyGasBalance, []

  pipe Forge.Pipe.ExtractReceiver, from: [[:itx, :to]]

  pipe Forge.Pipe.VerifyInfo, conditions: [%{error: :insufficient_data, expr: "info.itx.to !== \"\" and (info.itx.value !== nil or info.itx.assets !== [])"}, %{error: :invalid_tx, expr: "to_int(info.itx.value) != 0 or info.itx.assets !== []"}]

  pipe Forge.Pipe.VerifyItxSize, value: [[:itx, :assets]]

  pipe Forge.Pipe.VerifyBalance, state: :sender_state, value: [[:itx, :value]]

  pipe Forge.Pipe.VerifyReceiver, []

  pipe Forge.Pipe.ExtractState, from: :receiver, status: :invalid_receiver_state, to: :receiver_state

  pipe Forge.Pipe.AntiLandAttack, []

  pipe Forge.Pipe.ExtractState, from: [:itx, :assets], status: :invalid_asset, to: [:priv, :assets]

  pipe Forge.Pipe.VerifyTransferrable, assets: [:priv, :assets]

  pipe Forge.Pipe.VerifyOwner, assets: [:priv, :assets], state: :sender_state
end
```

它的处理过程可以理解为这样一个递归：

```elixir
def execute([], info), do: info
def execute([h|t] = pipeline, info, opts) do
  case info.halted do
    true -> info
    _ -> execute(t, h.call(info, opts))
  end
end
```

然而，为了简化开发者的开发过程，我们提供了 yaml 到 pipeline 的转化，用户只需要撰写如下的 yaml，就可以生成上述的代码：

```yaml
---
name: transfer
check:
  - pipe: verify_multisig
  - pipe: extract_state
    from: [:tx, :from]
    to: [:sender_state]
    status: :invalid_sender_state
  - pipe: verify_gas_balance
  - pipe: extract_receiver
    from: [[:itx, :to]]
  - pipe: verify_info
    conditions:
      - expr: 'info.itx.to !== "" and (info.itx.value !== nil or info.itx.assets !== [])'
        error: :insufficient_data
      - expr: 'to_int(info.itx.value) != 0 or info.itx.assets !== []'
        error: :invalid_tx
  - pipe: verify_itx_size
    value: [[:itx, :assets]]

verify:
  - pipe: verify_balance
    state: :sender_state
    value: [[:itx, :value]]
  - pipe: verify_receiver
  - pipe: extract_state
    from: :receiver
    to: :receiver_state
    status: :invalid_receiver_state
  - pipe: anti_land_attack
  - pipe: extract_state
    from: [:itx, :assets]
    to: [:priv, :assets]
    status: :invalid_asset
  - pipe: verify_transferrable
    assets: [:priv, :assets]
  - pipe: verify_owner
    assets: [:priv, :assets]
    state: :sender_state

update:
  - pipe: update_owner
    assets: [:priv, :assets]
    owner: :receiver_state
  - pipe: :custom
    name: update_tx
```

注意，yaml 看上去似乎更复杂一些，但它可以生成 check，verify 和 update 三条 pipeline，对应 tx 处理的三个阶段。因而，对用户来说，还是省下很多功夫，并且不容易出错。forge-pipe 中的 `parser.ex`， `builder.ex` 和 `pipeline_builder.ex` 就是做这种转换的。

## 注意事项

如果在 `ForgePipe.Info` 里面添加新的域，记得要在合适的地方将其初始化（比如：forge abci server 里）。如果尚未初始化就在后续的 pipeline 里使用，会导致 tx 出错。
