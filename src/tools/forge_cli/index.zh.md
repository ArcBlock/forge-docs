---
title: Forge CLI 概览
description: Forge CLI 概览
keywords: 'forge, forge-cli'
author: polunzh
category: handbook
layout: documentation
tags:
  - forge
---

## 安装 Forge CLI

`Forge CLI` 的安装非常简单，只需要一条命令：

``` sh
npm install -g @arcblock/forge-cli
```

> 如果是在中国大陆，推荐使用淘宝的 NPM 镜像来安装：
>
> ``` sh
> npm install -g @arcblock/forge-cli --registry=https://registry.npm.taobao.org
> ```

安装完成后，可以使用 `forge -h` 命令来查看 `Forge CLI` 提供的命令列表：

``` sh
$ forge -h
Usage: forge [options] [command]

Options:
  -V, --version                       Output the version number
  -v, --verbose                       Output runtime info when execute subcommand, useful for debug
  -c, --chain-name <chainName>        Execute command use specific chain
  -i, --config-path <path>            Forge config used when starting forge node and initializing gRPC clients
  -r, --npm-registry <registry>       Specify a custom npm registry
  -y, --yes                           Assume that the answer to any confirmation question is yes
  -d, --defaults                      Run command using default values for all questions
  -m, --mirror <url>                  Mirror host used to download forge release
  -g, --socket-grpc <endpoint>        Socket gRPC endpoint to connect, with this you can use forge-cli with a remote node
  -h, --help                          Output usage information

Commands:
  account <address>                   Get an account info by address
  asset <address>                     Get asset info by address
  block [options] [height]            Get the block info from the running node
  blocklet:init                       Init a blocklet project
  blocklet:use [options]              Download and install a blocklet
  chain:config [options] [action]     Read/write chain/node config
  chain:create [chainName]            Create a new chain instance
  chain:ls                            List all chains
  chain:remove <chainName>            Remove chain state and config
  chain:reset <chainName>             Reset chain state, but keeps the config
  config [options] [key] [value]      Config forge cli configs
  contract:activate [name|address]    Activate a contract by name or address
  contract:compile [sourceDir]        Compile a forge contract
  contract:create [options]           Create contract files
  contract:deactivate [name|address]  Deactivate a contract
  contract:deploy [itxPath]           Deploy a compiled contract to ABT Node
  contract:ls                         List contracts
  declare:node                        Declare the current node to be a validator candidate
  download [options] [version]        Download a forge release without activate it
  help [subcommand]                   Show help of a sub command
  install [options] [version]         Download and setup forge release on this machine
  join <endpoint>                     Join a network by providing a valid forge web graphql endpoint
  logs [type]                         Show logs for various forge components
  ls                                  List forge releases installed locally
  ls:remote                           List remote forge releases available for install
  prepare [options]                   Prepare node for deploying a multi-node chain
  ps                                  List running forge component processes
  remote [shellName]                  Connects to the running system via a remote shell
  simulator [action]                  Start/stop simulator and generate random traffic
  start [options] [<chainName>]       Start the forge and forge web deamon
  status [type]                       List info of the running chain/node
  stop [options] [<chainName>]        Stop the forge daemon and all related services
  tx [hash]                           Get a tx detail and display
  tx:ls                               List latest transactions
  upgrade [<chainName>]               Upgrade chain node to new version without reset
  use [version]                       Activate an already downloaded forge release
  version [<chainName>]               Output version for all forge components
  wallet:create                       Create a local wallet and dump its public/private key
  web [options] [action]              Start/stop the web interface of running forge chain/node
  workshop [action]                   Start/stop the dApps workshop

Examples:

  Please install a forge-release before running any other commands
  > forge install latest
  > forge install --mirror https://releases.arcblockio.cn

  Curious about how to use a subcommand?
  > forge help install
```

可以使用 `forge help [command]` 命令获取子命令更详细的帮助文档，比如：

``` sh
$ forge help install
Usage: install [options] [version]

Download and setup forge release on this machine

Options:
  -f, --force  Clean local downloaded assets before install
  -h, --help   output usage information

Examples:
  - forge install             Download and activate latest version, prompt to customize config
  - forge install 0.32.0      Download and activate forge v0.32.0
  - forge install v0.32.0     Download and activate forge v0.32.0
  - forge install --mirror https://releases.arcblockio.cn      Install latest forge from custom mirror
```

