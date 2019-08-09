---
title: "在 MacOS 上安装 Forge"
description: "在 MacOS 上安装 Forge"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "install"
  - "macos"
---

全新 centos 机器缺少几个 Forge 所需的依赖。如果您在 MacOS 下运行 Forge 时遇到问题，请往下读。

## 基础设置

1. 设置编译基础设施

```bash
$ xcode-select --install
```

2. 安装[Homebrew](https://brew.sh/)

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

如果您的 Mac 上已经安装了`Homebrew`，可以运行`brew update`升级您的 Homebrew。

3. 安装必要的系统包

```bash
brew install automake libtool pkg-config libffi gmp openssl
```

## 安装 Node.js

```bash
brew install node
```

为了确保您正确地安装了 Node，请在终端输入`node -v`。您应该可以看到：

```bash
$ node -v

v10.5.0
```

为了确保您正确地安装了 NPM，请在终端输入`npm -v`。您应该可以看到：

```bash
$ npm -v

6.1.0
```

您也可以运行`brew upgrade node`升级您的`Node`和`npm`

## 安装 Forge CLI

```bash
$ npm install -g @arcblock/forge-cli
```

在您的电脑上安装 forge 可能需要一些时间

## 运行 Forge

安装 forge 后，您可以试着运行它。

### 启动 Forge

首先，运行`forge init`，初始化您主目录下的`.forge_cli`文件夹和`.forge_release`文件夹。所有的 forge 数据都存储在`.forge_release`下，可在之后进行配置。

```bash
$ cd ~

$ forge init
```

### 启动 Forge

然后运行`forge start`以启动 forge。

```bash
$ forge start

✔ Forge daemon successfully started

┌───────────────┬──────────┬───────────────┬───────────────┬────────────────────┐

│ Name │ PID │ Uptime │ Memory │ CPU │

├───────────────┼──────────┼───────────────┼───────────────┼────────────────────┤

│ starter │ 4104 │ 16.1s │ 61.6 MB │ 0.00 % │

│ forge │ 4357 │ 12.7s │ 433 MB │ 0.00 % │

│ ipfs │ 4670 │ 6.7s │ 27.1 MB │ 0.00 % │

│ tendermint │ 4677 │ 6.6s │ 22.6 MB │ 0.00 % │

└───────────────┴──────────┴───────────────┴───────────────┴────────────────────┘



ℹ If you want to access interactive console, please run /home/forge/.forge_cli/release/forge/0.18.6/bin/forge remote_console

forge@forge-cli:~$ forge status

──────────────

✔ Chain Info

──────────────

{

id: '99cd4f098ed96c5d3ae1391a2858ab4fbf3db799',

network: 'forge',

moniker: 'forge',

consensusVersion: '0.30.2',

synced: true,

appHash: 'bc40d2b84429b70564bf1aa51aefa956b636674b78d6511851d5a2721e151cb3',

blockHash: 'd9ddd9d5873a155be66aa553574a7b53a7f9154713875ebf7e4dfca4cd526798',

blockHeight: 2,

blockTime: '2019-03-16T17:52:32.000Z',

address: 'zystc5rNpeE462e3DokUC4nR7PUsrL5zM38J',

votingPower: 10,

totalTxs: 0,

version: '0.18.6',

dataVersion: '1.4',

forgeAppsVersion: {},

supportedTxs: [

'fg:t:update_asset',

'fg:t:transfer',

'fg:t:sys_upgrade',

'fg:t:stake',

'fg:t:exchange',

'fg:t:declare_file',

'fg:t:declare',

'fg:t:consensus_upgrade',

'fg:t:create_asset',

'fg:t:consume_asset',

'fg:t:poke',

'fg:t:account_migrate'

]

}



──────────────

✔ Forge State

──────────────

{

address: 'forge_state',

consensus: {

maxBytes: 150000,

maxGas: -1,

maxValidators: 64,

maxCandidates: 256,

pubKeyTypes: [

'ed25519'

],

validators: [

{

address: 'zystc5rNpeE462e3DokUC4nR7PUsrL5zM38J',

power: 10

}

],

validatorChanged: false,

paramChanged: false

},

tasks: {},

stakeSummary: {},

version: '0.18.6',

dataVersion: '1.4',

forgeAppHash: '',

token: {

name: 'ArcBlock',

symbol: 'ABT',

unit: 'arc',

description: 'Forge token ABT',

decimal: 16,

initialSupply: 93000000,

totalSupply: 186000000,

inflationRate: 0

}

}



──────────────

✔ Net Info

──────────────

{

listening: true,

listeners: [

'Listener(@)'

],

nPeers: 0,

peers: []

}



──────────────

✔ Validators Info

──────────────

{

blockHeight: 3,

validators: [

{

address: '766D728A8CD7204FF7631912B963B8AE860D6DF6',

votingPower: 10,

proposerPriority: '0',

name: ''

}

]

}



──────────────

✔ Forge Web

──────────────

ℹ forge web started at: http://localhost:8210

ℹ graphql endpoint at: http://localhost:8210/api

ℹ graphql playground at: http://localhost:8210/api/playground
```

### 休息一下，享受成果吧
