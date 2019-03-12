# Overview


## Quick Start

If you want to quickly try Forge framework, feel free to install Forge CLI tools:

```bash
$ npm install -g @arcblock/forge-cli
```

The you can do `forge init` to download latest forge assets from our releases:

```bash
$ forge init
✔ initialized cache dir for forge-cli: /Users/tchen/.forge_cli/cache
✔ initialized release dir for forge-cli: /Users/tchen/.forge_cli/release
ℹ Detected platform is: darwin
✔ Latest forge release version: v0.18.2
✔ Release asset info fetch success forge_darwin_amd64.tgz
ℹ Downloading forge_darwin_amd64.tgz |████████████████████████████████████████ 100% || 88.17/88.17 MB
✔ Downloaded forge_darwin_amd64.tgz to /tmp/forge_darwin_amd64.tgz
✔ Expand release asset /tmp/forge_darwin_amd64.tgz to /Users/tchen/.forge_cli/release/forge/0.18.2
✔ Extract forge config from /Users/tchen/.forge_cli/release/forge/0.18.2/lib/forge_sdk-0.17.0/priv/forge_release.toml
✔ Forge config written to /Users/tchen/.forge_cli/forge_release.toml
✔ Release asset info fetch success forge_starter_darwin_amd64.tgz
ℹ Downloading forge_starter_darwin_amd64.tgz |████████████████████████████████████████ 100% || 12.19/12.19 MB
✔ Downloaded forge_starter_darwin_amd64.tgz to /tmp/forge_starter_darwin_amd64.tgz
✔ Expand release asset /tmp/forge_starter_darwin_amd64.tgz to /Users/tchen/.forge_cli/release/forge_starter/0.18.2
✔ Release asset info fetch success simulator_darwin_amd64.tgz
ℹ Downloading simulator_darwin_amd64.tgz |████████████████████████████████████████ 100% || 18.81/18.81 MB
✔ Downloaded simulator_darwin_amd64.tgz to /tmp/simulator_darwin_amd64.tgz
✔ Expand release asset /tmp/simulator_darwin_amd64.tgz to /Users/tchen/.forge_cli/release/simulator/0.18.2
✔ Congratulations! forge initialized successfully!

Now you can start a forge node with forge start
```

Note that forge is in its very early stage so at the moment we only build osx and ubuntu 16.04 artifacts. We will provide the artifacts for more platforms in near future.

Once you finished initialization, forge-cli will put the artifacts into `~/.forge_cli` folder:

```bash
$ tree .forge_cli -L 4
.forge_cli
├── cache
├── forge_release.toml
└── release
    ├── forge
    │   ├── 0.18.2
    │   │   ├── bin
    │   │   ├── erts-10.2.3
    │   │   ├── lib
    │   │   └── releases
    │   └── release.yml
    ├── forge_starter
    │   └── 0.18.2
    │       ├── bin
    │       ├── erts-10.2
    │       ├── lib
    │       └── releases
    └── simulator
        ├── 0.18.2
        │   ├── bin
        │   ├── erts-10.2
        │   ├── lib
        │   └── releases
        └── release.yml
```

There are 3 applications and two configuration files installed for you:

* forge: an erlang release for forge core functionalities.
* forge_starter: an erlang release that helps with starting / restarting / upgrading forge. You can treat it like a purposely built, simplified systemd. The `release.yml` under `forge` folder is used by forge starter to start the current version of forge, if this version cannot be started successfully, forge starter will fallback to old version defined in the `release.yml`.
* simulator: an erlang release that helps with generating simulation data. Basically it will create 10, 000 wallets and then do all kinds of txs randomly between wallets.

The `forge_release.toml` is the main configuration of forge, you can edit this file to tune the behaviors of forge. For now, we just use the default configuration. For more about configuration, please see [Forge configuration guide](../core/configuration.md).

Then you can run `forge start` to start forge:

```bash
08:33 $ forge start
✔ Forge daemon successfully started
┌───────────────┬──────────┬───────────────┬───────────────┬────────────────────┐
│ Name          │ PID      │ Uptime        │ Memory        │ CPU                │
├───────────────┼──────────┼───────────────┼───────────────┼────────────────────┤
│ starter       │ 37339    │ 5s            │ 82.1 MB       │ 25.00 %            │
│ forge         │ 37520    │ 4s            │ 473 MB        │ 139.75 %           │
│ ipfs          │ 37696    │ 2s            │ 18 MB         │ 4.50 %             │
│ tendermint    │ 37701    │ 2s            │ 18.2 MB       │ 6.00 %             │
└───────────────┴──────────┴───────────────┴───────────────┴────────────────────┘

ℹ If you want to access interactive console, please run /Users/tchen/.forge_cli/release/forge/0.18.2/bin/forge remote_console
```

By default, forge is started as a daemon and it will bring up consensus engine and storage engine - at the moment, we're using tendermint / ipfs respectively.

All data (consensus db, forge state db, storage), configuration and logs are stored at the path defined in the `forge_release.toml`. By default, it is under `~/.forge_release`. Feel free to change this path to something like `/var/data/forge` or `/mnt/forge`. In this documentation, we will use `$FORGE_HOME` to refer to this path for simplicity.

Congratulations! Now your local forge node started successfully!

## Forge Logs

Logs are an important interface between forge and its user. Once forge is started, you can track the logs in these places:

* forge log: under `$FORGE_HOME/core/logs`. There are three logs files:
  - error.log: all warnings and errors. Good for knowing something bad happened on forge.
  - transaction.log: logs related with transaction processing.
  - mempool.log: logs related with mempool processing.
- consensus log: under `$FORGE_HOME/tendermint/logs`.
- storage log: uder `$FORGE_HOME/storage/logs`.
- forge app log: under `$FORGE_HOME/app/logs`.

For more information about forge logs, please refer to: [Forge Logs](../core/log.md).



## Forge SDKs

If you want to start coding immediately, we prepared several SDKs for you to use:

- [Forge JavaScript/NodeJS SDK](../sdk/javascript.md)
- [Forge Python SDK](../sdk/python.md)
- [Forge Elixir SDK](../sdk/elixir.md)


## Want to know more?

Dive into [what's inside Forge?](./inside-forge.md)!
