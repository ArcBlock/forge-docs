---
title: "在 CentOS 上安装 Forge"
description: "在 CentOS 上安装 Forge"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "install"
  - "centos"
---

全新 centos 机器缺少几个 Forge 所需的依赖。如果您在 CentOS 上运行 Forge 时遇到问题，请往下读。本指南通过了在每月 5 美元的 Digital Ocean 机器上对 CentOS 7 的测试。

::: 警告

我们不建议您在 CentOS 6 或更低版本上运行 Forge。本指南可能不适用于该版本。

:::

## 设置用户

首先，我们创建一个 sudo 用户。有的云提供商（如 digital ocean）提供的是带 root 用户的 CentOS，因此我们需要将其禁用。如果您已经是 sudo 用户，可以跳过此步骤。

创建用户`arcblock`（您可选择其他用户名）并将其添加至 wheel 用户组（sudoer）：

```bash
adduser arcblock

usermod -aG wheel arcblock
```

然后，运行`visudo`以允许 wheel 用户组无密码运行 sudo 命令：

```
## 允许wheel用户组中的人运行全部命令

# %wheel ALL=(ALL) ALL



## 同上操作且无需密码

%wheel ALL=(ALL) NOPASSWD: ALL
```

从现在起，我们可以将用户交换为此 sudo 用户。

::: 建议

如果您之前通过 root 账户 ssh 至主机，又想在最新创建的`arcblock`账户进行 ssh，您可运行以下命令：

```bash
cat ~/.ssh/id_rsa.pub | ssh root@host "mkdir -p ~arcblock/.ssh && touch ~arcblock/.ssh/authorized_keys && chown -R arcblock ~arcblock/.ssh && chmod -R go= ~arcblock/.ssh && cat >> ~/.ssh/authorized_keys"
```

:::

## 安装常见依赖

```bash
sudo yum -y update

sudo yum install -y autoconf automake epel-release git gcc libtool m4 make ncurses-devel openssl-devel perl-core rpm-build tar vim wget zlib-devel
```

## 安装 nodejs 10/11

Forge CLI 需要 nodejs 运行时间，所以我们应该安装最新的 10.x 或 11.x 节点。如果是 ubuntu，请参考以下指南：[NodeSource Node.js Binary Distributions](https://github.com/nodesource/distributions/blob/master/README.md).

基本来说，您需要：

```bash
curl -sL https://rpm.nodesource.com/setup_11.x | sudo bash -

sudo yum install -y nodejs
```

如果您想安装 nodejs 10，仅需将`setup_11.x`替换为`setup_10.x`。

完成后，请检查 nodejs 版本是否为理想版本：

```bash
$ node -v

v11.12.0
```

尽管 nodejs 提供 npm，但我们强烈推荐您安装 yarn：

```bash
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

sudo yum install -y yarn
```

## 安装 Forge CLI

让我们使用 yarn 安装 forge cli。请注意，我们进行全球安装，以便不同用户使用。

```bash
sudo yarn global add @arcblock/forge-cli
```

## 添加非特权用户并安装 Forge

我们不推荐您在 sudo 用户上运行 forge。所以，让我们创建一个新用户，然后为其添加适当的路径：

```bash
sudo adduser forge

echo 'export PATH=/usr/local/bin:/usr/local/ssl/bin:/usr/local/sbin:$PATH' | sudo tee --append ~forge/.bashrc
```

sudo 用户`arcblock`仅应被用于 ssh 以安装软件，而普通用户`forge`仅应被用于运行 forge。

让我们向用户`sudo su forge`sudo，然后初始化 forge：

```bash
cd ~

forge init
```

正如我们在[简介](../intro)中讨论的那样，这将创建`.forge_cli`文件夹，并将 forge assets 放入其中。在默认设置中，它会将 forge 数据存储在`.forge_release`下，您可按需修改此设置

然后，您便可以运行`forge start`了。您可以通过`forge status`查看 forge 状态：

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

享受成果吧！
