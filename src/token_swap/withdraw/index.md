---
title: How to swap to ERC20 ABT
description: How to swap from native ABT to ERC20 ABT
keywords: token swap
robots: 'index,follow'
category: docs
layout: documentation
tags:
  - token swap
---

### 1. Login token swap service

![](../imgs/login_system.png)

After login, a native ABT account will be generated in the ABT wallet, and this account will always be displayed on the top.

![](../imgs/native_abt_account.png)

### 2. Open `ArcBlock->Ethereum` Page

![](../imgs/enter_withdraw.png)

### 3. Fill the form

1.  Enter recipient address, must be valid ETH address, if you enter the wrong address, your token will be lost.
2.  Enter the number of swapping
3.  Click "Submit" to generate the authentication QR code
4.  Open your ABT wallet, scan the QR code, and complete the signature verification

![](../imgs/withdraw_action.png)

Token Swap supports saving recipient to the whitelist, which is convenient for users to initiate a swapping next time:

3.1  Adding address to whitelist

![](../imgs/save_whitelist.png)

3.2  Using whitelist

![](../imgs/use_whitelist.png)

### 4. Track swapping progress

![](../imgs/withdraw_history.png)

### Swapping out limitations

When the user has a swapping-out in progress, the system does not allow the user to make a new swapping out. You will see the following prompt:

![](../imgs/withdraw_limit.png)

## Revoke swapping

Before the swapping is done, user can cancel it, here are the steps to cancel:

### 1. Open swapping detail page

![](../imgs/start_cancel_withdraw.png)

### 2. Open cancel swapping page

![](../imgs/cancel_withdraw.png)

### 3. Track cancellation progress

![](../imgs/cancel_withdraw_success.png)
