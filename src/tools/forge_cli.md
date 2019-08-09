---
title: 'Forge CLI'
description: 'Forge CLI'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'tools'
  - 'forge_cli'
---

Forge CLI is a command line tool for making your life easier interacting with forge.

## Install Forge CLI

As described on installation chapter, installing Forge CLI is pretty easy:

```bash
$ npm install -g @arcblock/forge-cli
```

For users from China, its's recommended to use taobao npm mirror:

```bash
$ npm install -g @arcblock/forge-cli --registry=https://registry.npm.taobao.org
```

Then you can run `forge` to see what it supports:

```bash
$ forge

██████╗ ██╗   ██╗     █████╗ ██████╗  ██████╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
██████╔╝ ╚████╔╝     ███████║██████╔╝██║     ██████╔╝██║     ██║   ██║██║     █████╔╝
██╔══██╗  ╚██╔╝      ██╔══██║██╔══██╗██║     ██╔══██╗██║     ██║   ██║██║     ██╔═██╗
██████╔╝   ██║       ██║  ██║██║  ██║╚██████╗██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
╚═════╝    ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝

Usage: forge [options] [command]

Options:
  -V, --version                         output the version number
  -v, --verbose                         Output runtime info when execute subcommand, useful for debug
  -r, --release-dir <dir>               Forge release directory path (unzipped), use your own copy forge release
  -c, --config-path <path>              Forge config used when starting forge node and initializing gRPC clients
  -g, --socket-grpc <endpoint>          Socket gRPC endpoint to connect, with this you can use forge-cli with a remote node
  -h, --help                            output usage information

Commands:
  account <address>                     Get an account info by address
  account:create                        Interactively create an account, guarded by a passphrase
  account:delete <address>              Delete an account by address
  account:list [role]                   List all accounts stored in this node
  asset <address>                       Get asset info by address
  block [options] [height]              Get the block info from the running node
  checkin                               Send a poke tx to the network to get tokens for test
  config [options] [action]             Read/write chain/node config
  create-project [options] [targetDir]  Create a project from forge starter projects
  declare:node                          Declare the current node to be a validator candidate
  download [options] [version]          Download a forge release without activate it
  help <subcommand>                     Show help of a sub command
  install|init [options] [version]      Download and setup forge release on this machine
  join <endpoint>                       Join a network by providing a valid forge web graphql endpoint
  logs [type]                           Show logs for various forge components
  ls                                    List forge releases installed locally
  protocol:compile [sourceDir]          Compile a forge transaction protocol
  protocol:deploy [itxPath]             Deploy a compiled transaction protocol to ABT Node
  ps                                    List running forge component processes
  reset [options]                       Reset current chain state, run with caution
  simulator [action]                    Start/stop simulator and generate random traffic
  stake [options] [show]                Stake to various entities: node/user/asset
  start [options]                       Start forge as a daemon in the background
  status [type]                         List info of the running chain/node
  stop [options]                        Stop the forge daemon and all forge components
  tx [hash]                             Get a tx detail and display
  tx:list                               List latest transactions
  tx:send                               Send a signed tx to the network
  tx:sign                               Sign a transaction (base64) according to sender’s wallet
  unstake                               Revert stakes to various entities
  upgrade                               Upgrade chain node to new version without reset
  use [version]                         Activate an already downloaded forge release
  version                               Output version for all forge components
  wallet:create [options]               Create a local wallet and dump its public/private key
  web [options] [action]                Start/stop the web interface of running forge chain/node
  workshop [action]                     Start/stop the dApps workshop

Examples:

  Please install a forge-release before running any other commands
  > forge install latest
  > forge install --mirror http://arcblock.oss-cn-beijing.aliyuncs.com

  Curious about how to use a subcommand?
  > forge help install
```

For all Forge CLI subcommands, you can access online doc by doing `forge help command`, like this:

```bash
$ forge help install
Usage: install|init [options] [version]

Download and setup forge release on this machine

Options:
  -m, --mirror <url>  Mirror host used to download forge release
  -h, --help          output usage information

Examples:
  - forge install             download and activate latest version
  - forge install 0.22.0      download and activate forge v0.22.0
  - forge install v0.22.0     download and activate forge v0.22.0
  - forge install --mirror http://arcblock.oss-cn-beijing.aliyuncs.com      specify a custom mirror for download
```

As most of the commands listed here are covered in installation and intro chapter, we'll just give a short intro to most popular commands.

## Initialize a forge release

`forge install` is the first command you'd use - it will download the latest forge builds to your `~/.forge_cli` and then you can start a single-node blockchain powered by forge.

## Start / Stop Chain Node

`forge start` starts the node with the configuration stated in `~/.forge_cli/forge_release.toml`. Once you have the node running successfully, you can open forge web at `http://localhost:8210` (if you didn't change the port in forge_release.toml) to do most of the operation there.

```bash
$ forge start
ℹ Starting forge web...
ℹ forge web running at:     http://localhost:8210
ℹ graphql endpoint at:      http://localhost:8210/api
✔ Forge daemon successfully started
┌───────────────┬──────────┬──────────┬───────────────┬────────────────────┐
│ Name          │ PID      │ Uptime   │ Memory        │ CPU                │
├───────────────┼──────────┼──────────┼───────────────┼────────────────────┤
│ forge         │ 12264    │ 12s      │ 172 MB        │ 43.08 %            │
│ forge_web     │ 12399    │ 3s       │ 134 MB        │ 100.67 %           │
│ starter       │ 12246    │ 12s      │ 47.1 MB       │ 7.83 %             │
│ tendermint    │ 12302    │ 10s      │ 39.8 MB       │ 2.40 %             │
└───────────────┴──────────┴──────────┴───────────────┴────────────────────┘

ℹ If you want to access interactive console, please run /Users/brandonfu/.forge_cli/release/forge/0.34.2/bin/forge remote
ℹ If you want to access forge web interface, please run forge web open
ℹ If you want to show above process list, please run forge ps
ℹ If you want to know forge status detail, please run forge status
```

If you want to stop the node, just run `forge stop`.

```bash
$ forge stop
✔ Sending kill signal to forge daemon...
✔ Forge daemon stopped!
```

## Running / Stopping simulator

`forge simulator start` / `forge simulator stop` could be used to start / stop simulator. Simulator help to generate traffic for the node so that you can easily test the chain.

## Upgrade

### Hard upgrade

> Hard upgrade requires a chain state reset before using the new version

1. Stop forge, if started: `forge stop`
1. Rest configs: `forge reset`
1. Install latest version: `forge install`
1. Start forge: `forge start`

### Soft Way

Comming soon

## View logs

There are several log files generated by different components of forge framework, run `forge logs` to view them all or `forge help logs` to checkout an individual log file.

## Advanced Usage

Forge CLI provides many commands to manage forge-powered chain node and forge release, please stay tuned while we are crafting the slides "Become a Power User of Forge CLI".

## Report Issues or Bugs

Feel free to open issues or pull requests on our [github repo](https://github.com/ArcBlock/forge-js/issues)
