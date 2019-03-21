# Forge Logs

## Transaction log

### Begin Block
```
09:06:47.891 application=forge pid=<0.3193.0> [info] [consensus begin block]: chain id=forge, app hash=4A439C8B23EA29BBF4701AE1B071549B1779348E6FF344DFD6CC06D237DEC691, height=6620, num_txs=0, total_txs=476946, proposer=zyiFNhDOM4UmEQLMn2rpmnHX2gk=, time=2019-03-12 16:06:42Z
```

### Deliver Tx

By default, for each transaction we provide 3 log items:

* consensus deliver tx: the height of the block, tx index and hash.
* start tx: besides height / tx_index / hash, it also include type_url and sender address.
* finished tx: besides the data in start tx, it also provided important info:
  - status: if status is not `ok`. Then this is an invalid tx. The status code would indicate what error happened on this tx.
  - total time spent: as each tx will go through a list of pipelines, it gaves the performance metrics for each pipeline in `us`. For more information, see [Forge TX Protocol](./core/tx_protocol.md).

```
09:06:43.291 application=forge pid=<0.3193.0> [info] [consensus deliver tx]: height=6619 tx_index=104 hash=E081B959E826079E7248C48689DA536D63846AF3EECF1B01C9F21C162FCAB46F
09:06:43.292 application=forge_tx pid=<0.3193.0> [info] [pipeline] Started tx: height=6619, tx_index=104, hash=E081B959E826079E7248C48689DA536D63846AF3EECF1B01C9F21C162FCAB46F, type_url=fg:t:create_asset, sender=z1iSKM1H1Tcu3s3G4aKV9QntcSjzqNVFwsi.
09:06:43.294 application=forge_tx pid=<0.3193.0> [info] [pipeline] Finished tx: height=6619, tx_index=104, type_url=fg:t:create_asset, status=ok. Total time spent: %{final_update: 28, post_update: 35, post_verify: 29, pre_update: 4, pre_verify: 737, update: 281, verify: 878}

09:06:43.294 application=forge pid=<0.3193.0> [info] [consensus deliver tx]: height=6619 tx_index=105 hash=44B3E367EB1EE02FD0AF302AAC674BEB04E876BF6FE53E44DAB367780EBC3E2F
09:06:43.294 application=forge_tx pid=<0.3193.0> [info] [pipeline] Started tx: height=6619, tx_index=105, hash=44B3E367EB1EE02FD0AF302AAC674BEB04E876BF6FE53E44DAB367780EBC3E2F, type_url=fg:t:transfer, sender=z1ZDHDxsov4ha9igbjKPTbakGecygVrgkbo.
09:06:43.296 application=forge_tx pid=<0.3193.0> [info] [pipeline] Finished tx: height=6619, tx_index=105, type_url=fg:t:transfer, status=ok. Total time spent: %{final_update: 16, post_update: 36, post_verify: 23, pre_update: 4, pre_verify: 1039, update: 161, verify: 599}
```

### End block
```
09:06:47.892 application=forge pid=<0.3193.0> [info] [consensus end block]: height=6620 total_txs=0
09:06:47.895 application=forge pid=<0.3184.0> [info] [hub - commit!] state updated: db_account=0 db_asset=0 db_default=1 db_receipt=1, time spent=1.749.
09:06:47.898 application=forge pid=<0.3193.0> [info] [consensus commit block]: height=6620 total_txs=0 app_hash=8C97EA679145436E2BDB73AC2ED29FD5DD144EA6C900D7B43E27561C16F9032C
```
