# Stats RPC

The stats RPC is aiming for querying the statistics data, collecting the real-time or a certain past period stats. It included 3 kinds of stats data: common data (e.g. blocks, txs etc), various types of txs stats, tps related stats.

## RPC list

ForgeSdk.get_forge_stats

### RPC Info: get_forge_stats

#### Input & Output

Stats1: realtime stats

``` elixir
# Input: %ForgeAbi.RequestGetForgeStats
# Output: %ForgeAbi.ForgeStats
> ForgeAbi.RequestGetForgeStats.new()
%ForgeAbi.RequestGetForgeStats{value: nil}
```

Stats2: 24 hours stats for a certain date

```elixir
# Input: %ForgeAbi.RequestGetForgeStats
# Output: %ForgeAbi.ForgeStats
> ForgeAbi.RequestGetForgeStats.new(value: {:date, ForgeAbi.ByHour.new()})
%ForgeAbi.RequestGetForgeStats{value: {:date, %ForgeAbi.ByHour{date: ""}}}
```

Stats3: stats by day for a certain date range

```elixir
# Input: %ForgeAbi.RequestGetForgeStats
# Output: %ForgeAbi.ForgeStats
> ForgeAbi.RequestGetForgeStats.new(value: {:date, ForgeAbi.ByDay.new()})
%ForgeAbi.RequestGetForgeStats{
  value: {:date, %ForgeAbi.ByDay{end_date: "", start_date: ""}}
}
```

#### GRPC example

Stats1: realtime stats

``` elixir
> realtime = ForgeAbi.RequestGetForgeStats.new
%ForgeAbi.RequestGetForgeStats{value: nil}
```

Stats2: 24 hours stats for a certain date

```elixir
> by_hour_stats = ForgeAbi.RequestGetForgeStats.new(value: {:date, %ForgeAbi.ByHour{date: "2019-03-16"}})
%ForgeAbi.RequestGetForgeStats{
  value: {:date, %ForgeAbi.ByHour{date: "2019-03-16"}}
}
> ForgeSdk.get_forge_stats(by_hour_stats)
```

Stats3: stats by day for a certain date range

```elixir
> by_day_stats = ForgeAbi.RequestGetForgeStats.new(value: {:day_info, %ForgeAbi.ByDay{end_date: "2019-03-19", start_date: "2019-03-16"}})
%ForgeAbi.RequestGetForgeStats{
  value: {:day_info,
   %ForgeAbi.ByDay{end_date: "2019-03-19", start_date: "2019-03-16"}}
}
> ForgeSdk.get_forge_stats(by_day_stats)
```

#### GraphQL example

Stats1: realtime stats

```graphql
{
  getForgeStats{
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}
```

Stats2: 24 hours stats for a certain date

```graphql
{
  getForgeStatsByHour(date: "2019-03-16"){
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}
```

Stats3: stats by day for a certain date range

```graphql
{
  getForgeStatsByDay(startDate: "2019-03-16", endDate:"2019-03-20"){
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}

{
  getForgeStatsByDay(endDate:"2019-03-20"){
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}

{
  getForgeStatsByDay(startDate: "2019-03-16"){
    forgeStats {
      avgTps
      maxTps
      numAccountMigrateTxs
      numBlocks
      numConsensusUpgradeTxs
      numConsumeAssetTxs
      numCreateAssetTxs
      numDeclareFileTxs
      numDeclareTxs
      numExchangeTxs
      numPokeTxs
      numStakeTxs
      numStakes
      numSysUpgradeTxs
      numTransferTxs
      numTxs
      numUpdateAssetTxs
      numValidators
    }
  }
}
```
