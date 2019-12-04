---
title: Atomic swap based on SDK
description: ""
keywords: "forge, swap, cross-chain"
robots: "index,follow"
category: docs
layout: documentation
tags:
  - atomic-swap
  - usage
---

Forge SDKs in different languages provide a good package for atomic swap transactions. It is also relatively simple to implement atomic swaps based on the SDK. Note that the atomic swaps at the pure code level are implemented here because both sides of the exchange are in the code. The atomic swaps generated in the real world may occur between two users or users and applications, such as typical B2C purchases and C2C purchases.

## Atomic swap with JavaScript SDK

```javascript
const ForgeSDK = require("@arcblock/forge-sdk");
const { getRandomBytes, Hasher } = require("@arcblock/mcrypto");

const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

// Connect to 2 chains that are used to do atomic-swap
ForgeSDK.connect("http://localhost:8210/api", { name: "offer-chain" });
ForgeSDK.connect("http://localhost:8211/api", { name: "demand-chain" });

(async () => {
  try {
    const buyer = ForgeSDK.Wallet.fromRandom();
    const seller = ForgeSDK.Wallet.fromRandom();
    console.log({ buyer: buyer.toAddress(), seller: seller.toAddress() });

    const declare = async (wallet, moniker) => {
      let hash = await ForgeSDK.declare(
        { moniker, wallet },
        { conn: "offer-chain" }
      );
      console.log(`declare.appChain.${moniker}`, hash);

      hash = await ForgeSDK.declare(
        { moniker, wallet },
        { conn: "demand-chain" }
      );
      console.log(`declare.assetChain.${moniker}`, hash);
    };

    // declare
    await declare(buyer, "buyer");
    await declare(seller, "seller");

    // 3. ensure asset for seller on app chain
    const ensureSellerAsset = async () => {
      const [hash, address] = await ForgeSDK.createAsset(
        {
          moniker: "asset",
          data: {
            typeUrl: "json",
            value: {
              key: "value2",
              sn: Math.random()
            }
          },
          wallet: seller
        },
        { conn: "offer-chain" }
      );
      console.log("ensureSellerAsset", hash, address);
      return address;
    };

    // ensure token for buyer on asset chain
    const ensureBuyerToken = async () => {
      const hash = await ForgeSDK.checkin(
        { wallet: buyer },
        { conn: "demand-chain" }
      );
      console.log("ensureSellerAsset", hash);
    };

    // setup swap on asset chain
    const doBuyerSetup = async (asset, hashlock) => {
      const hash = await ForgeSDK.setupSwap(
        {
          token: 10,
          assets: [],
          receiver: seller.toAddress(),
          hashlock,
          wallet: buyer
        },
        { conn: "demand-chain" }
      );
      console.log("doBuyerSetup", hash);
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
          wallet: seller
        },
        { conn: "offer-chain" }
      );
      console.log("doSellerSetup", hash);
      return hash;
    };

    // retrieve swap on app chain
    const doBuyerRetrieve = async (address, hashkey) => {
      const hash = await ForgeSDK.retrieveSwap(
        {
          address,
          hashkey,
          wallet: buyer
        },
        { conn: "offer-chain" }
      );
      console.log("doBuyerRetrieve", hash);
    };

    // retrieve swap on asset chain
    const doSellerRetrieve = async (address, hashkey) => {
      const hash = await ForgeSDK.retrieveSwap(
        {
          address,
          hashkey,
          wallet: seller
        },
        { conn: "demand-chain" }
      );
      console.log("doSellerRetrieve", hash);
    };

    // token and asset
    const asset = await ensureSellerAsset();
    console.log("asset", asset);
    await ensureBuyerToken();
    await sleep(3000);

    // Setup swap by buyer
    const hashkey = getRandomBytes(32);
    const hashlock = Hasher.SHA3.hash256(hashkey);
    const [buyerSetupHash, buyerSwapAddress] = await doBuyerSetup(
      asset,
      hashlock
    );
    const [sellerSetupHash, sellerSwapAddress] = await doSellerSetup(
      asset,
      hashlock
    );
    console.log("setup", {
      hashkey,
      hashlock,
      buyerSetupHash,
      buyerSwapAddress,
      sellerSetupHash,
      sellerSwapAddress
    });
    await sleep(3000);

    // Inspect swap
    const buyerSwapState = await ForgeSDK.getSwapState(
      { address: buyerSwapAddress },
      { conn: "demand-chain" }
    );
    const sellerSwapState = await ForgeSDK.getSwapState(
      { address: sellerSwapAddress },
      { conn: "offer-chain" }
    );
    console.log("buyerSwapState", buyerSwapState);
    console.log("sellerSwapState", sellerSwapState);

    await doBuyerRetrieve(sellerSwapAddress, hashkey);
    await doSellerRetrieve(buyerSwapAddress, hashkey);
  } catch (err) {
    console.error(err);
    console.log(JSON.stringify(err.errors));
  }
})();
```

## Atomic swap with Java SDK

> EVERYTHING

## Atomic swap with Python SDK

> EVERYTHING
