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

The main design goal of the ArcBlock system is the application, so they pass on the ABT chain is fully utilized in the application ecosystem of various ArcBlock platforms, and while Ethereum’s design is the same, it has not been easy to develop applications due to performance issues.

But Ethereum, as a popular public chain, has advantages in terms of asset security, universal access, and so on, so we have bridged (enabled interoperability) the two ecosystems through currency exchange services, giving developers and users maximum convenience and advantages.

## Is swapping to Native ABT more secure?  

If you used to use a decentralized wallet to save ERC20 ABT instead of being managed on an exchange, then the security of the native ABT is theoretically the same as the asset security of the ERC20.

## How to swap your ERC tokens (Swap In) to native ABT tokens? 

We have prepared step-by-step reference documents for you: [Transfer to operating instructions](./deposit)

## How to swap out for ERC20 ABT tokens?

We have prepared step-by-step reference documents for you: [Transfer out operating instructions](./withdraw)

## How to swap using an Ethereum address? What happens if I transfer into ETH or other ERC20 assets?

The given address is a normal Ethereum address. You can use Etherscan or other block browsers to check  and verify its status.

Keep in mind that this address is only used to accept ERC20 ABT for Token Swaps. Do not transfer ETH or other ERC20 assets. Any non-ABT asset transfer will have no effect and cannot be recovered.

## Why is there a time delay in swapping in?

The swap operation is the user to transfer the ERC20 account to the account designated by the currency exchange service, and after the transaction is confirmed, the corresponding number of native ABT Tokens will be given to the user and are based on the asset chain.

When swapping, the currency exchange service waits for the transaction confirmation on Ethereum, which can be slow as the Ethereum’s network has a block time of around 15 seconds. The currency exchange service needs to wait for 12 Blocks to confirm that temporary forks are prevented from occurring in Ethereum, so there is usually a delay in the swap operation that can be as short as a few minutes, but longer depending on the size and available network capacity.

Don’t worry about latency or network failures, your ABT won’t be lost. If Ethereum fails or is severely delayed, your send transaction will not succeed so your ABT will remain in place, and if Ethereum sends your transaction successfully it will remain on Ethereum even if the currency exchange service fails or network issues will generate a corresponding conversion action based on the transaction on Ethereum during this period.

## Why is there a delay in swapping out?

After logging in to the swap service, the currency exchange requires stringent verification. Our verification delay could be as long as 24 hours during the initial launch period of the swap service, and we will gradually reduce the delay in the future.

Just as a reminder, don’t worry about latency or network failures, your ABT won’t be lost. During this period you can always cancel the currency exchange if necessary.

## Why is there a fee for swapping out  (`ArcBlock → Ethereum`)?

The swap operation requires Ethereum ERC20's smart contract to transfer money to the Ethereum address specified by the user. The transaction requires gas consumption. Secondly, this design is to prevent service abuse attacks. We do not consider it necessary for users to swap in and out frequently.

## Are there any swap fees for Swapping Out?

Yes, there is an Ethereum handling fee when you swap, however the Token Swap itself will not generate any additional fees.

The swap operation fee rules are as follows:

- Charge commission at 0.1% of transfer amount
- Charge a minimum of 1 ABT for a single transfer and a maximum of 100 ABT

These fees belong to the ArcBlock Foundation and are used for the operating costs of the swap service. The ArcBlock Foundation reserves the right to adjust the proportions of this procedure at any time.

## Could the swap out be rejected? why?

In the vast majority of cases, swaps are processed as quickly as possible, but transactions that are determined to not meet the predetermined criteria, or suspicious may be rejected, and users who are rejected can cancel their own swaps, and their assets are maintained on the asset chain.

## Can I cancel the swap operation?

Before the swap request is processed, the user can choose to cancel the action and the cancellation will also return the vast majority of the handling fee. It should be noted that in order to protect the swap service from abuse, there will be a fee for any cancellations.

## Are there any swap limits?

Since the swap operation is an ordinary Ethereum transfer operation, our system will not limit the amount.

We do not recommend swapping in more than the recommended amount, there will be a limit and a handling fee will be charged when swapping out.

## Why is there a limit for swapping out?

During the launch phase, we will implement limitations on swap activities and will increase those limits as needed in the future.
User security is a priority, the swap service will use a one-day transfer limit for each account.

## What should I do if I encounter a problem? How do I get help?

If you encounter any problems using the Token Swap Service you can reach our team directly by visiting: 

- Feedback in the official community: [community.arcblockio.cn](https://community.arcblockio.cn)

Remember to post screenshots, transaction hashes, and other key information when you post a question.

## Why is my currency swap history empty?

If you encounter changes in the service or history it may be due to a system upgrade. During those times, there may be a short period when history may not be reflected. However, there is no need to panic if this occurs. The system will recover in a few minutes, and all currency change operations in Ethereum and ArcBlock asset chain are recorded.

## How do I view transactions on the chain?

All transactions related to native currency in the Token Swap are stored on the ArcBlock asset chain. In addition to viewing in the ABT wallet, you can also view it on our asset chain block browser:

- Global Website: [xenon.abtnetwork.io](https://xenon.abtnetwork.io/node/explorer/txs)
- Mainland Website: [xenon.network.arcblockio.cn](https://xenon.network.arcblockio.cn/node/explorer/txs)

## Website for the Token Swap?

- Global Website: [swap.abtnetwork.io](https://swap.abtnetwork.io)
- China Mainland Website: [swap.arcblockio.cn](https://swap.arcblockio.cn)

We will be deploying additional token swap locations in the near future. 
