exports.handler = async function (event, context) {
  process.argv.forEach(function (val, index, array) {
      // console.log(index + ': ' + val);
      if(index==2)sendAddress = val;
      if(index==3)sendAmount = val;
      if(index==4)secret = val;
  });
  var StellarSdk = require("stellar-sdk");
  var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");

  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  var sendAddress = null;
  var sendAmount = null;
  var secret = null;

  // var sendAddress = event.sendAddress;
  // var sendAmount = event.sendAmount;
  // var secret = event.secret;
  console.log("Addr: " + sendAddress);
  console.log("Secret: " + secret);
  console.log("Amount: " + sendAmount);

  // Function for sending ShareTest
  var sendShareWon = async function () {
    var sequence = await server.accounts().accountId(sendAddress).call().then(({ sequence }) => {return sequence;});
    var keypair = StellarSdk.Keypair.fromSecret(secret);

    console.log("sequence: " + sequence);

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

  return console.log(sendShareWon);
};

exports.handler();