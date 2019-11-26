---
title: 'What is Atomic Swap'
description: 'Set Up Swap Transaction'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'atomic-swap'
  - 'set_up'
---

## Overview

Atomic swap is a technology to do trading across two chains.

## Steps

1. Alice sets up a swap with a hashlock for Bob on chain A.
2. Bob sets up a swap with the same hashlock for Alice on chain B.
3. Alice retrieves the swap on chain B by revealing the hashkey.
4. Bob retrieves the swap on chain A by using the same hashkey.

Alternatively, if Alice wants to cancel this swap before step 3, she can revoke the swap state and then Bob will notice the cancellation and he can revokes his swap as well.
