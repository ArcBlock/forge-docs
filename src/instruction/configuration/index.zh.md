---
title: '配置指南'
description: '配置指南'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'core'
  - 'configuration'
---

## 概述

[Forge CLI](/handbook/) 创建出来每一条链都会有自己对应的 `forge_release.toml`，里面是这条链的配置信息。每条链创建成功后会出现如下信息提示配置文件的位置，用户可以直接在文件里修改。

```shell
✔ Config file /Users/.forge_chains/forge_test1/forge_release.toml is updated!
```

Forge 的配置信息主要有两种，**链的配置**和**节点配置**。

- **链的配置** 主要包括对链本身的设置，一旦链启动过，这些配置信息会被记录在链的状态中，并在所有节点间同步，因此 **链的配置** 的信息在链首次启动后就不可更改。
- **节点配置** 主要包括对节点自身的设置，因此即使在链启动后也可以随时更改，只不过需要重启节点才能生效。

用户在第一次使用 `forge start` 启动链之前必须确定好所有**链的配置**。

::: tip
Forge 使用了 `toml` 作为配置文件的格式。每一条配置信息都是一个键值对，并有自己的分区。

`[]`方括号中的内容代表不重复的分区。如：`[forge]`下的配置代表这些配置属于 `forge`，`[forge.transaction]` 下的配置代表这些配置属于 `forge.transaction`。Forge 在运行时会去对应的分区下面读取配置内容。
:::

以下是 Forge 中各项配置的详细解释。如果某项配置在 `forge_release.toml` 中没有出现，则 Forge 会使用默认值，否则将以 `forge_release.toml` 中的配置为准。

## 链的配置

### 所有交易

`[forge.transaction]` 分区下定义的是关于所有交易的配置。对于某种交易的特定配置会在 `[forge.transaction.*]` 下配置，后面会具体描述。

```toml
[forge.transaction]
max_asset_size = 1000000
```

| 域               | 含义                           | 默认值举例                                             |
| :--------------- | :----------------------------- | :----------------------------------------------------- |
| `max_asset_size` | asset 的自定义 data 域的最大值 | 每个 asset 自带的 data 域大小不能超过`1000000` bytes。 |

#### Declare 交易

```toml
[forge.transaction.declare]
restricted = false
```

| 域           | 含义                                            | 默认值举例                                                                                                              |
| :----------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `restricted` | 执行`Declare`交易时是否限制用户自由声明新账户。 | 该链不限制用户声明新账户。关于如何在受限情况下声明新账户，可以参考[Declare](../../reference/txs/account/declare) 交易。 |

### 管理员账户

管理员账户拥有对链的最高权限，许多特殊交易，如对链的升级等，必须要管理员账户才能执行。用户在创建链的时候可以选择是使用自己已有的账户作为管理员账户还是生成新的管理员账户。**不管是哪一种情况，用户都需要保护好管理员账户的 `私钥`。**

如果用户选择通过 Forge CLI 生成管理员账户，在创建完链后，`sk`的位置会有如下信息提示：

```shell
Your moderator SK has been preserved in ~/.forgerc.yml
```

```toml
[forge.prime.moderator]
address = "z11LFAwVJ4NdAHVVbVeNJsJ4nxHH3UJ8Fusy"
pk = "ABCcGxD3sIzn5qLaxXn0ZPzCJxKsglEobuJOZwEfIoY"
balance = 0
```

| 域        | 含义               |
| :-------- | :----------------- |
| `address` | 管理员账户地址     |
| `pk`      | 管理员账户公钥     |
| `balance` | 管理员账户初始余额 |

### 链持币账户

链持币账户是一个特殊账户，没有`sk` 或者`pk`。链持币账户中的币只能通过特定交易转出，目前只有 `Poke`交易可以转出。

```toml
[forge.prime.token_holder]
balance = 4000000000
```

| 域        | 含义               |
| :-------- | :----------------- |
| `balance` | 链持币账户初始余额 |

:::tip
如果链不支持 `Poke`交易，则链持币账户的初始余额应设置成 0，否则这部分币将被困在链持币账户中。
:::

### 初始账户

除了之前提及的 **管理员账户** 和 **链持币账户**， 用户还可以预设更多别的账户。链在初始化的时候，会自动声明这些账户，并根据配置生成对应的账户余额。

:::tip
`[[]]`双方括号中的内容代表可重复的分区。如 `[[forge.accounts]]`分区和里面的配置可以出现多次，代表多个 account 配置。
:::

```toml
[[forge.accounts]]
address = "<addr1>"
pk = "<base64 of pk1 without padding>"
balance = 1000

[[forge.accounts]]
address = "<addr2>"
pk = "<base64 of pk2 without padding>"
balance = 2000
```

### 通证信息

```toml
[forge.token]
name = "ArcBlock"
symbol = "ABT"
unit = "arc"
description = "Forge token ABT"
icon = "data:image/png;base64,iVBORw0KGgoAAA"
decimal = 18
initial_supply = 7_500_000_000
total_supply = 7_500_000_000
inflation_rate = 0
```

| 域               | 含义                                   | 默认值举例 |
| :--------------- | :------------------------------------- | :--------- |
| `name`           | 通证的名称                             | -          |
| `symbol`         | 通证的符号                             | -          |
| `unit`           | 通证的最小单位，类似与比特币上的聪     | -          |
| `description`    | 通证的描述                             | -          |
| `icon`           | 通证的图标，需要做 base64 编码放在这里 | -          |
| `decimal`        | 通证的精度                             | -          |
| `initial_supply` | 通证初始供应量                         | -          |
| `total_supply`   | 通证的总供应量                         | -          |
| `inflation_rate` | 通证的膨胀率                           | -          |

