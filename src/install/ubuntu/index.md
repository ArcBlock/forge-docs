---
title: 'Install Forge on Ubuntu'
description: 'Install Forge on Ubuntu'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'install'
  - 'ubuntu'
---

A brand new ubuntu machine lacks several dependencies that Forge requires. If you met issues on running Forge under Ubuntu, please read on. This guide is tested on ubuntu 16.04 and 18.04 on a $5/month Digital Ocean machine.

::: warning
We do not suggest you to run Forge on Ubuntu 14.04 or lower. This guide may even not work for Ubuntu 14.04 (at least nodejs > 10 won't be installed in that version).
:::

## Setting up users

First of all, let's create a sudo user. Some cloud provider (e.g. digital ocean) ships ubuntu with root user, thus we need to disable it. You can skip this step if you're already a sudo user.

Here we created a user named `arcblock`, feel free to use a different one:

```bash
adduser arcblock
```

Then add user to sudo group and remove the password:

```bash
usermod -aG sudo arcblock
sudo passwd -d arcblock
```

Then you can do `visudo` to do not require password for sudo user:

```
%sudo   ALL=(ALL:ALL) NOPASSWD:ALL
```

::: tip
If you're more familiar with vim, `update-alternatives --config editor` could change the default editor.
:::

From now on we can switch the user to this sudo user.

::: tip
If you previously ssh to the host with root account, and you want to ssh with newly created `arcblock` account, you can run this command:

```bash
cat ~/.ssh/id_rsa.pub | ssh root@host "mkdir -p ~arcblock/.ssh && touch ~arcblock/.ssh/authorized_keys && chown -R arcblock ~arcblock/.ssh && chmod -R go= ~arcblock/.ssh && cat >> ~/.ssh/authorized_keys"
```

:::

## Install nodejs

Forge CLI requires nodejs runtime, so we shall install latest 10.x or 11.x node. For ubuntu, please follow this guide: [NodeSource Node.js Binary Distributions](https://github.com/nodesource/distributions/blob/master/README.md).

Basically, you need:

```bash
sudo apt-get update
sudo apt-get install -y build-essential
curl -sL https://deb.nodesource.com/setup_11.x | sudo -E bash -
sudo apt-get install -y nodejs
```

If you want to install nodejs 10, just replace `setup_11.x` to `setup_10.x`.

Once finished, please check nodejs version is desired version:

```bash
$ node -v
v11.12.0
```

Although nodejs ships with npm, we highly recommend you install yarn:

```bash
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
```

## Install latest openssl

The openssl version shipped with ubuntu 16.04 is too old, we shall install a newer one:

```bash
cd /tmp
wget https://www.openssl.org/source/openssl-1.1.1.tar.gz
tar xvf openssl-1.1.1.tar.gz
cd openssl-1.1.1
./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)'
make
sudo make install
```

Then you need to put the openssl path into your `$PATH`:

```
sudo vim /etc/environment
```

Add `/usr/local/ssl/bin` after `/usr/local/bin`:

```
PATH="/usr/local/sbin:/usr/local/bin:/usr/local/ssl/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games"
```

Now logout and login to activate the `$PATH` change. Check your openssl version:

```bash
$ openssl version
OpenSSL 1.1.1  11 Sep 2018
```

### Install erlang crypto (optional)

In ubuntu 16.04, you need to install erlang crypto to make an erlang release works with openssl you installed:

```bash
sudo apt-get install -y erlang-crypto
```

::: warning
If you missed this step, the Forge release will crash with the error message:

> libcrypto.so.1.1: cannot open shared object file: No such file or directory
> :::

## Install Forge CLI

Let's use yarn to install forge cli. Note we install it globally so that different users could use it.

```bash
sudo yarn global add @arcblock/forge-cli
```

## Add a non-privileged user and install Forge

We don't recommend running forge on a sudo user. So let's create a new user:

```bash
sudo adduser forge
```

Then remove its password:

```bash
sudo passwd -d forge
```

The sudo user `arcblock` shall only be used for ssh to install software, and the normal user `forge` shall only be used to run forge.

Let's sudo to this user: `sudo su forge`, and then init forge:

```bash
cd ~
forge init
```

As we discussed in [intro](../intro), this will create `.forge_cli` folder and put forge assets into it. By default, it will put forge data under `.forge_release`, if you don't like this, you can change it

Then you shall be able to run `forge start`. You may want to check forge status by `forge status`:

```bash
$ forge start
✔ Forge daemon successfully started
┌───────────────┬──────────┬───────────────┬───────────────┬────────────────────┐
│ Name          │ PID      │ Uptime        │ Memory        │ CPU                │
├───────────────┼──────────┼───────────────┼───────────────┼────────────────────┤
│ starter       │ 4104     │ 16.1s         │ 61.6 MB       │ 0.00 %             │
│ forge         │ 4357     │ 12.7s         │ 433 MB        │ 0.00 %             │
│ ipfs          │ 4670     │ 6.7s          │ 27.1 MB       │ 0.00 %             │
│ tendermint    │ 4677     │ 6.6s          │ 22.6 MB       │ 0.00 %             │
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
ℹ forge web started at:     http://localhost:8210
ℹ graphql endpoint at:      http://localhost:8210/api
ℹ graphql playground at:    http://localhost:8210/api/playground
```

Have fun!
