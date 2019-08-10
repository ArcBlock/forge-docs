---
title: "Forge CLI"
description: "Forge CLI"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "tools"
  - "forge_cli"
---

Forge CLI 是一个命令线工具，使您与 forge 的互动更为容易。

## 安装 Forge CLI

如安装章节所述，安装 Forge CLI 非常简单：

```bash
$ npm install -g @arcblock/forge-cli
```

对于中国用户，推荐使用：

```bash
$ npm install -g @arcblock/forge-cli --registry=https://registry.npm.taobao.org
```

然后，您可以运行`forge`，看看它支持什么：

```bash
$ forge

Usage: forge [options] [command]

Options:
  -v, --verbose                 Output runtime logs when execute the command, used for debug
  -r, --release-dir             Forge release directory path (unzipped), use your own copy forge release
  -c, --config-path             Forge config used when starting forge node and initializing gRPC clients
  -g, --socket-grpc             Socket gRPC endpoint to connect, with this you can use forge-cli with a remote node
  -h, --help                    output usage information

Commands:
  account:create                Interactively create an account, guarded by a passphrase
  account:delete <address>      Delete an account by address
  account <address>             Get an account info by address
  account:list [role]           List all accounts stored in this node, role=[all], default role is all
  asset <address>               Get asset info by address
  block [options] [height]      Get the block info from the running node
  help <subcommand>             Show help of a sub command
  version                       Output version for all components, including forge-cli, forge, storage and consensus engine
  config [options]              Read and display forge config
  declare:node                  Declare the current node to be a validator candidate
  init [options] [version]      Download and setup forge release on this machine
  join <endpoint>               Join a network by providing an forge web graphql endpoint to fetch config
  logs|log [type]               Show logs for various forge components
  ps                            List application status for forge (includes tendermint and ipfs)
  reset                         Reset current chain state, run with caution
  restart [app]                 Restart the forge managed applications: core/app/tendermint/ipfs
  simulate|simulator [action]   Start/stop simulator and generate some random data
  start                         Start forge as a daemon in the background
  state|status [type]           List the information of the chain and the node, chain|core|net|validator|web
  stop                          Stop the forge daemon (forge-core, forge-app, consensus engine, storage engine)
  web [options] [action]        Start or stop the web UI of running forge node
  download [options] [version]  Download a forge release without activate it
  list|ls                       List forge releases installed locally
  use [version]                 Active an already downloaded forge release
  tx [hash]                     Get a tx detail and display
  tx:list                       List latest transactions
  checkin|poke                  Send a poke tx to the network to get tokens for test
  tx:send                       Send a signed tx to the network
  tx:sign                       Sign a transaction (base64) according to sender’s wallet
  stake [options] [show]        Stake to various entities: node/user/asset
  unstake                       Revert stakes to various entities

Examples:

  Be sure to initialize before running any other commands
  > forge init

  Curious about how to use a subcommand?
  > forge help block
```

对于所有 Forge CLI 子命令，您可以通过`forge help command`访问在线文件，如下：

```bash
$ forge help init
Usage: init [options] [version]

Download and setup forge release on this machine

Options:
  -m, --mirror <url>  Mirror host used to download forge release
  -h, --help          output usage information

Examples:
  - forge init             download and activate latest version
  - forge init 0.22.0      download and activate forge v0.22.0
  - forge init --mirror http://arcblock.oss-cn-beijing.aliyuncs.com      specify a custom mirror for download
```

因为在此列出的大部分命令都在安装和简介章节谈到了，所以我们只对最常用的命令进行简短介绍。

## 初始化 forge 发布

`forge init`是您使用的第一个命令——它会下载最新的 forge 构建至您的`~/.forge_cli`，然后您便可以启动 forge 支持的单节点区块链。

## 启动/停止链节点

`forge start`启动节点，其配置在`~/.forge_cli/forge_release.toml`进行了说明。成功运行节点后，您可以在`http://localhost:8210`打开 forge 网页（如果您没有更改 forge_release.toml 中的端口）并在那里进行更多操作。

```bash
$ forge start
✔ Forge daemon successfully started
┌───────────────┬──────────┬───────────────┬───────────────┬────────────────────┐
│ Name          │ PID      │ Uptime        │ Memory        │ CPU                │
├───────────────┼──────────┼───────────────┼───────────────┼────────────────────┤
│ starter       │ 22884    │ 7s            │ 66.3 MB       │ 18.57 %            │
│ forge         │ 23066    │ 6s            │ 482 MB        │ 67.83 %            │
│ ipfs          │ 23240    │ 4s            │ 18.9 MB       │ 2.00 %             │
│ tendermint n… │ 23245    │ 4s            │ 37.1 MB       │ 3.50 %             │
└───────────────┴──────────┴───────────────┴───────────────┴────────────────────┘

ℹ If you want to access interactive console, please run /Users/wangshijun/.forge_cli/release/forge/0.25.3/bin/forge remote_console
ℹ If you want to access forge web interface, please run forge web open
ℹ If you want to show above process list, please run forge ps
ℹ If you want to know forge status detail, please run forge status
```

如果您想停节点，可以运行`forge stop`。

```bash
❯ forge stop
✔ Sending kill signal to forge daemon...
✔ Forge daemon stopped!
```

## 运行/停止模拟器

`forge simulator start` / `forge simulator stop`可被用于启动/停止模拟器。模拟器为节点生成流量，使您简单地测试链。

## 查看日志

forge 架构的不同成分生成了几个日志文件，运行`forge logs`以查看所有文件或运行`forge help logs`以查看单独的日志文件。

## 高级使用

Forge CLI 提供许多命令以管理 forge 支持的链节点和 forge 发布。请关注我们，我们即将发布“成为 Forge CLI 的超级用户”。

## 报告问题或漏洞

如果有问题或请求，请随时通过[github repo](https://github.com/ArcBlock/forge-js/issues)联系我们

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjM5NzUwODk2LDk3NTI1NTI5LDE3Nzg2Mz
AzNDVdfQ==
-->