### 共识引擎

```toml
[tendermint.genesis]
genesis_time = "2019-02-10T17:29:13.31415926Z"
chain_id = "forge"
max_bytes = 150000
```

| 域             | 含义                                            | 默认值举例                                                                                                                   |
| :------------- | :---------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `genesis_time` | 链的初始时间，必须是 ISO 8601 格式的 UTC 时间。 | 生成链的时候，Forge CLI 会填入对应的时间。假如填入的是以上时间，则说明这条链是在 2019 年 2 月 10 日下午五点 UTC 时间创立的。 |
| `chain_id`     | 链的 ID，所有节点必须保持一致                   | 这条链的 ID 是`forge`。                                                                                                      |
| `max_bytes`    | 每个区块数据量的最大值                          | 每个区块的大小不能超过 `150000` bytes                                                                                        |

### 初始验证节点

用户可以加入自定义的验证节点（参与出块的节点）。但如果超过或等于三分之二的验证节点无法正常运行，则整条链也不能正常运行。如果没有任何初始验证节点的配置，本节点默认为唯一的验证节点，这样链就退化成单节点的链。

```toml
[[tendermint.genesis.validators]]
address = "74BC09AD20D6FC0881B353ABF0F9B7F70236ECF7"
name = "shanghai"
power = "1000"

[tendermint.genesis.validators.pub_key]
type = "tendermint/PubKeyEd25519"
value = "rO20HkBgLYnXnnAekRpFOrwqfiyVfvqDA5tYH4YCFjo="

[[tendermint.genesis.validators]]
address = "43D6B21BDCFBB672C7C8375BF127D3466A889DAF"
name = "beijing"
power = "1000"

[tendermint.genesis.validators.pub_key]
type = "tendermint/PubKeyEd25519"
value = "2ziJ4pHMKmBHrwo1mUzu85C9RR4LyVHfqjSIlwejYBM="
```

## 节点配置

### Forge

```toml
[forge]
path = "~/.forge_release/core"
logpath = "logs"
sock_grpc = "tcp://127.0.0.1:28210"
pub_sub_key = "ABTTOTHEMOON"
```

| 域            | 含义                                       | 默认值举例                                                   |
| :------------ | :----------------------------------------- | :----------------------------------------------------------- |
| `path`        | Forge 的主路径                             | Forge 相关的代码会存储在 `~/.forge_release/core`下。         |
| `logpath`     | Forge log 的路径，会跟在主路径之后         | Forge 相关的 log 会存在`~/.forge_release/core/logs`下。      |
| `sock_grpc`   | Forge 在本节点运行时的 gRPC 端口           | Forge 在本节点的 gRPC 端口会运行在 `tcp://127.0.0.1:28210`。 |
| `pub_sub_key` | Forge 在发布和订阅信息时用来加密数据的秘钥 | Forge 在发布和订阅数据时会使用 `ABTTOTHEMOON`来加密数据。    |

### Forge Web

```toml
[forge.web]
enabled = true
port = 8210
```

| 域        | 含义                   | 默认值举例             |
| :-------- | :--------------------- | :--------------------- |
| `enabled` | 是否自动运行 Forge Web | Forge Web 将自动运行。 |
| `port`    | Forge Web 监听的端口   | -                      |

### 缓存

```toml
[cache]
path = "~/.forge_release/cache/mnesia_data_dir"
```

| 域     | 含义             | 默认值举例                                                      |
| :----- | :--------------- | :-------------------------------------------------------------- |
| `path` | Forge 的缓存位置 | Forge 的缓存将放在 `~/.forge_release/cache/mnesia_data_dir`下。 |

### 共识引擎

```toml
[tendermint]
moniker = "beijing"
path = "/home/work/.forge_chains/forge_beijing/forge_release/tendermint"
keypath = "/home/work/.forge_chains/forge_beijing/keys"
logpath = "logs"
sock_rpc = "tcp://127.0.0.1:32001"
sock_grpc = "tcp://127.0.0.1:36001"
sock_p2p = "tcp://0.0.0.0:37001"
persistent_peers = "2b2a41a70f9ab7c43d4772857bcfaa254887e4b6@47.104.23.85:37001,c6525de61a02379108592fcb6514b19d4a196be9@182.92.167.126:37001"
timeout_commit = "5s"
```

| 域                 | 含义                                                     | 默认值举例                               |
| :----------------- | :------------------------------------------------------- | :--------------------------------------- |
| `moniker`          | 节点昵称                                                 | 节点可以自己明明，会显示在 Peer 列表里面 |
| `path`             | tendermint 数据存储目录                                  | -                                        |
| `keypath`          | tendermint 节点公钥、私钥存储目录                        | -                                        |
| `logpath`          | tendermint 日志存储目录，相对于数据存储目录              | -                                        |
| `sock_rpc`         | tendermint 的 rpc 端口                                   | -                                        |
| `sock_grpc`        | tendermint 的 grpc 端口                                  | -                                        |
| `sock_p2p`         | tendermint 的 p2p 端口，如果需要组网，需要注意防火墙配置 | -                                        |
| `persistent_peers` | tendermint 应该保持连接的节点列表                        | -                                        |
| `timeout_commit`   | 出块时间                                                 | -                                        |
