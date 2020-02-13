---
title: 'forge cache app 的实现'
description: '详细讲述 forge cache app 的内部实现'
keywords: 'cache'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'cache'
---

背景：由于在 Forge 处理 tx 以及 client 通过 GRPC 访问 state db 时，需要对数据进行多次读取，为了提高读取的性能 —— rocksdb 性能很强，但由于我们使用了 MPT，导致每次读取数据实际上要顺着 MPT 树查找，对 rocksdb 有多次读取 —— 因而我们使用 mnesia 作为 kv store 的缓存，这样可以拿到一个 address / hash 可以直接读取。

然而，cache 是把双刃剑，每次在写入 state db 的时候，我们都需要把 cache 刷掉，然而，会有潜在的机会，在更新完 state db 还没有刷新 cache 的时候，cache 被读取，然后读出的内容被修改，写入 state db，这样，就会导致状态出错。首汽 GoFun 两个节点组成的链短期打入大量的 create asset tx 会复现 cache 的问题。为了解决这个问题，我们把 cache 停用。

停用 cache 并未带来太多性能上的损失，因为区块链本身也是一个写入很高的数据库。每次写入都会导致 cache 刷新，反而把读取的优势给抹平了。
