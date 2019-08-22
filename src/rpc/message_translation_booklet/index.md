---
title: 'Message Translation Booklet'
description: 'Message Translation Booklet'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'rpc'
  - 'message_translation_booklet'
---

## Transaction type

| Type                 | ZH               | EN                           |
| :------------------- | :--------------- | :--------------------------- |
| asset type           |                  |                              |
| create_asset         | 创建资产         | create asset                 |
| update_asset         | 更新资产         | update asset                 |
| consume_asset        | 消费资产         | consume asset                |
| create_asset_factory | 创建工厂模式资产 | create asset in factory mode |
| acquire_asset        | 获得资产         | acquire asset                |
| account type         |                  |                              |
| account_migrate      | 账户迁移         | migrate account              |
| declare              | 账户声明         | declare account              |
| misc type            |                  |
| poke                 | 签到             | poke                         |
| trade type           |                  |                              |
| exchange             | 交换             | exchange                     |
| transfer             | 转让             | transfer                     |

## Status Code

| Name                                          | Code | ZH                         | EN                                                 |
| :-------------------------------------------- | :--- | :------------------------- | :------------------------------------------------- |
| ok                                            | 0    | 成功                       | Success                                            |
| common code 1-15                              |      |                            |
| invalid_nonce                                 | 1    | 交易已存在                 | transaction existed                                |
| invalid_signature                             | 2    | 签名不合法                 | signature is invalid                               |
| invalid_sender_state                          | 3    | 发送者状态不合法           | sender state is invalid                            |
| invalid_receiver_state                        | 4    | 接收者状态不合法           | receiver state is invalid                          |
| insufficient_data                             | 5    | 数据不完整                 | data is insufficient                               |
| insufficient_fund                             | 6    | 余额不足                   | fund is insufficient                               |
| invalid_owner                                 | 7    | 拥有者不合法               | owner is invalid                                   |
| invalid_tx                                    | 8    | 交易信息不合法             | transaction information is invalid                 |
| unsupported_tx                                | 9    | 不支持的交易类型           | transaction type is unsupported                    |
| expired_tx                                    | 10   | 过期交易                   | transaction is expired                             |
| too_many_txs                                  | 11   | mempool交易过多             | too many transactions in mempool                   |
| invalid_lock_status                           | 12   | 锁定状态不合法             | lock status is invalid                             |
| invalid_request                               | 13   | gRPC 请求不合法            | gPPC request is invalid                            |
| 16 - 2047 various errors                      |      |                            |
| invalid_moniker                               | 16   | 钱包用户名不合法           | moniker of account is invalid                      |
| invalid_passphrase                            | 17   | 钱包密码不合法             | passphrase of account is invalid                   |
| invalid_multisig                              | 20   | 多重签名不合法             | multisig signatures are invalid                    |
| invalid_wallet                                | 21   | 加载钱包的地址或者密码错误 | address or passphrase in loading wallet is invalid |
| invalid_chain_id                              | 22   | 链 ID 不合法               | chain ID is invalid                                |
| consensus_rpc_error                           | 24   | 共识 RPC 错误              | consensus rpc error                                |
| storage_rpc_error                             | 25   | 存储 RPC 错误              | storage rpc error                                  |
| enoent                                        | 26   | 条目不存在                 | no entity found                                    |
| account_migrated                              | 27   | 已账户迁移状态             | account is in migrated status                      |
| unsupported_stake                             | 30   | 不支持类型的抵押           | stake is unsupported                               |
| insufficient_stake                            | 31   | 抵押余额不充足             | stake is insufficient                              |
| invalid_stake_state                           | 32   | 抵押状态不合法             | stake state is insufficient                        |
| expired_wallet_token                          | 33   | 钱包令牌过期               | wallet token us expired                            |
| banned_unstake                                | 34   | 不允许类型的解除抵押       | unstake is banned                                  |
| invalid_asset                                 | 35   | 资产信息不合法             | asset is invalid                                   |
| invalid_tx_size                               | 36   | 交易内容大小不合法         | transaction size is invalid                        |
| invalid_signer_state                          | 37   | 签名者状态不合法           | singer state is invalid                            |
| invalid_forge_state                           | 38   | forge 状态不合法           | forge state is invalid                             |
| expired_asset                                 | 39   | 过期资产                   | asset is expired                                   |
| untransferrable_asset                         | 40   | 不可转让资产               | asset is untransferrable                           |
| readonly_asset                                | 41   | 只读资产                   | asset is readonly                                  |
| consumed_asset                                | 42   | 被消费资产                 | asset is consumed                                  |
| invalid_deposit_value                         | 43   | 抵押金额不合法             | deposited valid is invalid                         |
| exceed_deposit_cap                            | 44   |                            |
| invalid_deposit_target                        | 45   |                            |
| invalid_depositor                             | 46   |                            |
| invalid_withdrawer                            | 47   |                            |
| duplicate_tether                              | 48   |                            |
| invalid_expiry_date                           | 49   |                            |
| invalid_deposit                               | 50   |                            |
| invalid_custodian                             | 51   |                            |
| forbidden                                     | 403  | 资源不可用                 | request is forbidden                               |
| internal                                      | 500  | 内部错误                   | internal error                                     |
| timeout                                       | 504  | 请求超时                   | timeout error                                      |
| user defined status code shall start from 600 |      |                            |
