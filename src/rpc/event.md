# Event RPC


<!-- General description - purpose of chain rpc, problem it could solve -->
Event RPCs help users to interact with activities they are interested in. All activities exist in the form of transactions. By using event RPCs, users can receive real-time information on updates of the transactions type they requested.


## RPC list
<!-- list rpc -->
- Subscribe
- Unsubscribe


### Subscribe
----
<!-- intro what does it do -->

`subscribe(RequestSubscribe) returns (stream ResponseSubscribe)`

<!-- input -->
#### RequestSubscribe
|  Name  | Data Type |  Default  |Required |
| :----- | :-------- |  :------- |:------- |
| type   | TopicType |  transfer |         |
| filter | string    |  ''       |         |
---

<!-- output -->
#### ResponseSubscribe
|       Name        |     Data Type     |
| :---------------- | :---------------- |
| code              | int               |
| One Of Below      |                   |
| transfer          | Transaction       |
| account_migrate   | Transaction       |
| confirm           | Transaction       |
| create_asset      | Transaction       |
| exchange          | Transaction       |
| revoke            | Transaction       |
| begin_block       | RequestBeginBlock |
| end_block         | RequestEndBlock   |
| declare           | Transaction       |
| update_asset      | Transaction       |
| consensus_upgrade | Transaction       |
| declare_file      | Transaction       |
| sys_upgrade       | Transaction       |
| stake             | Transaction       |
| account_state     | Transaction       |
| asset_state       | Transaction       |
| forge_state       | Transaction       |
| stake_state       | Transaction       |


#### GRPC Example

```python
request = RequestSubscribe(type=0)
response_stream = EventStub.subsribe(request)
```

#### GraphQL Example
```graphql
{
  getTopAccounts {
    code
    accounts {
      address
      balance
      genesisTime
      migratedFrom
      migratedTo
      moniker
      nonce
      numAssets
    }
    page {
      cursor
      next
      total
    }
  }
}
```
