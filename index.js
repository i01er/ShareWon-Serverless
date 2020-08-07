exports.handler = async function (event, context) {
  var StellarSdk = require("stellar-sdk");
  var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");

  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  var sendAddress = event.sendAddress;
  var sendAmount = event.sendAmount;
  var secret = event.secret;

  // Function for sending ShareTest
  var sendShareWon = async function () {
    var sequence = null;
    var keypair = StellarSdk.Keypair.fromSecret(secret);

    var source = new StellarSdk.Account(keypair.publicKey(), sequence);
    var transaction = new StellarSdk.TransactionBuilder(source, {
      fee: StellarSdk.BASE_FEE,
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
    console.log(transaction.toEnvelope().toXDR('base64'));

    try {
      const transactionResult = await server.submitTransaction(transaction);
      // console.log(JSON.stringify(transactionResult, null, 2));
      // console.log('\nSuccess! View the transaction at: ');
      // console.log(transactionResult._links.transaction.href);
      var resp = {
        statusCode: 200,
        body: JSON.stringify({
          successful: true,
          message: "Success! View the transaction at: " + transactionResult._links.transaction.href
        })
      };
      return resp;
    } catch (e) {
      // console.log('An error has occured:');
      // console.log(e);
      var resp = {
        statusCode: 500,
        body: JSON.stringify({
          successful: false,
          message: "An error has occured: " + e
        })
      };
      return resp;
    }
  }

  return sendShareWon;
};

exports.handler();