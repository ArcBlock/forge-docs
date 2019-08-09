---
title: "Forge 索引器"
description: "Forge 索引器"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "tools"
  - "forge_indexer"
---

默认情况下，forge 索引器启用。链上执行的每个操作都会被索引为 sqlite3 db（通过调整配置，您可以将其变为使用 postgres）。

以下数据将被索引：

- 交易列表（因此，您可以按类型筛选 tx）
- 状态（因此，您可以获取系统中最丰富的账户）

我们随后会披露 forge 的更多详情。

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTg2NTA4Mjc5NywtMTAwMDA5NzQ4NV19
-->
