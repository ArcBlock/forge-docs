---
title: '多重签名是什么'
description: '多重签名是什么'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'arch'
  - 'multisig'
---

在大部分区块链的实现中，只有发送者需要签署交易。有了发送者的签名，我们可以相信，发送者批准了操作。[Transfer](../../reference/txs/trade/transfer) 之类的交易是发送者向接收者（未经接收者许可）发送代币/资产的典型例子。在现实世界，大量用例需要交易中所有参与方的授权。例如，Alice会给Bob 20 ABT，购买Bob拥有的一张会议入场券。在本次交易中，Alice请求交易她的 20 ABT 和Bob的入场券。Bob必须授权使交易生效。这就是多重签名的其中一个使用场景。

在 Forge 中，交易协议可决定是否要启用多重签名。如果启用了多重签名，则所涉及的参与方必须按顺序根据多重签名结构签署交易（tx）：

```proto
message Multisig {
  // signer address
  string signer = 1;
  // public key for signer
  bytes pk = 2;
  // signature
  bytes signature = 3;

  // extra data
  google.protobuf.Any data = 15;
}
```

多重签名用于交易结构中：

```protobuf
message Transaction {
  string from = 1;
  uint64 nonce = 2;

  // use DID for the chain. "did:" prefix is omitted
  string chain_id = 3;
  // public key of the sender
  bytes pk = 4;

  // signature of the transaction
  bytes signature = 13;
  // we will support multiple signatures in case of certain tx need multiple
  // parties' signature.

  repeated Multisig signatures = 14;

  google.protobuf.Any itx = 15;
}
```

通常情况下，多重签名中不需要`data`。签名者需要填写`signer`地址、签名者`pk`，并在交易数据结构中`signatures`阵列的开始附上签名。然后即可签署整个交易，并将生成的签名添加至这个多重签名的`signature`中。

我们用[交换](../../reference/txs/exchange)交易解释一下上面的例子：

Alice发起交易后，她是发送者，Bob是接收者。发送者始终向`signature`字段添加签名，而接收者（或更多当事人）需要在之后进行多重签名。

### 第一步：Alice创建交换 ITX

Alice要填写一个交换 itx：

```elixir
%ForgeAbi.ExchangeTx{
  receiver: %ForgeAbi.ExchangeInfo{
    assets: ["zjdzwEM42m3GT5nLRPvwGzmLCv8EofxMfy4e"],
    value: nil
  },
  sender: %ForgeAbi.ExchangeInfo{
    assets: [],
    value: %ForgeAbi.BigUint{value: <<2, 198, 138, 240, 187, 20, 0, 0>>}
  },
  to: "z11PsZYbZWBqBDB3WPhCCu2r6G4zuxrLRsFy"
}
```

Alice要将该 itx 和她的签名放入交易中（您需要将该 itx 编码为 Google.Protobuf.Any，且将 type_url 定义为 `fg:t:exchange`）：

```elixir
%ForgeAbi.Transaction{
  chain_id: "forge",
  from: "z11CSMrHjLnk4QFtFp9zNhKJe2vNBDeFB5cR",
  itx: %Google.Protobuf.Any{
    type_url: "fg:t:exchange",
    value: <<10, 36, 122, 49, 49, 80, 115, 90, 89, 98, 90, 87, 66, 113, 66, 68,
      66, 51, 87, 80, 104, 67, 67, 117, 50, 114, 54, 71, 52, 122, 117, 120, 114,
      76, 82, 115, 70, 121, 18, 12, 10, 10, 10, 8, 2, ...>>
  },
  nonce: 124,
  pk: <<245, 235, 0, 135, 189, 169, 233, 188, 28, 12, 204, 254, 237, 11, 99,
    159, 185, 150, 174, 128, 110, 183, 127, 115, 21, 195, 18, 37, 176, 134, 165,
    71>>,
  signature: <<23, 89, 219, 32, 220, 205, 80, 109, 105, 90, 98, 0, 39, 118, 89,
    246, 87, 167, 247, 201, 241, 217, 224, 19, 217, 210, 211, 206, 116, 216,
    159, 122, 147, 67, 44, 135, 61, 253, 88, 234, 145, 222, 119, 236, ...>>,
  signatures: []
}
```

然后，通过链下方式将此 tx 交付给Bob。例如，用 ABT 钱包发送电子邮件或消息。Bob收到这个 tx 后，他可以按上方的描述生成多重签名，并将其附在 tx 上：

```elixir
%ForgeAbi.Transaction{
  chain_id: "forge",
  from: "z11CSMrHjLnk4QFtFp9zNhKJe2vNBDeFB5cR",
  itx: %Google.Protobuf.Any{
    type_url: "fg:t:exchange",
    value: <<10, 36, 122, 49, 49, 80, 115, 90, 89, 98, 90, 87, 66, 113, 66, 68,
      66, 51, 87, 80, 104, 67, 67, 117, 50, 114, 54, 71, 52, 122, 117, 120, 114,
      76, 82, 115, 70, 121, 18, 12, 10, 10, 10, 8, 2, ...>>
  },
  nonce: 124,
  pk: <<245, 235, 0, 135, 189, 169, 233, 188, 28, 12, 204, 254, 237, 11, 99,
    159, 185, 150, 174, 128, 110, 183, 127, 115, 21, 195, 18, 37, 176, 134, 165,
    71>>,
  signature: <<23, 89, 219, 32, 220, 205, 80, 109, 105, 90, 98, 0, 39, 118, 89,
    246, 87, 167, 247, 201, 241, 217, 224, 19, 217, 210, 211, 206, 116, 216,
    159, 122, 147, 67, 44, 135, 61, 253, 88, 234, 145, 222, 119, 236, ...>>,
  signatures: [
    %ForgeAbi.Multisig{
      data: nil,
      pk: <<245, 235, 0, 135, 189, 169, 233, 188, 28, 12, 204, 254, 237, 11, 99,
        159, 185, 150, 174, 128, 110, 183, 127, 115, 21, 195, 18, 37, 176, 134,
        165, 71>>,
      signature: <<207, 191, 238, 169, 227, 110, 34, 218, 191, 63, 143, 190,
        236, 76, 145, 239, 143, 35, 212, 217, 7, 116, 198, 12, 58, 63, 102, 173,
        241, 154, 81, 128, 185, 144, 42, 67, 69, 187, 202, ...>>,
      signer: "z11CSMrHjLnk4QFtFp9zNhKJe2vNBDeFB5cR"
    }
  ]
}
```

然后，Bob可以将此 tx 交付到链。因为双方都签署了 tx，这个 tx 将得到执行。

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTE3NTQyMjg5Niw3MDUwNTUwNzYsNzA0NT
YyNjIxXX0=
-->
