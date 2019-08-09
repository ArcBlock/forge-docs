---
title: "升级 Forge 网络"
description: "升级 Forge 网络"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "upgrade"
  - "upgrade_network"
---

如果现有网络在特定版本运行，请按照以下升级路径操作：

- 向网络发送`upgrade node` tx。对于本地测试网络，您可以使用管理员地址发送此 tx。查看[管理员开发账户](moderator.md)。
- 在升级节点 tx 中，您应提供需升级的版本，以及高度。请注意，执行您的 tx 后，便不可撤销。如果节点未达到高度，您仍可发送另一个升级节点 tx，并选择`override`选项，以覆写现有升级参数。
- 节点会在给定高度停止。然后，您需要手动升级节点至升级 tx 所需的版本。
- 升级节点后，运行`forge start`在此启动节点。它应该会开始和新版本同步。

## 示例

假如有一个名为 called sisyphus.abtnetwork.io 的链。它的运行版本是 0.23.1。高度 150，操作员将其升级至 0.23.4。如果您想为 sisyphus.abtnetwork.io 设置新节点，可以在您的节点进行以下操作：

- 安装最新的 forge cli——`npm install -g @arcblock/forge-cli`（查看[安装章节](../../install)了解更多信息）。
- 运行`forge init 0.23.1`，在您的本地节点安装 forge 0.23.1。
- 运行`forge join https://sisyphus.abtnetwork.io/api`，找回此网络的配置。这会将您的本地节点加入 sisyphus 网络。
- 运行`forge start`开始同步网络。
- 当您的节点达到情况高度 150 时，节点会停止同步。
- 运行`forge stop`。
- 运行`forge init 0.23.4`，在您的本地节点安装 forge 0.23.4。
- 运行`forge start`。它会开始与 0.23.4 版同步。
  <!--stackedit_data:
  eyJoaXN0b3J5IjpbLTMyMTExNDM4N119
  -->
