---
title: 'Forge 内参'
description: '详细讲述 Forge 的内部实现'
keywords: 'forge'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'forge'
---

## Forge 代码构成

Forge 代码由几个 repo 共同组成：

底层库：

- ex-abci：实现了 tendermint 的 ABCI spec。
- mcrypto：实现了对哈希算法，数字签名，和对称加密算法的封装。提供了 Hasher，Signer 和 Crypter 三个接口。

Forge 相关：

- forge-abi：Forge 的核心数据结构的定义（protobuf），该 repo 被 forge-sdk 和 forge 本身使用。
- forge-pipe：类似 elixir plug 的 pipeline 组织结构，核心代码来自 [plug builder](https://github.com/elixir-plug/plug/blob/master/lib/plug/builder.ex).
- forge-tx：Forge tx pipelien 的 compiler，以及公共 pipe 的实现。
- forge-elixir-sdk：elixir 版本的 SDK。
- forge-event：处理事件订阅的主要代码，实现在 GRPC 层面的事件订阅（主要用在 tx 处理完之后的事件通知，具体的事件定义见 forge-abi，当我们添加新的 tx 时，需要在添加新的 event）。
- forge-core-protocols：包含所有的Forge 核心 tx。注意添加新的 tx 后，需要 `make build-web` 来确保新的 tx 被 forge-web 使用。
- forge：forge 核心代码。

Forge 工具集：

- forge-web：提供给外部访问者的 Forge GraphQL API，类似于 ethereum 的 JSON API。
- forge-simulator：生成大量随机 forge tx 测试 forge 的工具（目前版本尚不支持 token swap 和 atomic swap 相关的 tx）。
- forge-workshop：DID workshop 工具。
- forge-swap：Atomic swap 相关的服务端逻辑和 API。
- forge-patron：forge solution test 工具（目前版本尚不支持 token swap 和 atomic swap 相关的 tx）。

## Forge 和 Tendermint 的关系

在 forge release 配置中，tendermint 的 RPC 运行在 28222 端口，p2p 运行在 26656 端口。tendermint 的 28222 端口并不对外暴露，仅仅由 Forge server 访问。Forge 和 tendermint 保持三个逻辑上的通道：

- TSP（Tendermint Socket Protocol）：Forge 与 tendermint 在 TSP 端口建立 TCP 长连接，提供 ABCI 支持。其中：一个 TCP 连接串行处理 begin_block，deliver_tx，end_block，commit_block 等和 consensus 相关的消息，另外有一个连接池处理 mempool 相关的消息（主要是 check_tx）。
- tendermint RPC：Forge 与 tendermint 建立若干个（可配置的连接池）http/2 长连接，提供 tendermint RPC 的封装（https://docs.tendermint.com/master/rpc/#/）。其中，主要处理的 RPC 是发送 tx（`/broadcast_tx_async`）。
- tendermint GRPC：Forge 与 tendermint 建立 GRPC 的长连接，提供 tendermint GRPC 封装。目前 tendermint 只提供了 `/broadcast_tx_commit` 的 GRPC 版本。所以当我们使用 `commit: true` 发送 tx 时，使用的是这个连接。注意：该接口返回时间取决于出块时间，建议只在 unit test / integration test 中使用。开发 dApps 除非必要，不要使用该接口。

在 forge 启动时，会同时启动 tendermint。Forge 接管了 tendermint 的配置，每次启动时会根据自己的配置重新生成 tendermint 的配置，因而手工改动 tendermint 配置无法生效。Forge 使用 `erlexec` 监控 tendermint daemon，如果非正常退出，根据退出时的 exit code 会重启 tendermint 或者把 forge crash 掉。

