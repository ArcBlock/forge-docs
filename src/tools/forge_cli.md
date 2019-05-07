# Forge CLI

Forge CLI is a command line tool for making your life easier interacting with forge.

## Install Forge CLI

As described on installation chapter, installing Forge CLI is pretty easy:

```bash
$ npm install -g @arcblock/forge-cli
```

Then you can run `forge` to see what it supports:

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

For all Forge CLI subcommands, you can access online doc by doing `forge help command`, like this:

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

As most of the commands listed here are covered in installation and intro chapter, we'll just give a short intro to most popular commands.

## Initialize a forge release

`forge init` is the first command you'd use - it will download the latest forge builds to your `~/.forge_cli` and then you can start a single-node blockchain powered by forge.

## Start / Stop Chain Node

`forge start` starts the node with the configuration stated in `~/.forge_cli/forge_release.toml`. Once you have the node running successfully, you can open forge web at `http://localhost:8210` (if you didn't change the port in forge_release.toml) to do most of the operation there.

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

If you want to stop the node, just run `forge stop`.

```bash
❯ forge stop
✔ Sending kill signal to forge daemon...
✔ Forge daemon stopped!
```

## Running / Stopping simulator

`forge simulator start` / `forge simulator stop` could be used to start / stop simulator. Simulator help to generate traffic for the node so that you can easily test the chain.

## View logs

There are several log files generated by different components of forge framework, run `forge logs` to view them all or `forge help logs` to checkout an individual log file.

## Advanced Usage

Forge CLI provides many commands to manage forge-powered chain node and forge release, please stay tuned while we are crafting the slides "Become a Power User of Forge CLI".

## Report Issues or Bugs

Feel free to open issues or pull requests on our [github repo](https://github.com/ArcBlock/forge-js/issues)
