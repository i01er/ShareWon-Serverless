# ShareWon-Serverless [TESTING]
The Serverless function of ShareWon Wallet. This project is using AWS Lambda and API Gateway to provide different serverless functions for the ShareWon wallet. However, some of the essential features may require modifying local source code.

### Create Wallet Function
API Endpoint

```https://rj8xxfulmk.execute-api.us-east-2.amazonaws.com/testing/create```

Return Format
```
{"statusCode":200,"body":"{\"successful\":true,\"PublicKey\":\"GCCLSNQLQSEQPR5CNVFTZBVA65E476XCTVEB4Z3UWAEPWRYZYHY5HGZB\",\"SecretKey\":\"SBXCG7KLRIP37HFACR6U2SKSY7C7RJ4LLBHLXIUQG223D2WDMRLPV53S\"}"}
```

### Sending ShareWon
API Endpoint

```https://rj8xxfulmk.execute-api.us-east-2.amazonaws.com/testing/send```

Request Body
```
{
    "sendAddress": "GBFV4G24Y7YSHKCBQVRITOBUKA5PNUIEPUQOKWIZ3IELR2K4U5RBVUYF",
    "sendAmount": 20,
    "secret": "SBHFOFRLXJHCPI646BWFD6XHA3ECN7E5VMWI3HNKHFBM5POIDW5MVPGE"
}
```

Return Format
```
{
  "statusCode": 200,
  "body": "{\"successful\":true,\"message\":\"Success! View the transaction at: https://horizon-testnet.stellar.org/transactions/867d54c51c361508643547efa1d7c86893c6d2bb81ff3b7174f8149cbdcfd4ed\"}"
}
```

## Test it on premise
If you wish to test it on premise, download this repo and run ```npm install```. After installed npm package, run ```node create.js``` to test create.js.

## Blockchain Explorer
Every transaction will be "on chain", therefore we could use Stellar Blockchain Explorer to view the transaction for more information.

[StellarChain.io TESTNET](http://testnet.stellarchain.io/)