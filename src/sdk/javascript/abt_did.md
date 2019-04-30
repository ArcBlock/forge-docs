<a name="module_@arcblock/abt-did"></a>

## @arcblock/abt-did
Utility functions to create/inspect did, and do did-based auth, an implementation of abt-did-protocol

**Requires**: <code>module:@arcblock/mcrypto</code>, <code>module:@arcblock/forge-util</code>  

* [@arcblock/abt-did](#module_@arcblock/abt-did)
    * [.fromAppDID(appDID, seed, [type], [index])](#module_@arcblock/abt-did.fromAppDID) ⇒ <code>string</code>
    * [.fromSecretKey(sk, type)](#module_@arcblock/abt-did.fromSecretKey) ⇒ <code>string</code>
    * [.fromPublicKey(pk, type)](#module_@arcblock/abt-did.fromPublicKey) ⇒ <code>string</code>
    * [.isFromPublicKey(did, pk)](#module_@arcblock/abt-did.isFromPublicKey) ⇒ <code>boolean</code>
    * [.fromTypeInfo(type)](#module_@arcblock/abt-did.fromTypeInfo) ⇒
    * [.toTypeInfo(did, [returnString])](#module_@arcblock/abt-did.toTypeInfo) ⇒ <code>object</code>
    * [.isValid(did)](#module_@arcblock/abt-did.isValid) ⇒ <code>boolean</code>
    * [.jwtSign(did, sk, [payload])](#module_@arcblock/abt-did.jwtSign) ⇒ <code>string</code>
    * [.jwtDecode(token, [payloadOnly])](#module_@arcblock/abt-did.jwtDecode) ⇒ <code>object</code>
    * [.jwtVerify(token, pk)](#module_@arcblock/abt-did.jwtVerify) ⇒ <code>boolean</code>
    * [.toAddress(did)](#module_@arcblock/abt-did.toAddress) ⇒ <code>string</code>
    * [.toDid(did)](#module_@arcblock/abt-did.toDid) ⇒ <code>string</code>

<a name="module_@arcblock/abt-did.fromAppDID"></a>

### @arcblock/abt-did.fromAppDID(appDID, seed, [type], [index]) ⇒ <code>string</code>
Gen DID from appDID and seed

Spec: https://github.com/ArcBlock/ABT-DID-Protocol#request-did-authentication

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Returns**: <code>string</code> - DID string  
**Access**: public  

| Param | Type | Default |
| --- | --- | --- |
| appDID | <code>string</code> |  | 
| seed | <code>string</code> |  | 
| [type] | <code>object</code> | <code>{}</code> | 
| [index] | <code>number</code> | <code>0</code> | 

<a name="module_@arcblock/abt-did.fromSecretKey"></a>

### @arcblock/abt-did.fromSecretKey(sk, type) ⇒ <code>string</code>
Gen DID from private key and type config

Spec: https://github.com/ArcBlock/ABT-DID-Protocol#create-did

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Returns**: <code>string</code> - DID string  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| sk | <code>string</code> | hex encoded secret key string |
| type | <code>object</code> | wallet type, {@see @arcblock/forge-wallet#WalletType} |

<a name="module_@arcblock/abt-did.fromPublicKey"></a>

### @arcblock/abt-did.fromPublicKey(pk, type) ⇒ <code>string</code>
Gen DID from public key and type config

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Returns**: <code>string</code> - DID string  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| pk | <code>string</code> | hex encoded public key |
| type | <code>object</code> | wallet type, {@see @arcblock/forge-wallet#WalletType} |

<a name="module_@arcblock/abt-did.isFromPublicKey"></a>

### @arcblock/abt-did.isFromPublicKey(did, pk) ⇒ <code>boolean</code>
Check if an DID is generated from a publicKey

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | string of the did, usually base58btc format |
| pk | <code>string</code> | hex encoded publicKey string |

<a name="module_@arcblock/abt-did.fromTypeInfo"></a>

### @arcblock/abt-did.fromTypeInfo(type) ⇒
Convert type info object to hex string

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Returns**: string  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>object</code> | wallet type, {@see @arcblock/forge-wallet#WalletType} |

<a name="module_@arcblock/abt-did.toTypeInfo"></a>

### @arcblock/abt-did.toTypeInfo(did, [returnString]) ⇒ <code>object</code>
Get type info from did (base58 format)

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Returns**: <code>object</code> - wallet type {@see @arcblock/forge-wallet#WalletType}  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| did | <code>string</code> |  | address string |
| [returnString] | <code>boolean</code> | <code>true</code> |  |

<a name="module_@arcblock/abt-did.isValid"></a>

### @arcblock/abt-did.isValid(did) ⇒ <code>boolean</code>
Check if a DID string is valid

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | address string |

<a name="module_@arcblock/abt-did.jwtSign"></a>

### @arcblock/abt-did.jwtSign(did, sk, [payload]) ⇒ <code>string</code>
Generate and sign a jwt token

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Returns**: <code>string</code> - hex encoded signature  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| did | <code>string</code> |  | address string |
| sk | <code>string</code> |  | hex encoded secret key |
| [payload] | <code>object</code> | <code>{}</code> | data to be included before signing |

<a name="module_@arcblock/abt-did.jwtDecode"></a>

### @arcblock/abt-did.jwtDecode(token, [payloadOnly]) ⇒ <code>object</code>
Decode info from jwt token

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Access**: public  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| token | <code>string</code> |  | jwt string |
| [payloadOnly] | <code>boolean</code> | <code>false</code> |  |

<a name="module_@arcblock/abt-did.jwtVerify"></a>

### @arcblock/abt-did.jwtVerify(token, pk) ⇒ <code>boolean</code>
Verify a jwt token signed with pk and certain issuer

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | the jwt token |
| pk | <code>string</code> | hex encoded public key |

<a name="module_@arcblock/abt-did.toAddress"></a>

### @arcblock/abt-did.toAddress(did) ⇒ <code>string</code>
Convert did to address: remove `did:abt:` prefix if exists

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | address string |

<a name="module_@arcblock/abt-did.toDid"></a>

### @arcblock/abt-did.toDid(did) ⇒ <code>string</code>
Convert address to did: prepend `did:abt:` prefix

**Kind**: static method of [<code>@arcblock/abt-did</code>](#module_@arcblock/abt-did)  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| did | <code>string</code> | address string |

