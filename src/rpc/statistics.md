# Statistics RPC


The statistics RPC is aiming for querying the statistics data, collecting the real-time or a certain past period stats. It included 3 kinds of stats data, common data (e.g. blocks, txs etc), various types of txs stats, tps related stats.

## RPC list

ForgeSdk.get_forge_statistics

### RPC Info: get_forge_statistics

#### Input & Output

Stats1: realtime stats

``` elixir
# Input: %ForgeAbi.RequestGetForgeStatistics
# Output: %ForgeAbi.ForgeStatistics
> ForgeAbi.RequestGetForgeStatistics.new()
%ForgeAbi.RequestGetForgeStatistics{value: nil}
```

Stats2: 24 hours stats for a certain date

```elixir
# Input: %ForgeAbi.RequestGetForgeStatistics
# Output: %ForgeAbi.ForgeStatistics
> ForgeAbi.RequestGetForgeStatistics.new(value: {:date, ForgeAbi.ByHour.new()})
%ForgeAbi.RequestGetForgeStatistics{value: {:date, %ForgeAbi.ByHour{date: ""}}}
```

Stats3: stats by day for a certain date range

```elixir
# Input: %ForgeAbi.RequestGetForgeStatistics
# Output: %ForgeAbi.ForgeStatistics
> ForgeAbi.RequestGetForgeStatistics.new(value: {:date, ForgeAbi.ByDay.new()})
%ForgeAbi.RequestGetForgeStatistics{
  value: {:date, %ForgeAbi.ByDay{end_date: "", start_date: ""}}
}
```

#### GRPC example

Stats1: realtime stats

``` elixir
> realtime = ForgeAbi.RequestGetForgeStatistics.new
%ForgeAbi.RequestGetForgeStatistics{value: nil}
```

Stats2: 24 hours stats for a certain date

```elixir
> by_hour_stats = ForgeAbi.RequestGetForgeStatistics.new(value: {:date, %ForgeAbi.ByHour{date: "2019-03-16"}})
%ForgeAbi.RequestGetForgeStatistics{
  value: {:date, %ForgeAbi.ByHour{date: "2019-03-16"}}
}
> ForgeSdk.get_forge_statistics(by_hour_stats)
```

Stats3: stats by day for a certain date range

```elixir
> by_day_stats = ForgeAbi.RequestGetForgeStatistics.new(value: {:day_info, %ForgeAbi.ByDay{end_date: "2019-03-19", start_date: "2019-03-16"}})
%ForgeAbi.RequestGetForgeStatistics{
  value: {:day_info,
   %ForgeAbi.ByDay{end_date: "2019-03-19", start_date: "2019-03-16"}}
}
> ForgeSdk.get_forge_statistics(by_day_stats)
```

#### GraphQL example

Stats1: realtime stats

```graphql
{
  getForgeStatistics{
    forgeStatistics {
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
  getForgeStatisticsByHour(date: "2019-03-16"){
    forgeStatistics {
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
  getForgeStatisticsByDay(startDate: "2019-03-16", endDate:"2019-03-20"){
    forgeStatistics {
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
  getForgeStatisticsByDay(endDate:"2019-03-20"){
    forgeStatistics {
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
  getForgeStatisticsByDay(startDate: "2019-03-16"){
    forgeStatistics {
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
