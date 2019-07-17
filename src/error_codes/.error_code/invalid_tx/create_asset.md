If `tx.data` contains `AssetFactory`, possible causes:
1. `AssetFactory.description`, `AssetFactory.attributes`, `AssetFactory.price`, `AssetFactory.template`, `AssetFactory.allowed_spec_args`, `AssetFactory.asset_name` can not be empty.
2. `AssetFactory.template` and `AssetFactory.sllowed_spec_args` should match.
3. `AssetFactory.asset_name` should contain a deployed protobuf type.
