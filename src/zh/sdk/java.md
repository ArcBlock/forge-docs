# Java-SDK

## Forge-java-sdk

forge sdk供java开发。
如需了解Forge-相关的设置，请查看[Forge](https://github.com/ArcBlock/forge)

Forge-java-sdk的详细参考手册[在此](https://docs.arcblock.io/forge/sdks/java/)。

## 安装

如果您使用gradle，必须在资源库中添加url

``` gradle
 repositories {
      maven { url "http://android-docs.arcblock.io/release" }
 }

 dependencies {
     implementation("io.arcblock.forge:core:${forge_version}")
     implementation 'io.grpc:grpc-netty:1.20.0'
 }
```

且java版本必须>= 8.

## 使用

### 第0步

首先，在本地搭配[Forge CLI](../tools/forge_cli.md)运行Forge。

### 第1步

通过`forge config`找到您的forge使用的配置，查找forge部分，并获取sock_grpc。

## 教程

### 第0步：创建一个项目。

创建一个SpringBoot gradle项目。然后将forge-java-sdk添加至其依赖。

### 第1步：连接至Forge Node。

将forge.host和forge.port添加至您的application.properties。

```
forge.host="127.0.0.1"
forge.port=28210
```

然后在您的应用程序启动时添加`forge = ForgeSDK.connect(host, port);`

### 第2步：创建一个钱包。

```kotlin
val Alice = forge.createWallet(Rpc.RequestCreateWallet.newBuilder()
                        .setMoniker(usr)
                        .setPassphrase(pass)
                        .setType(Type.WalletType.getDefaultInstance())
                        .build())
// Alice contains:
// sk: xxxxx,pk: xxxx, address:xxxx, token:xxxxx
```

::: 建议笔记
`moniker`是Forge上该钱包的昵称。`passphrase`由Forge使用，以将钱包加密为一个keystore文件。如需了解钱包声明规则的更多信息，请点击[此处](../intro/concepts.md)。
:::

### 第3步：询问您的账户信息。

``` kotlin
forge.getForgeSDK().getAccountState()
```

### 第4步：钱包签到以获得一些代币。

``` kotlin
forge.
val tx = WalletKit.poke(WalletInfo(Alice), forge)
val response = forge.sendTx(Rpc.RequestSendTx.newBuilder()
                    .setTx(createTxResp.getTx())
                    .build());
```

等几秒，然后查看账户余额。

### 第5步：将您的余额转移给他人。

根据第2步操作创建另一个钱包（如：鲍勃）。

``` kotlin
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

如果有用，响应将返回一个哈希字符串。您可以使用forgeSDK，或在forgeWeb内询问这个哈希。tx确认后，检查爱丽丝和鲍勃的账户以确认交易成功。

::: 建议笔记
**TBA**是Forge链上的默认货币。1 TBA有16个数位，所以，显示为`10000000000000000`。
小数是16。
:::

🎉 祝贺您！您已成功完成教程！现在您应该对Forge的工作原理有了基本的了解。继续探索吧！
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY3MzIyMjU0MywxNTQ4MzEzMTMyLC0xNT
kzOTU5NDIsMTc2MDczNzEwM119
-->