在本章中我们将只展示最常用的几条命令，关于 CLI 更详细的使用帮助您可以查看 [Forge CLI 手册](https://forge-cli.netlify.com/)。

## 获取最新的 Forge 安装包

`forge install` 将是您使用的第一条命令(除了 `forge -h`)，该命令将会把适合您当前操作系统最新版本的 `Forge` 安装包下载到 `~/.forge_cli/releases`目录中。下载完成后，您就可以使用 `forge` 来创建一条`单节点链`了。

> 当然，您也可以使用 `forge install [version]` 命令来下载您需要的 Forge 版本；
> 另外，您也可以使用 `forge ls:remote` 命令查看我们当前发布过的所有 Forge 版本。

## 创建链

为了方便开发者调试、测试，最新版本的 `Forge CLI` 支持在开发环境下创建/启动多条链，所以使用 `Forge CLI` 创建链的时候需要指定链的名称：

``` sh
$ forge chain:create moon
ℹ Working on moon chain
✔ chain name: moon
? Please input block time (in seconds): 5
? Do you want to customize token config for this chain? Yes
? What's the token name? ArcBlock
? What's the token symbol? ABT
? What's the token icon? /Users/zhenqiang/.forge_cli/tmp/token.png
? Whats the token description? Forge token ABT
? Please input token total supply: 7500000000
? Please input token initial supply: 7500000000
? Please input token decimal: 18
? Do you want to enable "feel lucky" (poke) feature for this chain? Yes
? Do you want to customize "feel lucky" (poke) config for this chain? Yes
? How much token to give on a successful poke? 25
? How much token can be poked daily? 250000
? How much token can be poked in total? 365000000
? Set moderator as token owner of (7135000000 ABT) on chain start? Yes
Config Preview:
...
```

> 当然，我们假定您了解这些参数都是什么含义。

如果觉得对于本地开发来说，这样创建一条链太麻烦，您也可以使用 `forge chain:create [chainName] -d` 来创建，使用`-d | --defaults` 参数会创建一条使用 `Forge CLI` 指定的默认值的链：

``` sh
$ forge chain:create moon -d
ℹ Working on moon chain
✔ chain name: moon
Config Preview:
...
```

## 启动 / 停止链节点

同样的，在启动 / 停止链节点的时候也需要指定链的名称（除非您本地只有一条链）：

启动：

``` sh
$ forge start moon
ℹ Working on moon chain
✔ Chain moon successfully started
✔ Forge web successfully started
ℹ forge web running at:     http://localhost:8210
ℹ graphql endpoint at:      http://localhost:8210/api

 Chain: moon v0.40.0
┌───────────────┬──────────┬──────────┬──────────┬──────────┬──────────────────────────────┐
│ Name          │ PID      │ Uptime   │ Memory   │ CPU      │ Endpoint                     │
├───────────────┼──────────┼──────────┼──────────┼──────────┼──────────────────────────────┤
│ web           │ 90698    │ 1s       │ 146 MB   │ 266.00 % │ http://127.0.0.1:8210/api    │
├───────────────┼──────────┼──────────┼──────────┼──────────┼──────────────────────────────┤
│ forge         │ 90572    │ 9s       │ 127 MB   │ 66.56 %  │ tcp://127.0.0.1:28210        │
├───────────────┼──────────┼──────────┼──────────┼──────────┼──────────────────────────────┤
│ tendermint    │ 90595    │ 8s       │ 28.3 MB  │ 2.63 %   │ -                            │
└───────────────┴──────────┴──────────┴──────────┴──────────┴──────────────────────────────┘

ℹ For interactive console, please run forge remote -c moon
ℹ For forge web interface, please run forge web open -c moon
ℹ For above process list, please run forge ps
ℹ If you want to know forge status detail, please run forge status -c moon

```

如果顺利的话，这个时候您就可以打开浏览器，访问 `http://127.0.0.1:8210` 来查看区块浏览器了。

停止：

``` sh
$ forge stop moon
ℹ Working on moon chain
ℹ Stopping moon chain...
✔ Chain moon stopped!
```

## 更多

`Forge CLI` 还提供了其它重要的功能，比如：

- 链的升级，[详情](https://forge-cli.netlify.com/zh/handbook/2-manage-chain-node/upgrade-chain)
- 钱包的使用，[详情](https://forge-cli.netlify.com/zh/handbook/5-manipulate-wallets-accounts/local-wallets)
- 智能合约的使用，[详情](https://forge-cli.netlify.com/zh/handbook/6-working-with-contracts)
- 读写链上数据，[详情](https://forge-cli.netlify.com/zh/handbook/3-read-write-on-chain-data)
- 使用流量模拟器生成测试数据(simulator)，[详情](https://forge-cli.netlify.com/zh/handbook/8-explorer-other-tooling/simulator)
- ...
