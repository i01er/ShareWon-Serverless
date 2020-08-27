# ShareWon-Serverless [TESTING]
The Serverless function of ShareWon Wallet. This project is using AWS Lambda and API Gateway to provide different serverless functions for the ShareWon wallet. However, some of the essential features may require modifying local source code.

### Create Wallet Function
API Endpoint

```https://rj8xxfulmk.execute-api.us-east-2.amazonaws.com/testing/create```

Request Method
```
POST
```

Request Body
```
{
    "userID": "Chris1135"
}
```

Return Format
```
{
  "statusCode": 200,
  "body": "{\"successful\":true,
    \"userID\":\"Chris1135\",
    \"PublicKey\":\"GAXJ4ZXEBNYOZSDC5G6BLWGISYUOEL4R76WJLOI62RBAPEL7KE5VCKLG\",
    \"SecretKey\":\"SCTUVGZ3VABKO6PX7HMUR2QB2OQVOCCZWINVPH4GU6VZLEFTIDWTSLQD\"
  }"
}
```

### Sending ShareWon
API Endpoint

```https://rj8xxfulmk.execute-api.us-east-2.amazonaws.com/testing/send```

Request Method
```
POST
```

Request Body
```
{
    "sendAddress": "GBFV4G24Y7YSHKCBQVRITOBUKA5PNUIEPUQOKWIZ3IELR2K4U5RBVUYF",      //Receiver public key
    "sendAmount": 20,
    "secret": "SBHFOFRLXJHCPI646BWFD6XHA3ECN7E5VMWI3HNKHFBM5POIDW5MVPGE"            //The sender secret key
}
```

Return Format
```
{
  "statusCode": 200,
  "body": "{\"successful\":true,
    \"message\":\"Success! View the transaction at: https://horizon-testnet.stellar.org/transactions/7cb6ff2a4eacad6f7aa1c75065a85586e5d63465a02e5aaf9498f582e1089183\"
  }"
}
```

### Get Testing Funds
If you wish to get some ShareWon for testing transaction API, you can call ```getfund```.
<br>

API Endpoint

```https://rj8xxfulmk.execute-api.us-east-2.amazonaws.com/testing/getfund```

Request Method
```
POST
```

Request Body
```
{
  "sendAddress": "GCO42Y7IIP6TFRTKKD57VGMNGEULCOEJGOD32PGWM4M3HB2FAKYR3FWI"
}
```

Return Format
```
{
  "statusCode": 200,
  "body": "{\"successful\":true,
    \"message\":\"Success! View the transaction at: https://horizon-testnet.stellar.org/transactions/1346530a0f16510712148e780eb4966a6b927d3acae8d3e222792d4fd9dd23ec\"
  }"
}
```

### Check Balance
Check your ShareWon wallet balance.
<br>

API Endpoint

```https://rj8xxfulmk.execute-api.us-east-2.amazonaws.com/testing/balance```

Request Method
```
POST
```

Request Body
```
{
  "address": "GCO42Y7IIP6TFRTKKD57VGMNGEULCOEJGOD32PGWM4M3HB2FAKYR3FWI"
}
```

Return Format
```
{
    "statusCode": 200,
    "body": "{\"successful\":true,
      \"account\":\"GD2SIXBHFK7KB6OJRKBTNCV24J56ZOUKL2ZQLIJUBM2T2NFYV4QSRYPM\",
      \"assetName\":\"ShareTEST\",
      \"balance\":\"150.0000000\"
    }"
}
```

### History
Check your ShareWon wallet transaction history.
<br>

API Endpoint

```https://rj8xxfulmk.execute-api.us-east-2.amazonaws.com/testing/history```

Request Method
```
POST
```

Request Body
```
{
  "address": "GBM4FKY5VUEYP6GE4QV5S6LP3LRLKI3WYGXJH3MIOZYDZWADD25XNN6Y"
}
```

Return Format
```
{
  "statusCode": 200,
  "body": "{\"successful\":true,
  \"history\":[
    {\"to\":\"GBM4FKY5VUEYP6GE4QV5S6LP3LRLKI3WYGXJH3MIOZYDZWADD25XNN6Y\",
    \"from\":\"GAQAJNSSNHKQMDZVDZPCFJN7REHESNFNOVVCMIJ4AD57KJVO4QWUPCI3\",
    \"asset_code\":\"ShareTEST\",
    \"amount\":\"300.0000000\"},
    {\"to\":\"GBM4FKY5VUEYP6GE4QV5S6LP3LRLKI3WYGXJH3MIOZYDZWADD25XNN6Y\",
    \"from\":\"GAQAJNSSNHKQMDZVDZPCFJN7REHESNFNOVVCMIJ4AD57KJVO4QWUPCI3\",
    \"asset_code\":\"ShareTEST\",
    \"amount\":\"350.0000000\"},
    {\"to\":\"GBM4FKY5VUEYP6GE4QV5S6LP3LRLKI3WYGXJH3MIOZYDZWADD25XNN6Y\",
    \"from\":\"GAQAJNSSNHKQMDZVDZPCFJN7REHESNFNOVVCMIJ4AD57KJVO4QWUPCI3\",
    \"asset_code\":\"ShareTEST\",
    \"amount\":\"377.0000000\"},
    {\"to\":\"GAQAJNSSNHKQMDZVDZPCFJN7REHESNFNOVVCMIJ4AD57KJVO4QWUPCI3\",
    \"from\":\"GBM4FKY5VUEYP6GE4QV5S6LP3LRLKI3WYGXJH3MIOZYDZWADD25XNN6Y\",
    \"asset_code\":\"ShareTEST\",
    \"amount\":\"27.0000000\"}
  ]}"
}
```

## Test it on premise
If you wish to test it on premise, download this repo and run ```npm install```. After installed npm package, run ```node create.js``` to test create.js.

## Blockchain Explorer
Every transaction will be "on chain", therefore we could use Stellar Blockchain Explorer to view the transaction for more information.

[StellarChain.io TESTNET](http://testnet.stellarchain.io/)