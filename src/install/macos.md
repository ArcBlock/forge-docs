# Install Forge on MacOS

A brand new centos machine lacks several dependencies that Forge requires. If you met issues on running Forge under MacOS, please read on.


## Basic Setup

1. Setup compiler infrastructure

    ```bash
    $ xcode-select --install
    ```

2. Install [Homebrew](https://brew.sh/)

    ```bash
    $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    ```

If you already have `Homebrew` installed on your Mac, you can run `brew update` to upgrade your Homebrew.

3. Install necessary system packages
    ```bash
    brew install automake libtool pkg-config libffi gmp openssl
    ```

## Install Node.js 

```bash
brew install node
```

To make sure you have installed Node properly, type `node -v` in your termianl. You should see:
```bash
$ node -v
v10.5.0
```

To make sure you have installed NPM properly, type `npm -v` in your terminal. You should see:
```bash
$ npm -v
6.1.0
```

You can also run `brew upgrade node` to upgrade your `Node` and `npm`

## Install Forge CLI

```bash
$ npm install -g @arcblock/forge-cli
```
This might take a while to install forge on your computer

## Run Forge

After forge is installed, you can try running it.

### Init Forge

First, run `forge init` to initialize a `.forge_cli` folder and a `.forge_release` folder under your home directory. All your forge data is stored under `.forge_release`, which can be configured later.
```bash
$ cd ~
$ forge init
```

### Start Forge

Then run `forge start` to start forge.

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

### Sit back and enjoy!
