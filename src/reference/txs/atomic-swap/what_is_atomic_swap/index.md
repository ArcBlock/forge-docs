---
title: Basic principles of cross-chain homogeneous chain
description: >-
  What is isomorphic cross-chain? What are the difficulties and steps? How does
  it work in Forge?
keywords: "forge, swap, cross-chain"
robots: "index,follow"
category: docs
layout: documentation
tags:
  - atomic-swap
  - set_up
---

## What is cross-chain?

Cross-chain can be divided into many cases, for example, the founder of Ethereum classified it as: Portable assets, Atomic exchange ( `Atomic Swap`), Cross-chain oracles, Asset encumbrance, General cross-chain contracts.

In the discussion in this article, we divide it into two categories:

- Isomorphic chain cross-chain: Any two Forge chains are interchanged. Forge natively supports it and implements it in atomic swap mode, because this cross-chain method does not rely on middlemen
- Heterogeneous chain cross-chain: Forge and non-Forge chains are interchanged and need to run the Token Swap service for implementation, which is beyond the scope of this article.

## Basic elements

In real life, we can easily pack an apple from one basket to another, but in the blockchain world, we cannot move data from one chain to another.

**The problem of cross-chain is essentially no different from the traditional cross-database data transmission.**What we can do is only make one change to the data on one chain and then make some changes to the data on the other chain. The two changes need to meet a certain logical relationship.

Just like when transferring money across banks, ICBC doesn't send a money transporter to carry money to the Agricultural Bank of China. They just make some changes in their respective databases.

## Difficulties of cross-chain

**The difficulty of this problem is that the two data changes need to be atomic, that is, either the two changes are successful, or the two changes are unsuccessful. We do not allow only one successful situation to occur.**

In the traditional centralized database field, this problem is not difficult to solve, because we can easily decide whether to make changes to the second database based on the data changes in the first database, and it is easy to roll back the first database .

However, this is very difficult to achieve in the blockchain world, and the difficulty lies in this**"according to"** Two words.

For a chain, any data that cannot be obtained directly from the chain is called off-chain data. Suppose we have two chains, A and B. For chain A, the information on chain B cannot be directly obtained, so it is off-chain information. Conversely, for chain B, the information on chain A is also off-chain .

In the blockchain world, it is difficult to make corresponding judgments based on off-chain information, and the reason lies in the decentralization of off-chain information sources.

For all the information on the chain, all the nodes on the chain have reached a consensus, but how should we make all nodes reach a consensus on the information off the chain?

If we only use a single source of information, wouldn't it be against the purpose of decentralization? This single source of information will have complete control over the entire chain. But if we use multiple information sources, how can we get all the nodes of this chain to reach a consensus on these information sources at an acceptable price?

and so**The essence of cross-chain is to obtain off-chain information**The five situations that God V put forward are all a problem behind them, that is, to obtain off-chain information.

After discussing the elements and difficulties of cross-chain transactions, let's look at how the bottom should be designed and implemented. The method we use is called atomic swap, or atomic swap. Let's first look at its general process and some considerations in implementation. Finally, we will go back and see how it solves the cross-chain difficulties mentioned above.

## Hash lock and key

Before introducing atomic swap, let's introduce a concept: `Hash Lock` with `Hash Key` Or called hash lock and hash key.

One `Hash Lock` It's actually a hash of a random number, and the random number itself is the hash key.

Suppose we have a random number x, and then we perform a hash operation on it to get its hash value y, then we say y is `Hash Lock`And the corresponding one can be called x `Hash Key` Or a hash key. We can have the following formal representation: Hash (x) = y.

## Basic steps of cross-chain

Well, with this concept, let's talk about how to do atomic swap.

We assume the following scenario: Alice and Bob want to make a cross-chain transaction, and Alice is willing to use her 100 tokens on the A chain to buy an asset of Bob on the B chain, and the address of the asset is z123.

Then suppose that before the atomic exchange, the states of Alice and Bob are as follows: On the A chain, Alice has 100 tokens, and Bob has no tokens; on the B chain, Alice has no Asset, and Bob has an Asset.

Under this premise, let's look at the process of atomic swap:

**first step**, Initiated by Alice, Alice first generates a random number x as a hash key, and then generates a corresponding hash lock. Alice uses this hash lock to lock 100 tokens on the A chain. When locking, specify the following information:

1.  The number of tokens to be locked, in this case 100
2.  Who unlocked the person, in this case Bob
3.  Set a lock time. After this lock time, if Bob has not taken the token, Alice can unilaterally withdraw these tokens, but Alice cannot do so before the lock time
4.  Which hash lock is used

Once locked, the 100 tokens were removed from Alice's name, ensuring that she could no longer use those tokens.

The content of this Transaction is publicly visible on the A chain, so Bob can clearly know all the contents inside.

**Second step**When Bob determines that Alice has locked the token, he uses the same hash lock to lock the asset on the B chain. Similarly, when locking, he needs to specify:

1.  The asset address to be locked, in this case z123
2.  Who unlocked it, in this case Alice
3.  Set a lock time. After this lock time, if the asset has not been removed, Bob can unilaterally remove these assets, but Bob cannot do so before the lock time.
4.  Use the same lock as Alice

**third step**, Alice first unlocks the assets on the chain. When unlocking, Alice must provide a hash key. After the verification is passed, Alice can remove the locked assets.

**the fourth step**, Bob unlocks the token on the A chain. Since Alice has been unlocked on the B chain, the hash key has also been announced. At this time, Bob can easily know what the key is, so as to complete the unlock on the A chain and get the corresponding token.

According to the above process, Alice and Bob can successfully complete the atomic exchange, and the final state should be like this: On the A chain, 100 tokens are transferred from Alice's account to Bob's account; on the B chain, the asset from Bob's account was transferred to Alice's account.

