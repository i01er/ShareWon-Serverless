exports.handler = async (event) => {
  var sendAddress = event.sendAddress;
  var sendAmount = event.sendAmount;
  var secret = event.secret;
  var StellarSdk = require("stellar-sdk");
  var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  const fee = await server.fetchBaseFee();
  var keypair = StellarSdk.Keypair.fromSecret(secrets);
  const account = await server.loadAccount(keypair.publicKey());

  var transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET
  })
      .addOperation(StellarSdk.Operation.payment({
          destination: sendAddress,
          asset: sharewon,
          amount: sendAmount.toString()
      }))
      .setTimeout(30)
      .build();

  transaction.sign(keypair);
  try {
      const transactionResult = await server.submitTransaction(transaction);
      var resp = {
          statusCode: 200,
          body: JSON.stringify({
              successful: true,
              message: "Success! View the transaction at: " + transactionResult._links.transaction.href
          })
      };
      return resp;
  } catch (e) {
      var resp = {
          statusCode: 400,
          body: JSON.stringify({
              successful: false,
              message: "An error has occured: " + e
          })
      };
      return resp;
  }
};