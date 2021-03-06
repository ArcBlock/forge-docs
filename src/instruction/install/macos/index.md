---
title: 'MacOS'
description: 'Install Forge on MacOS'
keywords: ''
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'install'
  - 'macos'
---
# How to Install Forge on macOS

This guide will show you how to install Forge on a machine running macOS.

## Preliminary Steps

Before you can install Forge,  you'll need to perform some preliminary steps. If you've already performed some (or all) of these steps, you may skip them.

First, set up your compiler infrastructure:

```bash
$ xcode-select --install
```

Next, install [Homebrew](https://brew.sh/) to manage the packages you'll need to download and install:

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

If you've previously installed Homebrew, make sure your copy is up-to-date by running `brew update`.

Finally, install the system packages you'll need using Homebrew:

```bash
brew install automake libtool pkg-config libffi gmp openssl
```

## Step 1: Install Node.js

Force CLI requires Node.js, which you can install using Homebrew:

```bash
brew install node
```

To make sure you have installed Node properly, type `node -v` in your terminal. You should see:

```bash
$ node -v
```

## Step 2: Install the Forge CLI

You can install forge using npm, the package manager that comes with Node.js:

```bash
$ npm install -g @arcblock/forge-cli
```

Once done, you can check if Forge CLI is installed successfully with `forge -h`:

![](../assets/cli-check.gif)

🎉 Forge CLI has been installed successfully! Checkout [Quickstart](../../../intro/quickstart) to launch your chain！
