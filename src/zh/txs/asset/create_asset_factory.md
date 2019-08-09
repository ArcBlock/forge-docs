# 创建资产工厂交易

**创建资产工厂**用于解决一般问题，以下为初始提议：

从活动链（以及未来证书应用程序或如电影票、讲座门票在内的用例）我们找到了普遍要求，即当发行者创建资产时，他们通常想创建能根据模板进一步创建实际资产的工厂，这样，当某个人想购买该资产时，它只会生成实际资产并将其转移至买家。

所以，我们可以有 create_asset_factory 协议，工厂将根据给出的地址生成资产状态。

当用户将代币转移至本地址时，它将根据资产工厂生成资产并将用户地址设置为所有者，然后，它会将代币从用户账户移到资产工厂的发行者账户。

资产工厂就像自助售货机一样，您支付所需的代币，资产将被生成并提供给您。

请注意，创建资产工厂 tx 目前为**BETA**版，其界面可能发生改变（大规模）。

## 协议定义

如需创建资产工厂，您需要使用`CreateAssetTx`消息和`AssetFactory`作为其数据（是的，我们重复使用 CreateAssetTx 而不重新创造 wheels）：

```proto
message AssetAttributes {

bool transferrable = 1;

uint32 ttl = 2;

}



message AssetFactory {

string description = 1;

uint32 limit = 2;

BigUint price = 3;

string template = 4;

repeated string allowed_spec_args = 5;

string asset_name = 6;



AssetAttributes attributes = 7;

}



message CreateAssetTx {

string moniker = 1;

google.protobuf.Any data = 2;

bool readonly = 3;

bool transferrable = 4;

uint32 ttl = 5;

string parent = 6;

string address = 7;

}
```

如果您回顾[创建资产 tx](create_asset.md)的协议定义，您会发现，`AssetFactory`中字段的设计使其可在内部生成`CreateAssetTx`。那是模板 allowed_spec_args, asset_name 的目的和属性：

- 模板：资产工厂将用于生成资产的模板，模板是字符串，可由带特定 args 的 EEx 处理，其输出为 json。然后，json 会被解析并根据 asset_name 转换。例如，如果您的资产名称为`Ticket`，则生成的 json 数据则会被转换为`ForgeAbi.Ticket.new(json)`。

- allowed_spec_args：模板允许的参数。在转移 tx，用户可通过包含所需参数的 json 字符串向这个 AssetFactory 地址转移代币，解析 json 后，会对照此表格进行检查，如果任何字段不在列表中，则转移 tx 会失败。

- asset_name：资产的 protobuf 消息名。请注意，此消息应被注册在 forge。

- 属性：资产属性将被复制到已生成资产。请注意，从资产工厂生成的资产为只读。

拿电影票举例。加入您希望生成包含以下信息的电影票：

- 时间：电影播放的日期和时间。

- 名称：电影名称。

- 放映室：电影票可使用的放映室。

- 排：电影票所属的座位排。

- 座：电影票所述的座位号。

您可以创建一个上述所有信息均为变量的工厂，或固定名称、时间和放映室作为每个工厂的常数。假如您想为每个放映室的一部电影创建一个工厂，如下：

```js
template = {
  row: '{{ row }}',

  seat: '{{ seat }}',

  room: '5C',

  time: '11:00am 04/30/2019',

  name: 'Avengers: Endgame'
};
```

然后您可以像这样创建一个工厂（放映室 5C 有 200 个座位）：

```js
factory = {
  description: 'Movie ticket factory',

  limit: 200,

  price: 10,

  template: template,

  allowed_spec_args: ['row', 'seat'],

  asset_name: 'Ticket',

  attributes: {
    transferrable: true,

    // ticket is valid in 3 hours after consumption

    ttl: 3600 * 3
  }
};
```

asset_name `Ticket`代表此消息：

```proto
message Ticket {

string row = 1;

string seat = 2;

string room = 3;

string time = 4;

string name = 5;

}
```

当用户试图获取资产时，通过向工厂中的模板应用用户提供的参数，新的票券实例会被创建。然后，一个`CreateAssetTx`在内部生成（收据 db 中没有足迹，只为验证和创建实际资产状态生成）。

现在，我们来看看资产工厂的整个流程的示例代码：

```elixir
w = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "theater"), wallet: w)

w1 = ForgeSdk.create_wallet()

ForgeSdk.declare(ForgeAbi.DeclareTx.new(moniker: "tyr"), wallet: w)



# Note application shall already registered `Ticket` into Forge via `deploy_protocol`.

factory = %{

description: "movie ticket factory",

limit: 5,

price: ForgeAbi.token_to_unit(1),

template: ~s({

"row": "{{ row }}",

"seat": "{{ seat }}",

"time": "11:00am 04/30/2019",

"room": "4"

}),

allowed_spec_args: ["row", "seat"],

asset_name: "Ticket",

attributes: %ForgeAbi.AssetAttributes{

transferrable: true,

ttl: 3600 * 3

}

}



ForgeSdk.create_asset_factory("Avenerages: Endgame", factory, wallet: w)
```

如需从资产工厂获取资产，请查看[获取资产](./acquire_asset.md).

[1] 链接可能不可访问，因为我们尚未开放 forge。
