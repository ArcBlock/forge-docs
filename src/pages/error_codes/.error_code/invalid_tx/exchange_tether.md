The transaction cannot pass sanity check. Possible Causes:
  1. Anti Land Attack: Sender and receiver address should not be equal
  2. Anti Replay Attack: This transaction has been seen in the chain and is treated as a replay tx.
  3. decode tx: This transaction includes `type-url` that can not be decoded properly.
  4. verify date: the transaction is expired.
  5. verify itx size: The size of itx in this transaction exceeds max size.
  6. verify signer: the multisig signer is invalid
  7. verify tx size: The size of this transaction exceeds max size.
  8. pre_pipeline extract signers: the multisig signer is invalid