However, there is another situation. In the third step, if Alice changes her mind, she decides not to take the assets on the B chain. If this is the case, then Alice will not leak the corresponding hash key, so Bob cannot obtain the token on the A chain. In this case, Alice and Bob only need to retrieve their locked tokens and assets after the lock time.

## Process summary

Let ’s summarize this process:

1.  First of all, the entire atomic exchange is implemented on the chain, and there is no third party participation from beginning to end, which is completely completed by Alice and Bob.
2.  Alice and Bob do not need to trust each other, because this mechanism guarantees the security of both parties' property. If Alice takes the asset, then Bob must know the hash key so he can take the token. If Alice doesn't take the asset, Bob can't learn the hash lock, so he can't take the token.
3.  Because of this feature, we named this method atomic swap. The whole transaction is atomic, and either the two parties can get what they want, or neither party can get it.
4.  Although Alice is the one who locks and unlocks first, this does not mean that Bob is in a passive situation. Before Bob locks the asset, he can first check the token that Alice has locked on the A chain. He needs to check whether the number of locked tokens is correct, whether the unlocker is him, and, very importantly, what is the lock time. Because after this lock time, Alice can unilaterally withdraw the token, so if the lock time is close to the current time, Bob may lose assets. So before Bob locks the asset, he should make sure that the lock time is within a reasonable range after the current time. For example, if the current block height is 10000, and the average block is 15 seconds, then a reasonable lock time may be 15760, which means that Alice can unilaterally withdraw the token after the 15760th block. This is roughly equivalent to one day.
5.  Further, when locking assets, Bob should also set a reasonable lock time, and this time should be less than the lock time set by Alice, for example, Bob can be set to 10240. We still assume an average block of 15 seconds, and the block height goes from 10000 to 10240, which takes about an hour, so this is equivalent to giving Alice only one hour to decide whether to take the asset. If Alice takes the asset, Bob has at least 23 hours to take the token.

The above is the general process of atomic swap. After having a general concept, let's take a look at how to implement it on Forge.

## Forge implementation

**The first step is locking**We designed and implemented [SetUpSwap](../set_up) This transaction allows the user to lock the token and assets.

In this transaction, the sender needs to fill in the Receiver address, `Hash Lock`, Locktime, and the number of tokens and asset addresses you want to lock.

When the chain node executes this transaction, it will verify whether the Locktime is greater than the current block height, and whether the sender holds the corresponding token and asset. If the conditions are not met, the transaction will fail.

When the transaction passes, Forge generates a SwapState. The address of this SwapState is generated based on the Transaction Hash.**Because Forge does not allow duplicate Transaction Hash, the address of SwapState will not be duplicated.**。

This also guarantees that each SwapState is independent and does not affect each other.

SwapState itself does not belong to any account, it only operates according to the rules of atomic swap. when [SetUpSwap](../set_up) After being chained, the corresponding information will be recorded on SwapState, such as Sender address, Receiver address, Locktime, Hashlock, Token and Asset addresses. Tokens and Assets are transferred from Sender, which ensures that the sender can no longer change these Tokens and Assets.

**The second step is to unlock**, The corresponding Transaction is [RetrieveSwap](../retrieve). In this Transaction, we need to fill in the address of the SwapState we want to retrieve and the corresponding Hashkey.

When the chain node executes this transaction, it will verify that the address of the Receiver in SwapState and the address of the sender of this Transaction are consistent, whether the Hashkey matches Hashlock, and whether there are still Tokens or Assets in SwapState.

When the conditions are met and the transaction is passed, the Hashkey is written to SwapState for everyone to review. The tokens and assets in SwapState will be transferred to the corresponding accounts. If you want to terminate the transaction midway, you need to withdraw the locked token or assets. we use [RevokeSwap](../revoke) To achieve this step.

In this Transaction, we only need to fill in the address of SwapState.

Forge validates SetUpSwap and [RevokeSwap](../revoke) Whether the sender is the same person. It will also verify whether the current block height has exceeded the Locktime recorded in SwapState, and whether there are still tokens and assets in SwapState.

If the Transaction is successfully executed, the token and assets in SwapState will be transferred to the Transaction sender to achieve the effect of withdrawal.

There are many details to think about throughout the design and implementation.

First, the most important factor in the entire atomic exchange is the hash key, so the protection of the hash key is the first point we consider. In specific implementation, we have made a change compared to other Transaction on Forge. That is, when a Forge node is verifying a RetrieveSwap, if the Transaction fails, it will not be recorded on the chain, and it will not be broadcast to other nodes. This minimizes the exposure of the Hashkey in RetrieveSwap.

Of course, even if this Transaction is not written on the chain and is not broadcast, it is still verified by at least one node. If this node itself is a malicious node, then it is entirely possible to record the Hashkey. So in order to avoid this situation, it is very important to set Locktime reasonably. Because before Locktime, only the corresponding Receiver was allowed to transfer away the token and assets in SwapState. Then Receiver should use this time to troubleshoot the cause of failure and keep retrying.

In practice, the cause of failure may be a network problem or insufficient gas. For this reason, we have also made corresponding optimizations in the wallet. The wallet will compare the current block height and Locktime before the user sends RetrieveSwap. If the two are too close, the wallet will prompt accordingly.

The second potential security factor is the size of the hashkey. In SetUpSwap Transaction, we only include the value of Hashlock. Since the value is a hash value, the size is fixed. But we don't know the size of Hashkey, Hashkey can be any value. In some extreme cases, a particularly large Hashkey can cause unilateral ReceivSwap Transaction validation to fail. So we limit the size of the Hashkey to 64 bytes.
