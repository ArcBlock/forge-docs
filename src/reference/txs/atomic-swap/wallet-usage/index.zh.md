---
title: '基于 ABT Wallet 实现原子互换'
description: ''
keywords: 'forge, swap, cross-chain'
robots: 'index,follow'
category: ''
layout: 'documentation'
tags:
  - 'atomic-swap'
  - 'usage'
---

## 场景描述

现实世界中的原子交换可能发生在两个用户或者用户和应用之间，比如典型的 B2C 购买和 C2C 的购买，而涉及到终端用户时，要他用代码来互换显然是不可能也是不合理的，用户只需要使用 ABT Wallet 就可以了。接下来，我们模拟的数字商品商店的销售场景：

- 卖家会运行一个网店，本质上这个网店是一个 dApp，网店上销售数字商品，比如付费阅读的内容，数字商品的内容保存在卖家自己运行的 Forge 链上，但是卖家希望接受另外一条链上的通证来付款，比如 ArcBlock 的资产链上的原生通证 ABT
- 买家安装了 ABT Wallet，并且持有一定数量的 ABT，在网店上发现需要的数字商品之后，选择下单、单击购买，然后用 ABT Wallet 扫码支付，发起原子交换的请求

## 基本流程

ABT Wallet 已经很好的支持了原子交换，但是网店应该怎么做才能和 ABT Wallet 交互完成购买呢？下面是流程图：

---

```graph
sequenceDiagram
  participant User
  participant Shop
  participant ShopChain
  participant AssetChain
  User-->>Shop: Visit Shop
  User-->>Shop: Start Payment
  User-->>Shop: Start Payment
  Shop-->>User: Swap Parameter
  User-->>AssetChain: Setup Swap
  User-->>Shop: Submit Swap Address
  Shop-->>AssetChain: Verify User Swap
  Shop-->>ShopChain: Setup Swap
  User-->>ShopChain: Retrieve Swap (Reveal Hashkey)
  Shop-->>AssetChain: Retrieve Swap (Use Hashkey)
```

---

图中的 Shop 即是网店，可以看到他需要做几件事情：

- 给用户提供完成购买支付需要的各种参数，简单说就是用户需要付多少钱，能买到什么东西
- 验证用户发送过来的 Swap 状态，是否满足要求，详见[原子互换原理](../what_is_atomic_swap)里面的解释
- 在网店的 Forge 链上 SetupSwap
- 在用户从网店的 Forge 链上 RetrieveSwap 之后，去用户的通证链上 RetrieveSwap，拿到钱

流程清楚之后，具体如何在网店中实现原子互换程序的支持呢？Forge SDK 和 Forge 工具箱提供了两种不同的方案：

## 基于 SDK 的实现


