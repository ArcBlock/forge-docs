---
title: 'What is Multisig?'
description: 'What is Multisig?'
keywords: ''
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'arch'
  - 'multisig'
---

In most of the blockchain implementation, only sender is required to sign the transaction. With the sender's signature, we would trust that the operation is authorized by the sender. Transactions like [Transfer](../../../reference/txs/trade/transfer) is typical example that sender would send some tokens / assets to the receiver (without receiver's permission). In real world, a vast use cases require authorization among all parties in the transaction. For example, Alice would give Bob 20 ABT to get a conference ticket Bob owned. In this transaction, Alice is actually requesting an exchange between her 20 ABTs and Bob's ticket. Bob must authorize this operation to make the transaction valid. So this is the basic use case for Multisig.

In Forge, transaction protocols can decide if they'd enable multisig or not. If multisig is enabled, then the involved parties must sign the tx in order, with the multisig structure:

```proto
message Multisig {
  // signer address
  string signer = 1;
  // public key for signer
  bytes pk = 2;
  // signature
  bytes signature = 3;

  // extra data
  google.protobuf.Any data = 15;
}
```

Multisig is used in transaction structure:

```
message Transaction {
  string from = 1;
  uint64 nonce = 2;

  // use DID for the chain. "did:" prefix is omitted
  string chain_id = 3;
  // public key of the sender
  bytes pk = 4;

  // signature of the transaction
  bytes signature = 13;
  // we will support multiple signatures in case of certain tx need multiple
  // parties' signature.

  repeated Multisig signatures = 14;

  google.protobuf.Any itx = 15;
}
```

Normally `data` is not required in Multisig. A signer need to fill in `signer` address, signer `pk`, and attach the signature in the beginning of the `signatures` array in transaction data structure. Then sign the whole transaction, and then add the generated signature into the `signature` of this multisig.

Let's use [Exchange](../../../reference/txs/trade/exchange) transaction to illustrate the above example:

Since Alice initiated the transaction, she's sender, Bob's receiver. The sender will always add the signature into `signature` field, and the receiver (or more parties) will do the multisig thereafter.

### Step 1: Alice crate an Exchange ITX

Alice will fill in an Exchange itx:

```elixir
%ForgeAbi.ExchangeTx{
  receiver: %ForgeAbi.ExchangeInfo{
    assets: ["zjdzwEM42m3GT5nLRPvwGzmLCv8EofxMfy4e"],
    value: nil
  },
  sender: %ForgeAbi.ExchangeInfo{
    assets: [],
    value: %ForgeAbi.BigUint{value: <<2, 198, 138, 240, 187, 20, 0, 0>>}
  },
  to: "z11PsZYbZWBqBDB3WPhCCu2r6G4zuxrLRsFy"
}
```

And then put it into a transaction with signature (you need to encode this itx to a Google.Protobuf.Any with type_url `fg:t:exchange`):

```elixir
%ForgeAbi.Transaction{
  chain_id: "forge",
  from: "z11CSMrHjLnk4QFtFp9zNhKJe2vNBDeFB5cR",
  itx: %Google.Protobuf.Any{
    type_url: "fg:t:exchange",
    value: <<10, 36, 122, 49, 49, 80, 115, 90, 89, 98, 90, 87, 66, 113, 66, 68,
      66, 51, 87, 80, 104, 67, 67, 117, 50, 114, 54, 71, 52, 122, 117, 120, 114,
      76, 82, 115, 70, 121, 18, 12, 10, 10, 10, 8, 2, ...>>
  },
  nonce: 124,
  pk: <<245, 235, 0, 135, 189, 169, 233, 188, 28, 12, 204, 254, 237, 11, 99,
    159, 185, 150, 174, 128, 110, 183, 127, 115, 21, 195, 18, 37, 176, 134, 165,
    71>>,
  signature: <<23, 89, 219, 32, 220, 205, 80, 109, 105, 90, 98, 0, 39, 118, 89,
    246, 87, 167, 247, 201, 241, 217, 224, 19, 217, 210, 211, 206, 116, 216,
    159, 122, 147, 67, 44, 135, 61, 253, 88, 234, 145, 222, 119, 236, ...>>,
  signatures: []
}
```

Then deliver this tx to Bob with any off-chain approach. E.g. send by email or send a message with ABT wallet. Once Bob get this tx he can generate a Multisig as described above and attached to the tx:

```elixir
%ForgeAbi.Transaction{
  chain_id: "forge",
  from: "z11CSMrHjLnk4QFtFp9zNhKJe2vNBDeFB5cR",
  itx: %Google.Protobuf.Any{
    type_url: "fg:t:exchange",
    value: <<10, 36, 122, 49, 49, 80, 115, 90, 89, 98, 90, 87, 66, 113, 66, 68,
      66, 51, 87, 80, 104, 67, 67, 117, 50, 114, 54, 71, 52, 122, 117, 120, 114,
      76, 82, 115, 70, 121, 18, 12, 10, 10, 10, 8, 2, ...>>
  },
  nonce: 124,
  pk: <<245, 235, 0, 135, 189, 169, 233, 188, 28, 12, 204, 254, 237, 11, 99,
    159, 185, 150, 174, 128, 110, 183, 127, 115, 21, 195, 18, 37, 176, 134, 165,
    71>>,
  signature: <<23, 89, 219, 32, 220, 205, 80, 109, 105, 90, 98, 0, 39, 118, 89,
    246, 87, 167, 247, 201, 241, 217, 224, 19, 217, 210, 211, 206, 116, 216,
    159, 122, 147, 67, 44, 135, 61, 253, 88, 234, 145, 222, 119, 236, ...>>,
  signatures: [
    %ForgeAbi.Multisig{
      data: nil,
      pk: <<245, 235, 0, 135, 189, 169, 233, 188, 28, 12, 204, 254, 237, 11, 99,
        159, 185, 150, 174, 128, 110, 183, 127, 115, 21, 195, 18, 37, 176, 134,
        165, 71>>,
      signature: <<207, 191, 238, 169, 227, 110, 34, 218, 191, 63, 143, 190,
        236, 76, 145, 239, 143, 35, 212, 217, 7, 116, 198, 12, 58, 63, 102, 173,
        241, 154, 81, 128, 185, 144, 42, 67, 69, 187, 202, ...>>,
      signer: "z11CSMrHjLnk4QFtFp9zNhKJe2vNBDeFB5cR"
    }
  ]
}
```

Then Bob can deliver this tx to the chain. And since both parties signed the tx, it will be executed.
