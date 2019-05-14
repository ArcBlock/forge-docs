# Message Translation Booklet

## Transaction type


| Type                 | Chinese          |
| :------------------- | :--------------- |
| asset type           |                  |
| create_asset         | 创建资产         |
| update_asset         | 更新资产         |
| consume_asset        | 消费资产         |
| create_asset_factory | 创建工厂模式资产 |
| acquire_asset        | 获得资产         |
| account type         |                  |
| account_migrate      | 账户迁移         |
| declare              | 账户声明         |
| misc type            |                  |
| poke                 | 签到             |
| trade   type         |                  |
| exchange             | 交换             |
| transfer             | 转让             |



## Status Code



| Name                                          | Code | Chinese                    |
| :-------------------------------------------- | :--- | :------------------------- |
| ok                                            | 0    | 成功                       |
| common code 1-15                              |      |                            |
| invalid_nonce                                 | 1    | 随机数不合法               |
| invalid_signature                             | 2    | 签名不合法                 |
| invalid_sender_state                          | 3    | 发送者状态不合法           |
| invalid_receiver_state                        | 4    | 接收者状态不合法           |
| insufficient_data                             | 5    | 数据不完整                 |
| insufficient_fund                             | 6    | 余额不足                   |
| invalid_owner                                 | 7    | 拥有者不合法               |
| invalid_tx                                    | 8    | 交易信息不合法             |
| unsupported_tx                                | 9    | 不支持的交易类型           |
| expired_tx                                    | 10   | 过期交易                   |
| too_many_txs                                  | 11   | 内存池交易过多             |
| invalid_lock_status                           | 12   | 锁定状态不合法             |
| invalid_request                               | 13   | gRPC请求不合法             |
| 16 - 2047 various errors                      |      |                            |
| invalid_moniker                               | 16   | 钱包用户名不合法           |
| invalid_passphrase                            | 17   | 钱包密码不合法             |
| invalid_multisig                              | 20   | 多重签名不合法             |
| invalid_wallet                                | 21   | 加载钱包的地址或者密码错误 |
| invalid_chain_id                              | 22   | 链ID不合法                 |
| consensus_rpc_error                           | 24   | 共识RPC错误                |
| storage_rpc_error                             | 25   | 存储RPC错误                |
| noent                                         | 26   | 条目不存在                 |
| account_migrated                              | 27   | 已账户迁移状态             |
| unsupported_stake                             | 30   | 不支持类型的抵押           |
| insufficient_stake                            | 31   | 抵押余额不充足             |
| invalid_stake_state                           | 32   | 抵押状态不合法             |
| expired_wallet_token                          | 33   | 钱包令牌过期               |
| banned_unstake                                | 34   | 不允许类型的解除抵押       |
| invalid_asset                                 | 35   | 资产信息不合法             |
| invalid_tx_size                               | 36   | 交易内容大小不合法         |
| invalid_signer_state                          | 37   | 签名者状态不合法           |
| invalid_forge_state                           | 38   | forge状态不合法            |
| expired_asset                                 | 39   | 过期资产                   |
| untransferrable_asset                         | 40   | 不可转让资产               |
| readonly_asset                                | 41   | 只读资产                   |
| consumed_asset                                | 42   | 被消费资产                 |
| invalid_deposit_value                         | 43   | 抵押金额不合法             |
| exceed_deposit_cap                            | 44   |                            |
| invalid_deposit_target                        | 45   |                            |
| invalid_depositor                             | 46   |                            |
| invalid_withdrawer                            | 47   |                            |
| duplicate_tether                              | 48   |                            |
| invalid_expiry_date                           | 49   |                            |
| invalid_deposit                               | 50   |                            |
| invalid_custodian                             | 51   |                            |
| forbidden                                     | 403  | 资源不可用                 |
| internal                                      | 500  | 内部错误                   |
| timeout                                       | 504  | 请求超时                   |
| user defined status code shall start from 600 |      |                            |
