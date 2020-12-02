---
title: "账户迁移交易"
description: "账户迁移交易"
keywords: ""
robots: "index,follow"
category: ""
layout: "documentation"
tags:
  - "account"
  - "account_migrate"
---

**账户迁移**交易可将现有账户从旧钱包迁移至新钱包。当您钱包的密钥可能遭遇泄露（例如，打印密钥的纸张丢失）时，这个功能非常有用。为了安全目的，您可以发出账户迁移交易，从旧钱包转至新生成的钱包。本次迁移后，您所有的现有代币余额都将移至新账户，您之前拥有的资产可被转移或使用。

## 协议定义

如需迁移账户，您应使用`AccountMigrateTx`消息：

```proto
message AccountMigrateTx {

bytes pk = 1; // new public key

WalletType type = 2 [deprecated = true]; // new wallet type, not used any more since address is embedded with this info.

string address = 3; // new wallet address



google.protobuf.Any data = 15;

}
```

您需要将`pk`和`address`填写入本 itx，然后用旧钱包集合并签署交易。在链上执行后，您的旧账户将被封闭，所有涉及旧地址的事项均会指向新的地址。

以下是发送账户迁移交易的示例：

```elixir
old_wallet = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "sisyphus"), wallet: old_wallet)

# after a while you feel old_wallet is not safe any more

new_wallet = ForgeSdk.create_wallet()

ForgeSdk.account_migrate(ForgeAbi.AccountMigrateTx.new(pk: new_wallet.pk, address: new_wallet.address), wallet: old_wallet)
```
