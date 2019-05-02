<a name="@arcblock/did-util"></a>

## @arcblock/did-util
Utility functions to calculate various kinds of did, such as asset address

**Requires**: <code>module:@arcblock/mcrypto</code>, <code>module:@arcblock/abt-did</code>, <code>module:@arcblock/forge-util</code>, <code>module:@arcblock/forge-wallet</code>, <code>module:@arcblock/forge-message</code>

- [@arcblock/did-util](#arcblockdid-util)
  - [toAssetAddress(itx, sender) ⇒ <code>string</code>](#toassetaddressitx-sender-%E2%87%92-codestringcode)
  - [toStakeAddress(sender, receiver) ⇒ <code>string</code>](#tostakeaddresssender-receiver-%E2%87%92-codestringcode)

<a name="toAssetAddress"></a>

### toAssetAddress(itx, sender) ⇒ <code>string</code>
Create an asset address, eg: the did of an asset

**Kind**: static method of [<code>@arcblock/did-util</code>](#@arcblock/did-util)
**Returns**: <code>string</code> - asset address without `did:abt:` prefix
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| itx | <code>object</code> | an object of `CreateAssetTx` |
| sender | <code>string</code> | creator address, also the initial owner of the asset |

<a name="toStakeAddress"></a>

### toStakeAddress(sender, receiver) ⇒ <code>string</code>
Generate an stake address, eg: the did of the stake

**Kind**: static method of [<code>@arcblock/did-util</code>](#@arcblock/did-util)
**Returns**: <code>string</code> - stake address without `did:abt:` prefix
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| sender | <code>string</code> | sender address |
| receiver | <code>string</code> | receiver address |
