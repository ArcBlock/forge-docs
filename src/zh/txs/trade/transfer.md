# 转移交易

**转移**交易是区块链中最常见的交易，一个账户可以转移代币和/或一系列资产至另一个账户。转移完成后，发送者的余额会被扣除，转移 tx 中的资产所有者会被变更为接收者。

## 协议定义

如需转移代币/资产，定义了`TransferTx`：

```proto
message TransferTx {
  string to = 1;
  BigUint value = 2;
  repeated string assets = 3;

  google.protobuf.Any data = 15;
}
```

- `to` is the address of the receiver. It must exist in the chain.
- `value` is the tokens you'd transfer. Mininum 1 unit (1 token = 10^^16 units by default, you can tune this in forge config). If you don't want to transfer any tokens, just leave it unfilled.
- `assets` are a list of asset addresses you'd transfer. Leave if unfilled if you don't want to transfer assets. Not that `value` and `assets` cannot be both empty.

Here's an example of sending a transfer tx:

```elixir
w = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "alice"), wallet: w)

w1 = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "bob"), wallet: w)

# transfer to bob's address

itx = ForgeAbi.TransferTx.new(to: w1.address, value: ForgeSdk.token_to_unit(1))

# sign with alice's wallet

ForgeSdk.transfer(itx, wallet: w)
```
