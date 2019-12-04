---
title: '基于 SDK 实现原子互换'
description: ''
keywords: 'forge, swap, cross-chain'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'atomic-swap'
  - 'usage'
---

不同语言的 Forge SDK 对原子互换的交易都提供了很好的封装，基于 SDK 实现原子互换也比较简单，注意这里实现的是纯代码层面的原子互换，因为交换的双方都是在代码里面生成的，现实世界中的原子交换可能发生在两个用户或者用户和应用之间，比如典型的 B2C 购买和 C2C 的购买。

## 用 JavaScript SDK 做原子交换

```javascript
const ForgeSDK = require('@arcblock/forge-sdk');
const { getRandomBytes, Hasher } = require('@arcblock/mcrypto');

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// Connect to 2 chains that are used to do atomic-swap
ForgeSDK.connect('http://localhost:8210/api', { name: 'offer-chain' });
ForgeSDK.connect('http://localhost:8211/api', { name: 'demand-chain' });

(async () => {
  try {
    const buyer = ForgeSDK.Wallet.fromRandom();
    const seller = ForgeSDK.Wallet.fromRandom();
    console.log({ buyer: buyer.toAddress(), seller: seller.toAddress() });

    const declare = async (wallet, moniker) => {
      let hash = await ForgeSDK.declare({ moniker, wallet }, { conn: 'offer-chain' });
      console.log(`declare.appChain.${moniker}`, hash);

      hash = await ForgeSDK.declare({ moniker, wallet }, { conn: 'demand-chain' });
      console.log(`declare.assetChain.${moniker}`, hash);
    };

    // declare
    await declare(buyer, 'buyer');
    await declare(seller, 'seller');

    // 3. ensure asset for seller on app chain
    const ensureSellerAsset = async () => {
      const [hash, address] = await ForgeSDK.createAsset(
        {
          moniker: 'asset',
          data: {
            typeUrl: 'json',
            value: {
              key: 'value2',
              sn: Math.random(),
            },
          },
          wallet: seller,
        },
        { conn: 'offer-chain' }
      );
      console.log('ensureSellerAsset', hash, address);
      return address;
    };

    // ensure token for buyer on asset chain
    const ensureBuyerToken = async () => {
      const hash = await ForgeSDK.checkin({ wallet: buyer }, { conn: 'demand-chain' });
      console.log('ensureSellerAsset', hash);
    };

    // setup swap on asset chain
    const doBuyerSetup = async (asset, hashlock) => {
      const hash = await ForgeSDK.setupSwap(
        {
          token: 10,
          assets: [],
          receiver: seller.toAddress(),
          hashlock,
          wallet: buyer,
        },
        { conn: 'demand-chain' }
      );
      console.log('doBuyerSetup', hash);
      return hash;
    };

    // setup swap on app chain
    const doSellerSetup = async (asset, hashlock) => {
      const hash = await ForgeSDK.setupSwap(
        {
          token: 0,
          assets: [asset],
          receiver: buyer.toAddress(),
          hashlock,
          wallet: seller,
        },
        { conn: 'offer-chain' }
      );
      console.log('doSellerSetup', hash);
      return hash;
    };

    // retrieve swap on app chain
    const doBuyerRetrieve = async (address, hashkey) => {
      const hash = await ForgeSDK.retrieveSwap(
        {
          address,
          hashkey,
          wallet: buyer,
        },
        { conn: 'offer-chain' }
      );
      console.log('doBuyerRetrieve', hash);
    };

    // retrieve swap on asset chain
    const doSellerRetrieve = async (address, hashkey) => {
      const hash = await ForgeSDK.retrieveSwap(
        {
          address,
          hashkey,
          wallet: seller,
        },
        { conn: 'demand-chain' }
      );
      console.log('doSellerRetrieve', hash);
    };

    // token and asset
    const asset = await ensureSellerAsset();
    console.log('asset', asset);
    await ensureBuyerToken();
    await sleep(3000);

    // Setup swap by buyer
    const hashkey = getRandomBytes(32);
    const hashlock = Hasher.SHA3.hash256(hashkey);
    const [buyerSetupHash, buyerSwapAddress] = await doBuyerSetup(asset, hashlock);
    const [sellerSetupHash, sellerSwapAddress] = await doSellerSetup(asset, hashlock);
    console.log('setup', {
      hashkey,
      hashlock,
      buyerSetupHash,
      buyerSwapAddress,
      sellerSetupHash,
      sellerSwapAddress,
    });
    await sleep(3000);

    // Inspect swap
    const buyerSwapState = await ForgeSDK.getSwapState(
      { address: buyerSwapAddress },
      { conn: 'demand-chain' }
    );
    const sellerSwapState = await ForgeSDK.getSwapState(
      { address: sellerSwapAddress },
      { conn: 'offer-chain' }
    );
    console.log('buyerSwapState', buyerSwapState);
    console.log('sellerSwapState', sellerSwapState);

    await doBuyerRetrieve(sellerSwapAddress, hashkey);
    await doSellerRetrieve(buyerSwapAddress, hashkey);
  } catch (err) {
    console.error(err);
    console.log(JSON.stringify(err.errors));
  }
})();
```

## 用 Java SDK 做原子交换

> TODO

## 用 Python SDK 做原子交换

> TODO
