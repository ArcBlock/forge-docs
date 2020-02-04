---
title: 'mcrypto：Forge 加密算法基石'
description: '详细讲述 mcrypto 的内部实现'
keywords: 'mcrypto'
robots: 'index,follow'
category: 'docs'
layout: 'documentation'
tags:
  - 'mcrypto'
---

mcrypto 封装了三个 protocol 及其实现：

- Crypter：对称加密算法。目前只实现了 AES 加密，未来可以考虑添加 chachapoly。
- Hasher：哈希算法。实现了 Sha2 / Sha3 / keccak / Blake2b，支持 224，256，384，512 等几种哈希长度。其中，如果做 Sha2，借鉴 bitcoin 实现，我们会自动为 Sha2 做 double hash（default round is 2）。在 forge 中，默认我们使用 sha3。注意：从性能考虑，未来我们也许可以把钱包的 hash 算法缺省值使用 blake2b，甚至未来可以支持 Blake3 来获得更高的性能（见：[elixir blake 3 支持](https://github.com/Thomas-Jean/blake3)）。blake2 / blake3 安全性和 sha3 在一个级别，但 sha3 是 NIST 标准。
- Signer：数字签名算法。实现了 ed25519 和 secp256k1。forge 默认使用 ed25519。ed25519 比 secp256k1 更安全，签名和验证效率更高。注意我们并没有实现 NIST 标准被 P256，P384 等 ECDSA 算法。secp256k1 是 P256 的一个变种（区别可以参考这篇文章：[A tale of two elliptic curves](https://www.johndcook.com/blog/2018/08/21/a-tale-of-two-elliptic-curves/)）。如果我们要成为美国政府的供应商，需要提供 P256 / P384 的支持。

注，hash 算法的性能对比，来自 [blake3](https://github.com/BLAKE3-team/BLAKE3)：

![](https://raw.githubusercontent.com/BLAKE3-team/BLAKE3/master/media/speed.svg?sanitize=true)

## protocol 定义

### Crypter

```elixir
defprotocol Mcrypto.Crypter do
  @moduledoc """
  Provide encryption functionality
  """
  @type t :: Mcrypto.Crypter.t()

  @doc "encrypt a plaintext with secret key"
  @spec encrypt(t(), binary(), binary()) :: [iv: String.t(), ciphertext: String.t()]
  def encrypt(crypter, plaintext, key)

  @doc "decrypt a ciphertext with secret key and iv"
  @spec decrypt(t(), binary(), binary(), binary()) :: binary()
  def decrypt(crypter, cyphertext, key, iv)
end
```

### Hasher

```elixir
defprotocol Mcrypto.Hasher do
  @moduledoc """
  Provide hash functionality
  """
  @type t :: Mcrypto.Hasher.t()

  @doc "create a hash for a given preset"
  @spec hash(t(), binary()) :: binary()
  def hash(hasher, data)
end

```

### Signer

```elixir
defprotocol Mcrypto.Signer do
  @moduledoc """
  Provide sign functionality
  """
  @type t :: Mcrypto.Signer.t()

  @doc "create a keypair for a given preset"
  @spec keypair(t()) :: {binary(), binary()}
  def keypair(signer)

  @doc "craete pk based on sk"
  @spec sk_to_pk(t(), binary()) :: binary()
  def sk_to_pk(signer, sk)

  @doc "sign a piece of data with secret key"
  @spec sign!(t(), binary(), binary()) :: binary()
  def sign!(signer, data, sk)

  @doc "verify data against a signature with public key"
  @spec verify(t(), binary(), binary(), binary()) :: true | false
  def verify(signer, data, signature, pk)
end
```
