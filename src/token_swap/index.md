---
title: Token Swap FAQ
description: "In order to use the Token Swap more smoothly, you need to know these"
keywords: token swap
robots: "index,follow"
category: docs
layout: documentation
tags:
  - token swap
---

## What is Token Swap?

Token Swap Service is a two-way anchor swap service for heterogeneous chain tokens developed by ArcBlock. The current service realizes the swap of ABT asset chain native currency and Ethereum ERC20 ABT. In the future, this service can be provided to other Customers in need support other types of ERC20 tokens and token swaps on blockchains based on the ArcBlock Forge Framework.

Below we refer to the conversion of ERC20 to native currency as swap-in, and the conversion of native currency to ERC20 is called swap-out. If the image shows:

- Swap in: `Ethereum → ArcBlock`
- Swap out: `ArcBlock → Ethereum`

## Why do I need to swap tokens?

It can be considered that ABT tokens can exist on the ABT asset chain or Ethereum chain, and can be transferred according to the needs of users.

The main design goal of the ArcBlock system is application, so the tokens on the ABT chain can be fully used in the application ecology of various ArcBlock platforms. Although the original meaning of Ethereum's design is also the same, it has not been easy to develop applications due to performance issues. .

However, as a popular public chain, Ethereum has advantages in asset security and universal access. Therefore, we bridge the two ecosystems through Token Swaps to allow developers and users to obtain the greatest degree of convenience and advantages.

## Is my asset more secure by swapping to native ABT?

If you used to use a decentralized wallet to store ERC20 ABT instead of escrow on the swap, the asset security of native ABT and ERC20 asset security are theoretically the same. If you are just looking at asset security, we do n’t recommend you swap.

## How to swap to native ABT?

We have prepared step-by-step reference documents for you: [Transfer to operating instructions](./deposit)

## How to swap out for ERC20 ABT?

We have prepared step-by-step reference documents for you: [Transfer out operating instructions](./withdraw)

## How to swap in the given address is an Ethereum address? What happens if I transfer into ETH or other ERC20 assets?

The given address is a normal Ethereum address. You can use Etherscan or other block browsers to check its status.

Keep in mind that this address is only used to accept ERC20 ABT for Token Swaps. Do not transfer ETH or other ERC20 assets. Any non-ABT asset transfer will have no effect and cannot be recovered.

## Why is there a time delay in swapping in?

The swap operation is that the user transfers the ERC20 account to the account designated by the Token Swap. After the transaction is confirmed, the user will be given a corresponding number of native ABTs on the asset chain. Among them, the Token Swap waits for the transaction confirmation on Ethereum. It is time consuming, because the block production time of Ethereum is usually about 15 seconds, and the Token Swap needs to wait for 12 blocks to confirm to prevent a temporary fork in Ethereum, so there is usually a delay of several minutes for the swap operation. However, there may be longer delays when Ethereum is blocked and the network is busy.

Do n’t worry about delays or network failures, you wo n’t lose your ABT. If Ethereum fails or is severely delayed, your sending transaction will not be successful and therefore your ABT will still be in the original place; if Ethereum is successfully sent, your transaction records will remain on Ethereum, even if the Token Swap appears during this period Failures or network problems will also generate corresponding conversion actions based on transaction records on Ethereum.

## Why is there a delay in swapping out?

After the swap is initiated, the Token Swap will perform a stricter verification. After the verification is passed, ERC20 ABT will be transferred to the user on Ethereum, and there is a delay in Ethereum (the same reason as above). These steps They are all time consuming.

During the grayscale release, our verification delay may be longer (up to 24 hours), and we will gradually improve the system's automatic risk control capabilities to gradually reduce this delay to a few minutes.

Do n’t worry about delays or network failures, you wo n’t lose your ABT. During this period you can also cancel the swap if necessary.

## Why swap out ( `ArcBlock → Ethereum`) Is there a handling fee?

The swap operation requires Ethereum ERC20's smart contract to transfer money to the Ethereum address specified by the user. The transaction requires gas consumption. Secondly, this design is to prevent service abuse attacks. We do not consider it necessary for users to swap in and out frequently.

## What are the swap fee rules?

You need to bear the Ethereum handling fee when you swap, and the Token Swap will not generate any additional fees.

The swap operation fee rules are as follows:

- Charge commission at 0.1% of transfer amount
- Charge a minimum of 1 ABT for a single transfer and a maximum of 100 ABT

These fees belong to the ArcBlock Foundation and are used for the operating costs of the Token Swap. If the balance is generated, it will be used for ArcBlock application ecological rewards in the future. The ArcBlock Foundation reserves the right to adjust the proportion of this procedure at any time.

## Could the swap out be rejected? why?

In most cases, the swap will be processed as soon as possible, but the transaction that is determined to be suspicious by the service's security policy may be rejected. Users who are rejected to swap can cancel the swap themselves, and their assets are still stored in the asset chain. on.

## Can I cancel the swap operation?

Before the swap-out request enters the formal processing flow, the user can choose to cancel it by himself. Most of the processing fee will be refunded when canceling. Of course, in order to protect the service from being abused, canceling the swap-out will charge a very small fee.

## Is there a limit for swaps?

Since the swap operation is an ordinary Ethereum transfer operation, our system will not limit the amount.

We do not recommend swapping in more than the recommended amount, there will be a limit and a handling fee will be charged when swapping out.

## Why is there a limit for swapping out?

Currently in the grayscale release period, this limit will gradually increase until a state that the user does not perceive.

The security of user assets is the first in our design. When the Token Swap is initially launched, a clear single-day transfer limit will be set for the account. This single-day transfer limit will gradually be relaxed. The current limit strategy is:

## What should I do if I encounter a problem? How do I get help?

If you encounter problems in using the Token Swap, there are the following feedback channels:

- Feedback in the official community: [community.arcblockio.cn](https://community.arcblockio.cn)
- Raising work orders in Token Swaps: users in mainland China may be slow to access

Remember to post screenshots, transaction hashes, and other key information when you post a question.

## Why is my currency swap history empty?

This situation should rarely happen. If the Token Swap is being upgraded, the short currency swap history may appear empty because the front-end page cannot pull data. Don't panic at this time, usually you can recover in a few minutes. All currency swap operations are recorded on the Ethereum and ArcBlock asset chains.

## How do I view transactions on the chain?

All transactions related to native currency in the Token Swap are stored on the ArcBlock asset chain. In addition to viewing in the ABT wallet, you can also view it on our asset chain block browser:

- Global Website: [xenon.abtnetwork.io](https://xenon.abtnetwork.io/node/explorer/txs)
- Mainland Website: [xenon.network.arcblockio.cn](https://xenon.network.arcblockio.cn/node/explorer/txs)

## Website for the Token Swap?

- Global Website: [swap.abtnetwork.io](https://swap.abtnetwork.io)
- China Mainland Website: [swap.arcblockio.cn](https://swap.arcblockio.cn)

We are about to deploy more Token Swaps around the world.
