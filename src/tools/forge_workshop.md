# Forge Workshop

The Forge Workshop lets developers create and test different types of transaction workflows and DID-based authentication requirements for any Forge-built application. 

Today, forge Workshop includes support for:

  - Trade-related transactions
  - Prebuild workflows and process/rules for all supported Tx types including multi-transaction scenarios
  - DID-based authentication including identity Types, DSA (Digital Signature algorithm) algorithms and Hash functions
  - Configurable metadata
  - Defining required claims including profiles and agreements
  - ABT Wallet mobile authentication
  
## How to run 

`WORKSHOP_CONFIG=path/of/the/config release/path/bin/abt_did_workshop console`

## How to use

Forge workshop is composed of two parts -- Application and Demo Cases. They are designed to let developers to experience different aspects of Forge transactions and DID Authentication protocols.

### Application

This part of Forge Workshop lets you try out how the ABT wallet and a forge-built application should interact with each other to finish the authentication process under DID Authentication Protocol. 

  - Step 1: Choose the DID type, DSA algorithm and the Hash algorithm to generate a DID.
  - Step 2: Input the basic information of your application prototype.
  - Step 3: Choose the profiles for users to provide and agreements for users to sign during the authentication process.
  - Step 4: Scan the QR code in the ABT wallet to finish the authentication process.
  - Step 5: If the authentication process finished successfully, you would be able to see the user information on the web page.

### Demo Cases

This part of Forge Workshop lets you quickly create a prototype of a Forge application and lets you to see how the ABT wallet and your application will work together to finish various transaction workflows. 

  - Step 1: Create a demo case by filling the up the following fields. Each demo case is considered as an application prototype.
      - `Name`: The name of your application.
      - `Subtitle`: The subtitle for your application.
      - `Description`: The detailed description of your applications.
      - `Icon URL`: The URL to the logo of your application.
      - `Deep link Path`: The deep link path used by ABT wallet. We suggest you to use the default value for now.
    The first four fields will affect how your application looks like on the ABT wallet.

  - Step 2: Create a transaction.
      - Click `Create New Transaction` button.
      - Select `PokeTx` in Transaction Type drop down menu.
      - Input a name and a description for this transaction. Users will see this information on ABT wallet.
      - Click `Create Transaction` button.
  
  - Step 3: Use wallet to send transaction.
      - **Make sure your ABT wallet and the workshop server are inside the sane local network.**
      - Open your ABT wallet
      - Scan the QR code of this PokeTx
      - Follow the guide to finish this transaction.
      - Now you should see an account is created for you in the wallet. The PokeTx will grand the account 25 TBA tokens but one account can poke once a day.

  - Step 4: Explore more transactions:
      - `TransferTx`: This transaction is one-way transfer. You can use this transaction to give tokens and/or assets to wallet users or to ask them for token and/or assets. For example, you can use this transaction to mimic coupon distribution process. You can set word `COUPON` as the asset title to offer. After users finish the transaction by scanning the QR code, they will get an asset representing a coupon.
      
      - `ExchangeTx`: This is a two-way transfer meaning both the application and the user are giving something to the other. For example, set the token to demand as 80, set the asset to demand as `COUPON`, set the asset to offer as `CELLPHONE`. After a user finish the transaction, she will transfer 80 TBA tokens and the `COUPON` asset to the application and receive a new asset representing a cellphone. You can also create another `ExchangeTx` with 100 tokens to demand and a same `CELLPHONE` asset to offer. Now you have two exchange transactions, the first one is for users who have the `COUPON` and the second one is for the ones who don't.
      
      - `UpdateAssetTx` and `ConsumeAssetTx`: Both of these two transactions are used to modify the asset in a certain way. The former one can update the data inside an asset, for example, change how many times a coupon asset can be used. The latter one is used to consume an asset. For example, once a ticket asset is consumed, it is not updatable nor transferable any more.

      - `Proof of Holding`: This operation does not send any transaction to the blockchain. This is designed to let the application ask users to prove they have the ownership of something. Now we support asking people to prove they at least have a certain amount of token and asking people is possess of a certain asset.