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

██████╗ ██╗   ██╗     █████╗ ██████╗  ██████╗██████╗ ██╗      ██████╗  ██████╗██╗  ██╗
██╔══██╗╚██╗ ██╔╝    ██╔══██╗██╔══██╗██╔════╝██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝
██████╔╝ ╚████╔╝     ███████║██████╔╝██║     ██████╔╝██║     ██║   ██║██║     █████╔╝
██╔══██╗  ╚██╔╝      ██╔══██║██╔══██╗██║     ██╔══██╗██║     ██║   ██║██║     ██╔═██╗
██████╔╝   ██║       ██║  ██║██║  ██║╚██████╗██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗
╚═════╝    ╚═╝       ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝

Usage: forge [options] [command]

Options:
  -v, --verbose                Output runtime logs when execute the command, used for debug
  -r, --release-dir            Forge release directory path (unzipped), use your own copy forge release
  -c, --config-path            Forge config used when starting forge node and initializing gRPC clients
  -g, --socket-grpc            Socket gRPC endpoint to connect, with this you can use forge-cli with a remote node
  -s, --setup-script           Path to a javascript file that loads application specific protobuf files into grpc-client
  -h, --help                   output usage information

Commands:
  account:create               Interactively create an account, guarded by a passphrase
  account:delete <address>     Delete an account by address
  account <address>            Get an account info by address
  account:list [role]          List all accounts stored in this node, role=[all], default role is all
  block [options] [height]     Get the block info from the running node
  help <subcommand>            Show help of a sub command
  version                      Output version for all components, including forge-cli, forge, storage and consensus engine
  config                       Read and display forge config
  declare:node                 Declare the current node to be a validator candidate
  init                         Download and setup latest forge-core release on this machine
  join <endpoint>              Join a network by providing an forge web graphql endpoint to fetch config
  logs [type]                  Show logs for various forge components
  ps                           List application status for forge (includes tendermint and ipfs)
  restart [app]                Restart the forge managed applications: core/app/tendermint/ipfs
  simulate|simulator [action]  Start/stop simulator and generate some random data
  start                        Start forge as a daemon in the background
  state|status [type]          List the information of the chain and the node, chain|core|net|validator|web
  stop                         Stop the forge daemon (forge-core, forge-app, consensus engine, storage engine)
  web [options] [action]       Start or stop the web UI of running forge node
  tx [hash]                    Get a tx detail and display
  checkin|poke                 Send a poke tx to the network to get tokens for test
  tx:send                      Send a signed tx to the network
  tx:sign                      Sign a transaction (base64) according to sender’s wallet
  stake [options] [show]       Stake to various entities: node/user/asset
  unstake                      Revert stakes to various entities

Examples:

  Be sure to initialize before running any other commands
  > forge init

  Curious about how to use a subcommand?
  > forge help block
```

For all Forge CLI subcommands, you can access online doc by doing `forge help xxx`, like this:

```bash
$ forge help init
Usage: init [options]

Download and setup latest forge-core release on this machine

Options:
  -h, --help  output usage information
```

As most of the commands listed here are covered in installation and intro chapter, we'll just give a short intro to most popular commands.

## Init the software

`forge init` is the first command you'd use - it will download the latest forge builds to your `~/.forge_cli` and then you can use the functionalities of the forge.

## Start / Stop node

`forge start` starts the node with the configuration stated in `~/.forge_cli/forge_release.toml`. Once you have the node running successfully, you can open forge web at `http://localhost:8210` (if you didn't change the port in forge_release.toml) to do most of the operation there.

If you want to stop the node, just run `forge stop`.

## Running / Stopping simulator

`forge simulator start` / `forge simulator stop` could be used to start / stop simulator. Simulator help to generate traffic for the node so that you can easily test the chain.
