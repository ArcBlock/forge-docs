# Forge Logs日志

在出现问题时，Forge会生成日志，供故障排除。`tendermint`和`ipfs`也会提供日志。以下为默认日志位置总结：

```
~/.forge_release
├── core
│     └── logs
│         ├── error.log
│         ├── mempool.log
│         └── transaction.log
├── ipfs
│     └── logs
│         └── ipfs.log
└── tendermint
    └── logs
        └── tendermint.log
```

现在，我们看看Forge日志

## 错误日志

错误日志显示Forge核心生成的错误。这大部分为Elixir/Erlang流程详细的崩溃日志。该日志在排除故障方面很有用。

## 内存池日志

内存池日志显示tenderint内存池的日志。在每笔交易被检查后，便会被发送至tenderint的内存池，等待纳入下一个区块。

只有一个tendermint阶段：

- 检查Tx

```
16:34:28.556 application=forge pid=<0.2689.0> [info] [consensus check tx]: hash=E60D0AFC68378F371B783E8AE87DA0CC155C314C4FF046ECC7CF314B158C9580
```

## 交易日志

交易日志显示与交易相关的日志。无论是否提出新区块，都有几个tendermint阶段：

- 开始区块
- 交付Tx
- 结束区块
- 提交区块

```
16:05:14.662 application=forge pid=<0.2690.0> [info] [consensus begin block]: chain id=forge, app hash=, height=1, num_txs=0, total_txs=0, proposer=BBAA954FF7B3F2182A6808D4614CC96C199CE739, time=2019-02-10 19:22:08Z
16:05:14.669 application=forge pid=<0.2690.0> [info] [consensus end block]: height=1 total_txs=0
16:05:14.678 application=forge pid=<0.2690.0> [info] [consensus commit block]: height=1 total_txs=0 app_hash=8D6B9CD27160CF8EEEDA14F1BD57733D07E160EF6415E1DF16F4EFF46C0BC2C3
```

空区块没有交付tx信息。

```
16:25:36.904 application=forge pid=<0.2690.0> [info] [consensus begin block]: chain id=forge, app hash=7A8E6ACE2E14965B5CE9795CA9CA888CD3F5997A1DB02536B51BDF2044EBEB95, height=245, num_txs=174, total_txs=174, proposer=BBAA954FF7B3F2182A6808D4614CC96C199CE739, time=2019-03-21 23:25:31Z
16:25:36.906 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=0 hash=20680DF6C5488B82CE69F092EC4A1743643F2E39917E358AEA3F485BAF10A83C
16:25:36.918 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=1 hash=93832E48280130834A3019F40A5DDBCAE73B498D0B0E47C799D8F2231B7F0F75
...
16:25:37.317 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=173 hash=857FE499FCE6583FB4CF0AEDA650E8610C15B87BF2ADCA734699DA18A6F931EA
16:25:37.319 application=forge pid=<0.2690.0> [info] [consensus end block]: height=245 total_txs=174
16:25:37.389 application=forge pid=<0.2690.0> [info] [consensus commit block]: height=245 total_txs=174 app_hash=3828FFDBAE0ACE2410A21E7D3B95AF25219C37F83232FCCE721F584F4AD6D3F6
```

对于不为空的区块，在开始区块和结束区块间有交付tx信息。

### 交付Tx

默认情况下，对于每比交易，我们提供三个日志项目：

* 一致交付tx：区块的高度，tx索引和哈希。
* 开始tx：出高度/tx_index/哈希外，它也包含type_url和发送者地址。
* 完成的tx：除开始tx的数据外，它也提供重要信息：
  - 状态：如果状态不`ok`，则是无效tx。状态代码会表明此tx上发生了何种错误。
  - 花费总时间：因为每个tx都会经过一系列管道，它在`us`里给出每个管道的性能指标。如需了解更多信息，请查看[Forge TX协议](./core/tx_protocol.md)。

```
16:25:37.317 application=forge pid=<0.2690.0> [info] [consensus deliver tx]: height=245 tx_index=173 hash=857FE499FCE6583FB4CF0AEDA650E8610C15B87BF2ADCA734699DA18A6F931EA
16:25:37.317 application=forge_tx pid=<0.2690.0> [info] [pipeline] Started tx: height=245, tx_index=173, hash=857FE499FCE6583FB4CF0AEDA650E8610C15B87BF2ADCA734699DA18A6F931EA, type_url=fg:t:declare, sender=z1kfuhzPXCbpddtCqi641sXwgQQMY6YWvLN.
16:25:37.319 application=forge_tx pid=<0.2690.0> [info] [pipeline] Finished tx: height=245, tx_index=173, type_url=fg:t:declare, status=ok. Total time spent: %{final_update: 30, post_update: 46, post_verify: 37, pre_update: 6, pre_verify: 664, update: 194, verify: 612}
```

## Tendermint日志

如需了解如何阅读tendermint日志的更多信息，请查看[相关文件](https://tendermint.com/docs/tendermint-core/how-to-read-logs.html#walkabout-example)。

## IPFS日志

IPFS的日志中尚无很多信息。
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQxMTIzODYxOCwxMDk4NTQxMDUsMTQ5Mj
E0OTUxLC0xNTY1MTg5OTIsMTc1Mzc1NzgyMl19
-->