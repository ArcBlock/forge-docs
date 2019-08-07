# 一般概念

Forge中引入了好几个新概念，在阅读前，了解这些基本概念可以让您更轻松地了解forge。

## 介绍

**Forge**是一个框架，帮助用户启动在自己链上的去中心化应用程序。

**Forge**通过三个即用层帮助用户构建自己的链：**共识**、**存储**、**网络连接**。为了制作去中心化的应用程序，用户仅需关注顶层：应用程序逻辑，而无需担心内部的基础设施。

## 交易

**交易**是用户应该理解的第一个概念。交易是ABT Nodes里最小的活动单位。ABT Node上的一切活动均是各种**交易**的结合。典型交易如下所示：

```protobuf
message Transaction {
  string from = 1;
  uint64 nonce = 2;
  string chain_id = 3;
  bytes pk = 4;
  bytes signature = 13;
  repeated Multisig signatures = 14;
  google.protobuf.Any itx = 15;
}
```

客户必须在这些字段中填写必要的值，以便交易在链中执行。以下为每个字段的解释说明：

* `from`：发起交易的发送者地址
* `nonce`：一个整数，追踪这个地址发出的交易次数
* `chain_id`：追踪这个交易发生的链的字符串
* `pk`：发送者公共密钥的字节
* `signature`：发送者在此交易下签名的字节。由接收者用于验证此交易的内容未被其他当事人改变。
* `signatures`：本交易需要接收者或第三方账户背书情况下的其他多重签名。查看：[什么是多重签名？](../arch/multisig.md)
* `itx`：此交易的类型和内容。查看：[交易](../txs)

所有交易受**交易协议**支持。交易协议是执行交易并操控状态的代码。在一个链中的所有运行节点上，交易协议可以被动态地安装、升级、激活和停用。如需了解交易协议的更多信息，请查看[../txs]。

## 账户和钱包

### 账户

如需在ABT Node上发起**交易**，用户需拥有账户。每个账户有独特的地址，Forge通过地址识别用户。每位用户均可拥有无限个拥有不同地址的账户。

### 钱包

钱包中包含账户凭证，其包括独特地址、密钥(SK)和公共密钥(PK)。用户通过钱包发出及接收**交易**。

```protobuf
message WalletInfo {
  WalletType type = 1;
  bytes sk = 2;
  bytes pk = 3;
  string address = 4;
}
```

* `type`：用于生成此钱包的加密算法
* `sk`：密钥
* `pk`：公共密钥
* `address`：钱包地址，也是账户地址

### 密钥

根据用户选择的钱包**类型**，公共密钥由密钥计算得出，而地址则通过公共密钥计算得出。因此，密钥非常重要，因为如果有了密钥，任何人都可以仿冒他人的签名并发起恶意**交易**。

### 签名

每笔**交易**都包含由发送者的密钥生成的签名。通过验证发布在ABT Node上带用户公钥的签名，任何人均可验证交易内容是否与发送者的预期一致。

## 内在交易(ITX)

在上面，我们看到了每种**交易**的定义，其中，字段`itx`，即内在交易，决定了**交易**类型和其本质上代表的活动。

例如，`TransferTx`意味着，交易代表转移活动，即一个**账户**试图将一定数额的钱或资产转移到另一个**账户**。

### 格式

每个`itx`都编码为`google.protobuf.Any`格式，由`type_url`和`value`构成。
* _type_url_：代表内在交易身份的字符串，可帮助Forge决定如何解码`value`字段
* _value_：内在交易的序列化版本。

#### Type_Urls

Type_urls是帮助Forge SDK正确解码序列化itx的字符串。每个`type_url`定义相应itx的类型，并且注册在forge上。所以，当Forge看到`type_url`时，可以知道正确的`itx`类型，以解码`value`字段，及获取完整的内在交易。

因为`type_urls`被Forge用于解释`itx`的类型，所以要求所有`type_urls`遵守相同的命名惯例。例如，`TransferTx`的`type_url`是
    ```fg:t:transfer```
在这里：`fg`代表Forge，`t`代表`transaction`，意为此编码`value`的类型是内在交易，而`transfer`代表此内在交易的类型。

为了解码编码的`value`字段，每个`protobuf.Any`都应包含一个`type_url`来说明登记的格式。之后，我们会看到更多除内在交易之外的type_urls的用例。

#### 值

在`protobuf.Any`，`value`包含内在交易的序列化版本，它不是人类可读的。

例如，如果我们想将1单位货币转移到某个地址`zysnfkW9LH5jVUubpwcrGaopnN2oDBPTLmuP`。`TransferTx`如下所示：
```protobuf
TransferTx{
    to='zysnfkW9LH5jVUubpwcrGaopnN2oDBPTLmuP',
    value=BigUint(value=b'\x01')
}
```

在序列化后，itx如下所示：

```
'\n\x08address1\x12\x03\n\x010'
```

然后，完整的 `itx` 如下所示:

```protobuf
Any{
    type_url='fg:t:transfer',
    value='\n\x08address1\x12\x03\n\x010'
}
```

当ABT Node看到`fg:t:transfer`，它会知道如何解码`value`。

### 内在交易类型

在上面，我们看到了`TransferTx`，其代表了ABT Node上的转移活动。每个活动都有自己的内在交易，且定义为不同类型。

如需获取完整的itx列表和解释，请查看[Forge ITX](/txs)。

## gRPC和GraphQL

Forge SDK使用[gRPC](https://grpc.io/docs/)调用和[GraphQL](https://graphql.org/learn/)。

Forge SDK也部署了很多即用的GRPC API供用户使用。如需获取有关Forge SDK如何使用gRPC的详细说明，请点击[此处](../core/rpc)。

### Protobuf

如需在gRPC内通讯，所有消息的格式应为[protobuf](https://developers.google.com/protocol-buffers/)，即专门将**gRPC**调用中数据序列化的格式。
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTc2OTAzMTUyMCwxNDYxNTg3OTQ2LDMzMD
E2ODk2LDEwNzU4MzAwMzAsLTE0MzU0MjM1NjgsNjk5Mjg0NDgz
LDYxNzMzODQ2M119
-->