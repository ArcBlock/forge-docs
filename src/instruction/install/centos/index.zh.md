---
title: "在 CentOS 上安装 Forge"
description: "在 CentOS 上安装 Forge"
keywords: ""
robots: "index,follow"
category: "docs"
layout: "documentation"
tags:
  - "install"
  - "centos"
---

全新 centos 机器缺少几个 Forge 所需的依赖。如果您在 CentOS 上运行 Forge 时遇到问题，请往下读。本指南通过了在每月 5 美元的 Digital Ocean 机器上对 CentOS 7 的测试。

::: warning

我们不建议您在 CentOS 6 或更低版本上运行 Forge。本指南可能不适用于该版本。

:::

## 设置用户

首先，我们创建一个 sudo 用户。有的云提供商（如 digital ocean）提供的是带 root 用户的 CentOS，因此我们需要将其禁用。如果您已经是 sudo 用户，可以跳过此步骤。

创建用户`arcblock`（您可选择其他用户名）并将其添加至 wheel 用户组（sudoer）：

```bash
adduser arcblock

usermod -aG wheel arcblock
```

然后，运行`visudo`以允许 wheel 用户组无密码运行 sudo 命令：

```
# 允许wheel用户组中的人运行全部命令

%wheel ALL=(ALL) ALL

## 同上操作且无需密码

%wheel ALL=(ALL) NOPASSWD: ALL
```

从现在起，我们可以将用户交换为此 sudo 用户。

::: tip
如果您之前通过 root 账户 ssh 至主机，又想在最新创建的`arcblock`账户进行 ssh，您可运行以下命令：

```bash
cat ~/.ssh/id_rsa.pub | ssh root@host "mkdir -p ~arcblock/.ssh && touch ~arcblock/.ssh/authorized_keys && chown -R arcblock ~arcblock/.ssh && chmod -R go= ~arcblock/.ssh && cat >> ~/.ssh/authorized_keys"
```
:::

## 安装常见依赖

```bash
sudo yum -y update

sudo yum install -y autoconf automake epel-release git gcc libtool m4 make ncurses-devel openssl-devel perl-core rpm-build tar vim wget zlib-devel
```

## 安装 nodejs 10/11

Forge CLI 需要 nodejs 运行时间，所以我们应该安装最新的 10.x 或 11.x 节点。如果是 ubuntu，请参考以下指南：[NodeSource Node.js Binary Distributions](https://github.com/nodesource/distributions/blob/master/README.md).

基本来说，您需要：

```bash
curl -sL https://rpm.nodesource.com/setup_11.x | sudo bash -

sudo yum install -y nodejs
```

如果您想安装 nodejs 10，仅需将`setup_11.x`替换为`setup_10.x`。

完成后，请检查 nodejs 版本是否为理想版本：

```bash
$ node -v

v11.12.0
```

尽管 nodejs 提供 npm，但我们强烈推荐您安装 yarn：

```bash
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo

sudo yum install -y yarn
```

## 安装 Forge CLI

让我们使用 yarn 安装 forge cli。请注意，我们进行全球安装，以便不同用户使用。

```bash
sudo yarn global add @arcblock/forge-cli
```

## 添加非特权用户并安装 Forge

我们不推荐您在 sudo 用户上运行 forge。所以，让我们创建一个新用户，然后为其添加适当的路径：

```bash
sudo adduser forge

echo 'export PATH=/usr/local/bin:/usr/local/ssl/bin:/usr/local/sbin:$PATH' | sudo tee --append ~forge/.bashrc
```

sudo 用户`arcblock`仅应被用于 ssh 以安装软件，而普通用户`forge`仅应被用于运行 forge。

让我们通过`sudo su forge`使用 `forge` 用户，然后运行`forge -h` 检查 Forge CLI 是否已成功安装：

![](../assets/cli-check.gif)

🎉 Forge CLI 已经安装成功了，现在去 [快速入门](../../../intro/quickstart) 尝试发一条链吧！
