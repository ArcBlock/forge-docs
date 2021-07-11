---
title: 'ex-abci：Elixir 下的 tendermin ABCI 实现'
description: '详细讲述 ex-abci 的内部实现'
keywords: 'abci'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'abci'
---

ex-abci 是 [Tendermint ABCI spec](https://github.com/tendermint/tendermint/wiki/Application-Developers) 在 elixir 下的实现。该 repo 是开源的，受到了 [abci_server](https://github.com/KrzysiekJ/abci_server) 和 [js-abci](https://github.com/tendermint/js-abci) 的启发。

## ex-abci-proto

ex-abci 依赖于 ex-abci-proto。起初我们在实现 ex-abci 时直接依赖 tendermint 提供的 proto，但这条依赖链太长，而且在某些情况下 forge-abi 需要直接使用 tendermint 定义的某些 proto（如 Block），这样就使得我们需要复杂的 makefile 脚本来处理各种情况，最终难以维护。于是我们就单独建立了 ex-abci-proto repo，把我们用到的 GRPC proto 的定义摘取出来单独编译。这样，其它地方用到这些 proto 可以直接引入这个 repo。

## ex-abci

主要实现了三部分功能：

- varint：由于 protobuf 封装的二进制消息并没有 delimiter（比如 \n），因而 TSP 协议使用 varint 来封装消息的长度，并且放在消息前面。这样，当接收端读取消息时，先读取 varint，获得消息的长度，再读取消息本身，使用 protobuf 解码。ABCI 的消息使用了 oneof 的格式。
- abci_listener：建立和 tendermint 的连接，解码 Request，然后把需要 application（比如 forge）处理的消息转交给 abci_server（注意这个 server 是指 OTP server）。
- abci_server：提供一个 abci_server 实现的模板；里面的代码都是 example。Forge 自己的 abci_server 把这些消息的处理都实现了一遍。

ABCI 中，tendermint 发送给 forge 的消息：

```proto
message Request {
  oneof value {
    RequestEcho echo = 2;
    RequestFlush flush = 3;
    RequestInfo info = 4;
    RequestSetOption set_option = 5;
    RequestInitChain init_chain = 6;
    RequestQuery query = 7;
    RequestBeginBlock begin_block = 8;
    RequestCheckTx check_tx = 9;
    RequestDeliverTx deliver_tx = 19;
    RequestEndBlock end_block = 11;
    RequestCommit commit = 12;
  }
}
```

Forge 处理完，需要返回给 tendermint 的 ABCI 消息：

```proto
message Response {
  oneof value {
    ResponseException exception = 1;
    ResponseEcho echo = 2;
    ResponseFlush flush = 3;
    ResponseInfo info = 4;
    ResponseSetOption set_option = 5;
    ResponseInitChain init_chain = 6;
    ResponseQuery query = 7;
    ResponseBeginBlock begin_block = 8;
    ResponseCheckTx check_tx = 9;
    ResponseDeliverTx deliver_tx = 10;
    ResponseEndBlock end_block = 11;
    ResponseCommit commit = 12;
  }
}
```

## 注意事项

目前 tendermint ABCI 接口趋于稳定，但未来不排除还会出现类似 0.32 的 breaking change。如果新的 tendermint 版本出现消息格式的升级，需要评估我们是否能够升级到最新的版本：

- 消息的升级是否是破坏性的 —— 一般而言使用 protobuf 不太会出现破坏性的升级，往往是 deprecate 一些域，然后添加一些新的域。如果是，则不能升级。
- 是否值得升级 —— 如果消息格式的变化过大，导致 Forge 改动过大，那么可以暂缓甚至不升级。

一旦决定要升级更新过 ABCI 的 tendermint，要确保 ex-abci-proto 的内容和 tendermint repo 里定义的 proto 一致，并且新添的域得到了妥善处理。确保本地旧版本的 forge 使用  simulator 打了足够多的数据（一定要包含修改过 proto 的数据），然后进行 forge 升级。查看升级后是否能正常访问旧数据，并且升级后 simulator 能够正常处理。
