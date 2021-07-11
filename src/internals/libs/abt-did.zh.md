---
title: 'abt-did：去中心化 ID 实现'
description: '详细讲述 abt-did 的内部实现'
keywords: 'did'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'did'
---

abt-did 提供了 pk 到 did 的封装，以及 Did Auth 的基本支持。

## 注意事项

目前 abt-did 接口非常稳定，且有对应的 web / android / iOS 实现。如果要扩充新的签名算法，哈希算法和 role type，请在 `type_bytes.ex` 里添加。
