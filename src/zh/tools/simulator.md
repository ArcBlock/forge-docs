# Forge模拟器

模拟器用于向链中生成多种流量。因此，您可将其用于测试链的行为。目前，模拟器支持以下交易：

* 声明
* 转移
* 交换
* 创建资产
* 消耗资产
* 升级资产
* 账户迁移
* 签到

在启动模拟器时，它会生成10, 000个钱包并在链上声明这些钱包。然后，它会随机在注册钱包间发送包含以下配置的tx：

```yaml
pools:
  account_migrate: 5
  create_asset: 5
  declare: 5
  exchange: 5
  transfer: 10
  update_asset: 5
  consume_asset: 5
  poke: 5
meta:
  tick: 200
simulations:
  - name: declare new account
    interval: 1
    num: 1
    type: declare

  - name: create assets
    interval: 2
    num: 2
    type: create_asset

  - name: update assets
    interval: 2
    num: 2
    type: update_asset

  - name: exchange token and assets
    interval: 2
    num: 2
    type: exchange
    settings:
      value: "1000..20000"

  - name: transfer token
    interval: 2
    num: 2
    type: transfer
    settings:
      value: "50..200"
      asset: false

  - name: transfer token and assets
    interval: 5
    num: 2
    type: transfer
    settings:
      value: "1000..5000"
      asset: true
      after: []

  - name: migrate wallets
    interval: 5
    num: 1
    type: account_migrate

  - name: create asset, consume then transfer
    interval: 5
    num: 2
    type: consume_asset

  - name: poke to get tx
    interval: 100
    num: 1
    type: poke

```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQxMjM1NTk3NV19
-->