<a name="module_@arcblock/forge-util"></a>


## [**@arcblock/forge-util**](https://github.com/arcblock/forge-util)

Contains many utility functions to help developers manipulate encoding/decoding/formatting/bignumber

**Example**

```js
yarn add @arcblock/forge-util
```

- [**@arcblock/forge-util**](#arcblockforge-util)
  - [isHexPrefixed(str) ⇒ <code>Boolean</code>](#ishexprefixedstr-%E2%87%92-codebooleancode)
  - [stripHexPrefix(str) ⇒ <code>String</code> \| <code>Optional</code>](#striphexprefixstr-%E2%87%92-codestringcode--codeoptionalcode)
  - [isBN(object) ⇒ <code>Boolean</code>](#isbnobject-%E2%87%92-codebooleancode)
  - [isBigNumber(object) ⇒ <code>Boolean</code>](#isbignumberobject-%E2%87%92-codebooleancode)
  - [toBN(number,) ⇒ <code>BN</code>](#tobnnumber-%E2%87%92-codebncode)
  - [utf8ToHex(str) ⇒ <code>String</code>](#utf8tohexstr-%E2%87%92-codestringcode)
  - [hexToUtf8(hex) ⇒ <code>String</code>](#hextoutf8hex-%E2%87%92-codestringcode)
  - [hexToNumber(value) ⇒ <code>Number</code>](#hextonumbervalue-%E2%87%92-codenumbercode)
  - [hexToNumberString(value) ⇒ <code>String</code>](#hextonumberstringvalue-%E2%87%92-codestringcode)
  - [numberToHex(value) ⇒ <code>String</code>](#numbertohexvalue-%E2%87%92-codestringcode)
  - [bytesToHex(bytes) ⇒ <code>String</code>](#bytestohexbytes-%E2%87%92-codestringcode)
  - [hexToBytes(hex) ⇒ <code>Array</code>](#hextobyteshex-%E2%87%92-codearraycode)
  - [toHex(value, returnType) ⇒ <code>String</code>](#tohexvalue-returntype-%E2%87%92-codestringcode)
  - [isHexStrict(hex) ⇒ <code>Boolean</code>](#ishexstricthex-%E2%87%92-codebooleancode)
  - [isHex(hex) ⇒ <code>Boolean</code>](#ishexhex-%E2%87%92-codebooleancode)
  - [fromUintToToken(input, [decimal], optionsInput) ⇒ <code>string</code>](#fromuinttotokeninput-decimal-optionsinput-%E2%87%92-codestringcode)
  - [fromTokenToUnit(input, [decimal]) ⇒](#fromtokentounitinput-decimal-%E2%87%92)
  - [isUint8Array(value) ⇒ <code>Boolean</code>](#isuint8arrayvalue-%E2%87%92-codebooleancode)

<a name="isHexPrefixed"></a>

### isHexPrefixed(str) ⇒ <code>Boolean</code>

Returns a `Boolean` on whether or not the a `String` starts with '0x'

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>Boolean</code> - a boolean if it is or is not hex prefixed
**Throws**:

* if the str input is not a string

**Access**: public

| Param | Type                | Description            |
| ----- | ------------------- | ---------------------- |
| str   | <code>String</code> | the string input value |

<a name="stripHexPrefix"></a>

### stripHexPrefix(str) ⇒ <code>String</code> \| <code>Optional</code>

Removes '0x' from a given `String` if present

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>String</code> \| <code>Optional</code> - a string by pass if necessary
**Access**: public

| Param | Type                | Description      |
| ----- | ------------------- | ---------------- |
| str   | <code>String</code> | the string value |

<a name="isBN"></a>

### isBN(object) ⇒ <code>Boolean</code>

Returns true if object is BN, otherwise false

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param  | Type                |
| ------ | ------------------- |
| object | <code>Object</code> |

<a name="isBigNumber"></a>

### isBigNumber(object) ⇒ <code>Boolean</code>

Returns true if object is BigNumber, otherwise false

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param  | Type                |
| ------ | ------------------- |
| object | <code>Object</code> |

<a name="toBN"></a>

### toBN(number,) ⇒ <code>BN</code>

Takes an input and transforms it into an BN

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>BN</code> - BN
**Access**: public

| Param   | Type                                                          | Description              |
| ------- | ------------------------------------------------------------- | ------------------------ |
| number, | <code>Number</code> \| <code>String</code> \| <code>BN</code> | string, HEX string or BN |

<a name="utf8ToHex"></a>

### utf8ToHex(str) ⇒ <code>String</code>

Should be called to get hex representation (prefixed by 0x) of utf8 string

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>String</code> - hex representation of input string
**Access**: public

| Param | Type                |
| ----- | ------------------- |
| str   | <code>String</code> |

<a name="hexToUtf8"></a>

### hexToUtf8(hex) ⇒ <code>String</code>

Should be called to get utf8 from it's hex representation

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>String</code> - ascii string representation of hex value
**Access**: public

| Param | Type                |
| ----- | ------------------- |
| hex   | <code>String</code> |

<a name="hexToNumber"></a>

### hexToNumber(value) ⇒ <code>Number</code>

Converts value to it's number representation

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param | Type                                                          |
| ----- | ------------------------------------------------------------- |
| value | <code>String</code> \| <code>Number</code> \| <code>BN</code> |

<a name="hexToNumberString"></a>

### hexToNumberString(value) ⇒ <code>String</code>

Converts value to it's decimal representation in string

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param | Type                                                          |
| ----- | ------------------------------------------------------------- |
| value | <code>String</code> \| <code>Number</code> \| <code>BN</code> |

<a name="numberToHex"></a>

### numberToHex(value) ⇒ <code>String</code>

Converts value to it's hex representation

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param | Type                                                          |
| ----- | ------------------------------------------------------------- |
| value | <code>String</code> \| <code>Number</code> \| <code>BN</code> |

<a name="bytesToHex"></a>

### bytesToHex(bytes) ⇒ <code>String</code>

Convert a byte array to a hex string

Note: Implementation from crypto-js

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>String</code> - the hex string
**Access**: public

| Param | Type               |
| ----- | ------------------ |
| bytes | <code>Array</code> |

<a name="hexToBytes"></a>

### hexToBytes(hex) ⇒ <code>Array</code>

Convert a hex string to a byte array

Note: Implementation from crypto-js

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>Array</code> - the byte array
**Access**: public

| Param | Type                |
| ----- | ------------------- |
| hex   | <code>String</code> |

<a name="toHex"></a>

### toHex(value, returnType) ⇒ <code>String</code>

Auto converts any given value into it's hex representation.
And even stringifys objects before.

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param      | Type                                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| value      | <code>String</code> \| <code>Number</code> \| <code>BN</code> \| <code>Object</code> \| <code>TypedArray</code> \| <code>Buffer</code> |
| returnType | <code>Boolean</code>                                                                                                                   |

<a name="isHexStrict"></a>

### isHexStrict(hex) ⇒ <code>Boolean</code>

Check if string is HEX, requires a 0x in front

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| hex   | <code>String</code> | to be checked |

<a name="isHex"></a>

### isHex(hex) ⇒ <code>Boolean</code>

Check if string is HEX

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param | Type                | Description   |
| ----- | ------------------- | ------------- |
| hex   | <code>String</code> | to be checked |

<a name="fromUintToToken"></a>

### fromUintToToken(input, [decimal], optionsInput) ⇒ <code>string</code>

Format a big number to human readable number, such as 1_0000_0000_0000_000 => 1 Token

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Access**: public

| Param        | Type                                       | Default         |
| ------------ | ------------------------------------------ | --------------- |
| input        | <code>string</code> \| <code>number</code> |                 |
| [decimal]    | <code>number</code>                        | <code>16</code> |
| optionsInput | <code>\*</code>                            |                 |

<a name="fromTokenToUnit"></a>

### fromTokenToUnit(input, [decimal]) ⇒

Convert human readable token number to big number instance

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: BN
**Access**: public

| Param     | Type                | Default         |
| --------- | ------------------- | --------------- |
| input     | <code>string</code> |                 |
| [decimal] | <code>number</code> | <code>16</code> |

<a name="isUint8Array"></a>

### isUint8Array(value) ⇒ <code>Boolean</code>

Validates if a value is an Uint8Array.

**Kind**: static method of [<code>@arcblock/forge-util</code>](#module_@arcblock/forge-util)
**Returns**: <code>Boolean</code> - boolean indicating if a value is an Uint8Array
**Access**: public

| Param | Type            | Description       |
| ----- | --------------- | ----------------- |
| value | <code>\*</code> | value to validate |
