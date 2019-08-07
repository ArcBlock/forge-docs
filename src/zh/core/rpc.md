# Forge RPC

与大部分区块链平台不同，Forge不使用JSON RPC作为其公共接口。JSON RPC速度很慢、容易出错（类型不安全）且效率低下（ 有效负载和连接性均是如此）。

Forge的RPC支持[gRPC](https://grpc.io/)和[GraphQL](https://graphql.org/)。gRPC适用于构建后端服务——所以，如果您在Forge构建服务，应该考虑使用gRPC。GraphQL适用于网站/移动访问，通常情况下，如果您想用Forge API服务移动或网站用户，GraphQL可能更适合您的要求。我们提供这样的灵活性，便于您选择满足您特定需求的最佳技术。

在内部，GraphQL API是gRPC接口的包裹。简单来说，我们集成了GraphQL实验室，供您与提供的API Forge交互。您可以从以下方式中选择一种访问实验室：

* 任何公共Forge Node。例如：[ArcBlock测试链](http://abt-test.arcblock.co:8210/node/query).
* 您通过`forge start`开始的本地节点。请确保您的本地节点开始，然后打开此链接：[http://localhost:8210/node/query](http://localhost:8210/node/query)。

您应该会看到如下页面。写GraphQL查询，然后执行。在此，我们查询地址为`z1frPQRqZbW8wELhAPh1nBMV18c7j1FocbB`的账户状态。

![Forge GraphQL Playground](../assets/images/forge_playground.jpg)

查询如下所示：

```graphql
{
  getAccountState(address: "z1frPQRqZbW8wELhAPh1nBMV18c7j1FocbB") {
    code
    state {
      address
      balance
      issuer
      moniker
      nonce
      numAssets
      numTxs
      pk
    }
  }
}
```

如果您不熟悉GraphQL，我推荐您快速查看[GraphQL教程](https://www.graphql.com/tutorials/)。

在执行查询后，您可以看到结果：

```json
{
  "data": {
    "getAccountState": {
      "code": "OK",
      "state": {
        "address": "z1frPQRqZbW8wELhAPh1nBMV18c7j1FocbB",
        "balance": "98999999999999999000",
        "issuer": "",
        "moniker": "tyrchen",
        "nonce": 4,
        "numAssets": 0,
        "numTxs": 3,
        "pk": "waBx5ZSTSO5DOQmvUfKCBkjJFpybm1-Zxk2dO_XgVYU"
      }
    }
  }
}
```

如需了解关于Forge RPC的更多信息，请访问[Forge RPC](../rpc/)。

## 为什么选择gRPC

gRPC（Google Remote Procedure Calls）是一个开放源远程过程调用（RPC）系统，在谷歌开发。它使用HTTP/2进行传输，Protocol Buffers作为接口定义语言，同时提供以下功能：认证、双向流和流量控制、 阻塞或非阻塞绑定，以及取消和超时。它为多种语言生成跨平台的客户和服务器绑定。最常见的使用场景包括以微服务风格架构连接服务和连接移动设备、浏览器客户到后端服务[^1]。

[^1]查看：[维基百科：gRPC](https://en.wikipedia.org/wiki/GRPC)

## 为什么选择GraphQL

GraphQL一个API的开放源数据询问和操作语言，也是通过现有数据完成询问的运行时间。通过允许客户定义所需数据的结构，且让有相同结构的数据从服务器返回，GraphOL 提供高效、强大和灵活的网站API开发方式。如果您熟悉了GraphQL，从客户的角度看，这个API更加强大、安全（即使强类型系统使服务器完成询问或失败，但服务器绝不会返回客户无法识别的数据）[^2]。

[^2]：查看[维基百科：GraphQL]([https://en.wikipedia.org/wiki/GRPC](https://en.wikipedia.org/wiki/GraphQL))
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEyNDY2MDA1NjYsLTE2ODM3NDY2MzgsNz
Y0MzY1MDIxLDE5MzY5OTk3NTQsLTE1OTMzNTY1MjAsMTk5MTg1
MDQ2OCwxNjY0MzA2OTc1XX0=
-->
