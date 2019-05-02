<a name="@arcblock/abt-did"></a>

## @arcblock/abt-did
Utility functions to create/inspect did, and do did-based auth, an implementation of abt-did-protocol

**Requires**: <code>module:@arcblock/mcrypto</code>, <code>module:@arcblock/forge-util</code>

- [@arcblock/abt-did](#arcblockabt-did)
  - [fromAppDID(appDID, seed, [type], [index]) ⇒ <code>string</code>](#fromappdidappdid-seed-type-index-%E2%87%92-codestringcode)
  - [fromSecretKey(sk, type) ⇒ <code>string</code>](#fromsecretkeysk-type-%E2%87%92-codestringcode)
  - [fromPublicKey(pk, type) ⇒ <code>string</code>](#frompublickeypk-type-%E2%87%92-codestringcode)
  - [isFromPublicKey(did, pk) ⇒ <code>boolean</code>](#isfrompublickeydid-pk-%E2%87%92-codebooleancode)
  - [fromTypeInfo(type) ⇒](#fromtypeinfotype-%E2%87%92)
  - [toTypeInfo(did, [returnString]) ⇒ <code>object</code>](#totypeinfodid-returnstring-%E2%87%92-codeobjectcode)
  - [isValid(did) ⇒ <code>boolean</code>](#isvaliddid-%E2%87%92-codebooleancode)
  - [jwtSign(did, sk, [payload]) ⇒ <code>string</code>](#jwtsigndid-sk-payload-%E2%87%92-codestringcode)
  - [jwtDecode(token, [payloadOnly]) ⇒ <code>object</code>](#jwtdecodetoken-payloadonly-%E2%87%92-codeobjectcode)
  - [jwtVerify(token, pk) ⇒ <code>boolean</code>](#jwtverifytoken-pk-%E2%87%92-codebooleancode)
  - [toAddress(did) ⇒ <code>string</code>](#toaddressdid-%E2%87%92-codestringcode)
  - [toDid(did) ⇒ <code>string</code>](#todiddid-%E2%87%92-codestringcode)

<a name="fromAppDID"></a>

### fromAppDID(appDID, seed, [type], [index]) ⇒ <code>string</code>
Gen DID from appDID and seed

Spec: https://github.com/ArcBlock/ABT-DID-Protocol#request-did-authentication

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Returns**: <code>string</code> - DID string
**Access**: public

| Param | Type | Default |
| --- | --- | --- |
| appDID | <code>string</code> |  |
| seed | <code>string</code> |  |
| [type] | <code>object</code> | <code>{}</code> |
| [index] | <code>number</code> | <code>0</code> |

<a name="fromSecretKey"></a>

### fromSecretKey(sk, type) ⇒ <code>string</code>
Gen DID from private key and type config

Spec: https://github.com/ArcBlock/ABT-DID-Protocol#create-did

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Returns**: <code>string</code> - DID string
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| sk | <code>string</code> | hex encoded secret key string |
| type | <code>object</code> | wallet type, {@see @arcblock/forge-wallet#WalletType} |

<a name="fromPublicKey"></a>

### fromPublicKey(pk, type) ⇒ <code>string</code>
Gen DID from public key and type config

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Returns**: <code>string</code> - DID string
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| pk | <code>string</code> | hex encoded public key |
| type | <code>object</code> | wallet type, {@see @arcblock/forge-wallet#WalletType} |

<a name="isFromPublicKey"></a>

### isFromPublicKey(did, pk) ⇒ <code>boolean</code>
Check if an DID is generated from a publicKey

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | string of the did, usually base58btc format |
| pk | <code>string</code> | hex encoded publicKey string |

<a name="fromTypeInfo"></a>

### fromTypeInfo(type) ⇒
Convert type info object to hex string

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Returns**: string
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| type | <code>object</code> | wallet type, {@see @arcblock/forge-wallet#WalletType} |

<a name=""></a>

### toTypeInfo(did, [returnString]) ⇒ <code>object</code>
Get type info from did (base58 format)

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Returns**: <code>object</code> - wallet type {@see @arcblock/forge-wallet#WalletType}
**Access**: public

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| did | <code>string</code> |  | address string |
| [returnString] | <code>boolean</code> | <code>true</code> |  |

<a name="isValid"></a>

### isValid(did) ⇒ <code>boolean</code>
Check if a DID string is valid

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | address string |

<a name="jwtSign"></a>

### jwtSign(did, sk, [payload]) ⇒ <code>string</code>
Generate and sign a jwt token

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Returns**: <code>string</code> - hex encoded signature
**Access**: public

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| did | <code>string</code> |  | address string |
| sk | <code>string</code> |  | hex encoded secret key |
| [payload] | <code>object</code> | <code>{}</code> | data to be included before signing |

<a name="jwtDecode"></a>

### jwtDecode(token, [payloadOnly]) ⇒ <code>object</code>
Decode info from jwt token

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Access**: public

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>string</code> |  | jwt string |
| [payloadOnly] | <code>boolean</code> | <code>false</code> |  |

<a name="jwtVerify"></a>

### jwtVerify(token, pk) ⇒ <code>boolean</code>
Verify a jwt token signed with pk and certain issuer

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | the jwt token |
| pk | <code>string</code> | hex encoded public key |

<a name="toAddress"></a>

### toAddress(did) ⇒ <code>string</code>
Convert did to address: remove `did:abt:` prefix if exists

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | address string |

<a name="toDid"></a>

### toDid(did) ⇒ <code>string</code>
Convert address to did: prepend `did:abt:` prefix

**Kind**: static method of [<code>@arcblock/abt-did</code>](#@arcblock/abt-did)
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | address string |
