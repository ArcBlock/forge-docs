# More about Forge

Now you should have a good sense about Forge


@startuml

' Forge definition

interface Forge.State {
  +create(state, attrs, context)
  +load(state)
  +update(state, attrs, context)
}

interface Forge.StateDb {
  +open(handler)
  +get(handler, address, app_hash \\ nil)
  +put(handler, address, data)
  +commit_block(handler, height)
  +get_info(handler, height \\ 0)
  +travel(handler, height_or_hash)
}

interface Forge.Tx {
  +create(itx, from, nonce, wallet)
  +valid?(itx, sender_state, db)
  +update_state(itx, sender_state, db, context)
}

interface ForgeSdk.Wallet {
  +create(type, passphrase)
  +load(type, address, passphrase)
  +recover(type, sk, passphrase)
  +sign(type, wallet, tx)
  +verify(type, tx)
}

class AccountState {
  non_neg_integer :nonce
  non_neg_integer :num_txs
  String :address
  String :owner
  String pk
  WalletType :type
  String :moniker
  AccountRole role
  binary genesis_tx
  binary renaissance_tx
  Google.Protobuf.Timestamp genesis_time
  Google.Protobuf.Timestamp renaissance_time
  String migrated_to
  Google.Protobuf.Any data
}

class Mpt {
  atom :name
  atom :type
  MerklePatriciaTree.Trie :trie
  String :dbpath

}

Forge.State <|-- AccountState
Forge.StateDb <|-- Mpt
ForgeSdk.Wallet <|-- Eth

' this is just to make the diagram look better
Forge.Tx <|-- InnerTx
InnerTx o-- TranserTx
InnerTx o-- ChangeTx
InnerTx o-- DeclareTx
InnerTx o-- AccountMigrateTx
InnerTx o-- AccountUpgradeTx
InnerTx o-- SysUpgradeTx
InnerTx o-- DeclareFileTx
InnerTx o-- AnyTx

Forge.Tx --> Mcrypto.Signer
Forge.Tx --> Mcrypto.Hasher


ForgeSdk.Wallet --> Mcrypto.Signer
ForgeSdk.Wallet --> Mcrypto.Crypter
ForgeSdk.Wallet --> Mcrypto.Hasher


' Mcrypt definition

interface Mcrypto.Hasher {
  +hash(hasher, data)
}

interface Mcrypto.Signer {
  +keypair(signer)
  +sign!(signer, data, sk)
  +verify(signer, data, signature, pk)
}

interface Mcrypto.Crypter {
  +encrypt(crypter, plaintext, key)
  +decrypt(crypter, cyphertext, key, iv)
}

Mcrypto.Hasher <|-- Keccak
Mcrypto.Hasher <|-- Sha3
Mcrypto.Hasher <|-- Sha2

Mcrypto.Signer <|-- Ed25519
Mcrypto.Signer <|-- Secp256k1

Mcrypto.Crypter <|-- AES


' Consensus definition

interface Consensus.Engine {
  +init(engine, config)
  +gen_config(engine, config)
  +gen_genesis(engine, config)
  +gen_key(engine)
  +start(engine)
  +stop(engine)
  +restart(engine)
  +start_rpc(engine)
  +stop_rpc(engine)
}

class Consensus.Tendermint {
  atom :name
  map :config
  map :app_config
  map :app_genesis
  map :app_node_key
}
class Consensus.ForgeConsensus {
  atom :name
  map :config
  map :app_config
  map :app_genesis
  map :app_node_key
}
Consensus.Engine <|-- Consensus.Tendermint
Consensus.Engine <|-- Consensus.ForgeConsensus

Consensus -- Forge


' Storage definition

interface Storage.Engine {
  +init(engine, config)
  +gen_config(engine, config)
  +gen_key(engine)
  +start(engine)
  +stop(engine)
  +restart(engine)
}

class Storage.Ipfs {
  atom :name
  map :config
  map :app_config
}
class Storage.ForgeStorage {
  atom :name
  map :config
  map :app_config
}
Storage.Engine <|-- Storage.Ipfs
Storage.Engine <|-- Storage.ForgeStorage

 Storage -- Forge

@enduml
