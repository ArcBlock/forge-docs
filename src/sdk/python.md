# Python SDK
## Forge-python-sdk
For Forge-related setup, please checkout [Forge](https://github.com/ArcBlock/forge).   

A detailed reference manual for forge-python-sdk can be found [here](https://docs.arcblock.io/forge-python-sdk/index.html).


## Installation

We recommend installing through `pip`
```sh
pip install forge-python-sdk
```
::: warning
This sdk supports python verison `>=3.6`. 
:::

## Usage

### Step 0
First get your Forge running on local with [Forge Cli](https://github.com/ArcBlock/forge-js/tree/master/packages/forge-cli). 

### Step 1
Find the config your forge is using by `forge config`

### Step 2
Set `FORGE_CONFIG` as your environment variable, pointing to the config your forge is running on.

### Simple GRPC examples

#### Import rpc module
```python
from forge_sdk import rpc
```
::: warning
Your forge should be running when you import rpc. Otherwise, rpc module can't be imported correctly. Checkout  [Forge Cli](https://github.com/ArcBlock/forge-js/tree/master/packages/forge-cli) for how to start Forge.
:::


#### get chain info
```python
rpc.get_chain_info()
Out[3]:
info {
  id: "fea5f258f30cd184d3c38af42d99e03325f6c875"
  network: "forge"
  moniker: "forge-local"
  consensus_version: "0.30.2"
  synced: true
  app_hash: "\345\031\313\021\226\301\360\030\254\360\206+/\200\217\275/\r`\021\026\243\342g1\256\335\340\246lr\213"
  block_hash: "E\262~\222\3318 \325\337\016\013\321\342\271\347\346\000\264uC\225nc\354\275n\020~\372x#e"
  block_height: 99833
  block_time {
    seconds: 1554851683
  }
  address: "zyt5PXcpLoEdYsJrnf7bEAuCFBEM5d7Jg3FP"
  voting_power: 10
  total_txs: 264
  version: "0.21.3"
  data_version: "1.5"
  forge_apps_version {
    key: "Event-Chain"
    value: "0.1.0"
  }
  supported_txs: "fg:t:update_asset"
  supported_txs: "fg:t:transfer"
  supported_txs: "fg:t:sys_upgrade"
  supported_txs: "fg:t:stake"
  supported_txs: "fg:t:exchange"
  supported_txs: "fg:t:declare_file"
  supported_txs: "fg:t:declare"
  supported_txs: "fg:t:consensus_upgrade"
  supported_txs: "fg:t:create_asset"
  supported_txs: "fg:t:consume_asset"
  supported_txs: "fg:t:poke"
  supported_txs: "fg:t:account_migrate"
}

```

#### get health status
```python
rpc.get_health_status()
Out[3]: 
health_status {
  consensus {
    health: true
    synced: true
    block_height: 121550
  }
  network {
  }
  storage {
    health: true
    indexer_server: "ok"
    state_db: "ok"
    disk_space {
    }
  }
  forge {
    health: true
    abi_server: "ok"
    forge_web: "ok"
    abci_server {
      abci_consensus: "ok"
      abci_info: "ok"
    }
  }
}
```
