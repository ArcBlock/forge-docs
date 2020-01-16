---
title: '换币服务常见问题'
description: '为了更流畅的使用换币服务，你有必要知道的点'
keywords: 'token swap'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'token swap'
---

## 什么是换币服务

换币服务是由 ArcBlock 研发的异构链通证互换服务，基本目标是实现 ABT 资产链原生币和 ERC20 ABT 的互换，理论上可以支持任意 ERC20 通证和基于 Forge 链上的通证做互换。

## 如何转入？

参考文档：[转入操作手册](./deposit)

## 如何转出？

参考文档：[转出操作手册](./withdraw)

## 手续费规则？

换币服务中的两种基本操作的手续费规则如下：

- ERC20 ABT 到原生 ABT：不收手续费，但是用户换入的时候需要自己付以太坊上的 Gas
- 从原生 ABT 到 ERC20 ABT：我们按转出金额的 0.1% 收取手续费，但单笔转出最少收取 1 ABT，最多收取 100 ABT

## 如何寻求帮助？

如果你在使用换币服务中遇到问题，有如下的反馈渠道：

- 在官方社区里面反馈：[community.arcblockio.cn](https://community.arcblockio.cn)
- 在换币服务中提工单：中国大陆用户访问速度可能会比较慢

## 如何查看链上交易？

换币服务中跟原生币有关的交易全部都存储在 ArcBlock 资产链上，除了在 ABT 钱包里面查看之外，也可以到我们的资产链区块浏览器上查看：

- 全球访问地址：[xenon.abtnetwork.io](https://xenon.abtnetwork.io/node/explorer/txs)
- 大陆访问地址：[xenon.network.arcblockio.cn](https://xenon.network.arcblockio.cn/node/explorer/txs)

## 国内和国外的访问地址？

目前换币服务还只有全球站，访问地址是：[swap.abtnetwork.io](https://swap.abtnetwork.io)，即服务器在美国，春节后我们会在中国大陆部署换币服务的实例。
