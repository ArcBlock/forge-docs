---
title: "Java-SDK"
description: "Java-SDK"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "sdk"
  - "java"
---

## Forge-java-sdk

forge sdk 供 java 开发。
如需了解 Forge-相关的设置，请查看[Forge](https://github.com/ArcBlock/forge)

Forge-java-sdk 的详细参考手册[在此](https://docs.arcblock.io/forge/sdks/java/)。

## 安装

如果您使用 gradle，必须在资源库中添加 url

```gradle
repositories {
  maven { url "http://android-docs.arcblock.io/release" }
}

dependencies {
  implementation("io.arcblock.forge:core:${forge_version}")
  implementation 'io.grpc:grpc-netty:1.20.0'
}
```

且 java 版本必须>= 8.

## 使用

### 第 0 步

首先，在本地搭配[Forge CLI](../../tools/forge_cli)运行 Forge。

### 第 1 步

通过`forge config`找到您的 forge 使用的配置，查找 forge 部分，并获取 sock_grpc。

## 教程

### 第 0 步：创建一个项目

创建一个 SpringBoot gradle 项目。然后将 forge-java-sdk 添加至其依赖。

### 第 1 步：连接至 Forge Node

将 forge.host 和 forge.port 添加至您的 application.properties。

```
forge.host="127.0.0.1"
forge.port=28210
```

然后在您的应用程序启动时添加`forge = ForgeSDK.connect(host, port);`

### 第 2 步：创建一个钱包。

```kotlin
val Alice = forge.createWallet(Rpc.RequestCreateWallet.newBuilder()
                        .setMoniker(usr)
                        .setPassphrase(pass)
                        .setType(Type.WalletType.getDefaultInstance())
                        .build())
// Alice contains:
// sk: xxxxx,pk: xxxx, address:xxxx, token:xxxxx
```

::: tip
`moniker`是 Forge 上该钱包的昵称。`passphrase`由 Forge 使用，以将钱包加密为一个 keystore 文件。如需了解钱包声明规则的更多信息，请点击[此处](../intro/concepts)。
:::

### 第 3 步：询问您的账户信息。

```kotlin
forge.getForgeSDK().getAccountState()
```

### 第 4 步：钱包签到以获得一些代币。

```kotlin
forge.
val tx = WalletKit.poke(WalletInfo(Alice), forge)
val response = forge.sendTx(Rpc.RequestSendTx.newBuilder()
                    .setTx(createTxResp.getTx())
                    .build());
```

等几秒，然后查看账户余额。

### 第 5 步：将您的余额转移给他人。

根据第 2 步操作创建另一个钱包（如：Bob）。

```kotlin
//create TransferTx
val sendToken = BigInteger.valueOf(1L).plus(BigDecimal("1e$decimal").toBigInteger())
val itx = Transfer.TransferTx.newBuilder()
                .setValue(Type.BigUint.newBuilder().setValue(ByteString.copyFrom(sendToken.toByteArray())).build())
                .setTo(Bob.address)
                .build()
val tx = WalletKit.createTx(Alice, 123L, chainId, itx)
val response = forge.sendTx(Rpc.RequestSendTx.newBuilder()
                    .setTx(createTxResp.getTx())
                    .build());
```

如果有用，响应将返回一个哈希字符串。您可以使用 forgeSDK，或在 forgeWeb 内询问这个哈希。tx 确认后，检查Alice和Bob的账户以确认交易成功。

::: tip
**TBA**是 Forge 链上的默认货币。1 TBA 有 16 个数位，所以，显示为`10000000000000000`。
小数是 16。
:::

🎉 祝贺您！您已成功完成教程！现在您应该对 Forge 的工作原理有了基本的了解。继续探索吧！

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY3MzIyMjU0MywxNTQ4MzEzMTMyLC0xNT
kzOTU5NDIsMTc2MDczNzEwM119
-->