目前 JavaScript SDK 提供了比较完整的 DID Auth 和原子互换支持，以基于 [Express.js](https://expressjs.com) 的服务端实现为例，关键代码为：

::: error
强烈建议继续阅读之前本地把 Forge React Starter 跑起来，具体文档参考[这里](/handbook/7-working-with-blocklets/starter-blocklets)，下面的修改就基于这个项目。
:::

### 配置文件准备

因为原子互换肯定是发生在两条链上，所以需要收集两条链的基本信息，把用户付款的那条链称之为 `Asset Chain`，比如下面的配置，我们把 `zinc` 链当做资产链：

```ini
REACT_APP_CHAIN_ID="playground"
REACT_APP_CHAIN_HOST="https://playground.network.arcblockio.cn/api"
REACT_APP_ASSET_CHAIN_ID="zinc-2019-05-17"
REACT_APP_ASSET_CHAIN_HOST="https://zinc.abtnetwork.io/api"
```

### 服务端配置

服务端需要准备的东西比较多，依次是：

#### 初始化原子互换中间件

在 `api/libs/auth.js` 中做如下修改，关键点在 `SwapMongoStorage` 和 `SwapHandlers`：

- `SwapMongoStorage` 是用来存储原子互换的中间状态，也就是帮助应用管理订单
- `SwapHandlers` 是用来处理整个原子互换过程中需要和钱包做的所有交互

```javascript
const Mcrypto = require('@arcblock/mcrypto');
const ForgeSDK = require('@arcblock/forge-sdk');
const TokenMongoStorage = require('@arcblock/did-auth-storage-mongo');
const SwapMongoStorage = require('@arcblock/swap-storage-mongo');
const { AssetFactory } = require('@arcblock/asset-factory');
const { fromSecretKey, fromJSON, WalletType } = require('@arcblock/forge-wallet');
const { WalletAuthenticator, WalletHandlers, SwapHandlers } = require('@arcblock/did-auth');
const env = require('./env');

const type = WalletType({
  role: Mcrypto.types.RoleType.ROLE_APPLICATION,
  pk: Mcrypto.types.KeyType.ED25519,
  hash: Mcrypto.types.HashType.SHA3,
});

if (env.chainHost) {
  ForgeSDK.connect(env.chainHost, { chainId: env.chainId, name: env.chainId, default: true });
  console.log('Connected to chainHost', env.chainHost);
  if (env.assetChainHost) {
    ForgeSDK.connect(env.assetChainHost, { chainId: env.assetChainId, name: env.assetChainId });
    console.log('Connected to assetChainHost', env.assetChainHost);
  }
}

const wallet = fromSecretKey(process.env.APP_SK, type).toJSON();

const walletAuth = new WalletAuthenticator({
  wallet,
  baseUrl: env.baseUrl,
  appInfo: {
    name: env.appName,
    description: env.appDescription,
    icon: 'https://releases.arcblockio.cn/playground.png',
  },
  chainInfo: {
    host: env.chainHost,
    id: env.chainId,
  },
});

const tokenStorage = new TokenMongoStorage({ url: process.env.MONGO_URI });
const swapStorage = new SwapMongoStorage({ url: process.env.MONGO_URI });

const walletHandlers = new WalletHandlers({
  authenticator: walletAuth,
  tokenStorage,
});

const swapHandlers = new SwapHandlers({
  authenticator: walletAuth,
  tokenStorage,
  swapStorage,
  offerChainId: env.chainId,
  offerChainHost: env.chainHost,
  demandChainId: env.assetChainId,
  demandChainHost: env.assetChainHost,
});

module.exports = {
  tokenStorage,
  swapStorage,

  walletHandlers,
  swapHandlers,

  wallet,
};
```

#### 定义原子互换的回调

接下来在 `api/routes/auth/swap.js` 中定义原子互换的回调，回调里面有两个关键点：

- `claims` 里面说明我们是要做 swap，然后在回调里面指定我们要用应用链上 5 个通证换资产链上的 1 个通证
- `onAuth` 指用户钱包 SetupSwap 并且提交完 Swap 地址时的回调

```javascript
const ForgeSDK = require('@arcblock/forge-sdk');
const env = require('../../libs/env');
const { swapStorage, wallet } = require('../../libs/auth');

module.exports = {
  action: 'swap',
  claims: {
    swap: async ({ userDid, extraParams: { traceId } }) => {
      try {
        const payload = {
          offerAssets: [],
          offerToken: (await ForgeSDK.fromTokenToUnit(5, { conn: env.chainId })).toString(),
          offerUserAddress: wallet.address,
          demandAssets: [],
          demandToken: (await ForgeSDK.fromTokenToUnit(1, { conn: env.assetChainId })).toString(),
          demandUserAddress: userDid,
          demandLocktime: await ForgeSDK.toLocktime(2400, { conn: env.assetChainId }),
        };

        const res = await swapStorage.finalize(traceId, payload);
        console.log('swap.finalize', res);
        const swap = await swapStorage.read(traceId);

        return {
          swapId: traceId,
          receiver: wallet.address,
          ...swap,
        };
      } catch (err) {
        console.error(err);
        throw new Error('换币失败，请重试');
      }
    },
  },

  onAuth: async ({ claims, userDid, token }) => {
    return {};
  },
};
```

#### 挂载原子互换中间件

接下来在 `api/functions/app.js` 中改动如下。

```javascript
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const compression = require('compression');
const ForgeSDK = require('@arcblock/forge-sdk');

const { decode } = require('../libs/jwt');
const { swapHandlers, wallet } = require('../libs/auth');

const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.MONGO_URI) {
  throw new Error('Cannot start application without process.env.MONGO_URI');
}

// Connect to database
let isConnectedBefore = false;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('disconnected', () => {
  console.log('Lost MongoDB connection...');
  if (!isConnectedBefore) {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, autoReconnect: true });
  }
});
mongoose.connection.on('connected', () => {
  isConnectedBefore = true;
  console.log('Connection established to MongoDB');
});

const server = express();
server.use(cookieParser());
server.use(bodyParser.json({ limit: '1 mb' }));
server.use(bodyParser.urlencoded({ extended: true, limit: '1 mb' }));
server.use(cors());

const router = express.Router();

swapHandlers.attach(Object.assign({ app: router }, require('../routes/auth/swap')));

require('../routes/session').init(router);
require('../routes/orders').init(router);

server.use(router);

exports.server = server;
```

调用完 `swapHandlers.attach` 之后，服务器上就有了下面几个接口：

- `POST /api/swap`：生成空的订单，会返回订单 ID
- `GET /api/did/swap/token`：生成原子互换的会话，
- `GET /api/did/swap/status`：获取会话状态
- `GET /api/did/swap/auth`：方便钱包获取原子互换参数
- `POST /api/did/swap/auth`：方便钱包在 SetupSwap 之后提交 Swap 地址
- `GET /api/did/swap/retrieve`：方便钱包启动 RetrieveSwap 流程
- `POST /api/did/swap/retrieve`：方便钱包获取网店 SetupSwap 的地址

#### 前端触发原子互换

这个步骤用到的关键组件是 `@arcblock/did-react/lib/Auth`。

```javascript
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useToggle from 'react-use/lib/useToggle';

import Auth from '@arcblock/did-react/lib/Auth';
import Button from '@arcblock/ux/lib/Button';

import api from '../../libs/api';

export default function SwapButton({ token, assetToken }) {
  const [isOpen, setOpen] = useToggle(false);
  const [traceId, setTraceId] = useState();

  const onStartSwap = async () => {
    const res = await api.post('/api/swap', {});
    if (res.data.traceId) {
      setTraceId(res.data.traceId);
      setOpen(true);
    } else {
      window.alert('Cannot create swap');
    }
  };

  return (
    <React.Fragment>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className="action"
        onClick={onStartSwap}>
        Swap 1 {assetToken.symbol} for 5 {token.symbol}
      </Button>
      {isOpen && !!traceId && (
        <Auth
          responsive
          action="swap"
          extraParams={{ traceId }}
          checkFn={api.get}
          checkTimeout={5 * 60 * 1000}
          onClose={() => setOpen(false)}
          onSuccess={() => window.location.reload()}
          messages={{
            title: 'Swap Required',
            scan: `Swap 1 ${assetToken.symbol} for 5 ${token.symbol}`,
            confirm: 'Confirm swap on your ABT Wallet',
            success: 'You have successfully paid!',
          }}
        />
      )}
    </React.Fragment>
  );
}

SwapButton.propTypes = {
  token: PropTypes.object.isRequired,
  assetToken: PropTypes.object.isRequired,
};
```

#### 服务端支持获取订单列表

在 `api/routes/orders.js` 中：

```javascript
const ForgeSDK = require('@arcblock/forge-sdk');
const sortBy = require('lodash/sortBy');
const { swapStorage } = require('../libs/auth');
const { getTokenInfo } = require('../libs/util');
const env = require('../libs/env');

module.exports = {
  init(app) {
    app.get('/api/orders', async (req, res) => {
      if (req.user) {
        const [{ info: appChainInfo }, { info: assetChainInfo }] = await Promise.all([
          ForgeSDK.getChainInfo({ conn: env.chainId }),
          ForgeSDK.getChainInfo({ conn: env.assetChainId }),
        ]);
        const { appToken, assetToken } = await getTokenInfo();
        let orders = await swapStorage.listByDemandAddress(req.user.did);

        // Mark orders as expired
        orders = orders.map(x => {
          if (
            (x.demandLocktime && x.demandLocktime <= assetChainInfo.blockHeight) ||
            (x.offerLocktime && x.offerLocktime <= appChainInfo.blockHeight)
          ) {
            x.status = 'expired';
          }

          return x;
        });

        res.json({
          user: req.user,
          orders: sortBy(orders, x => x.updatedAt).reverse(),
          appToken,
          assetToken,
        });
      } else {
        res.json([]);
      }
    });
  },
};
```

## 基于 Forge Swap 实现

> TODO
