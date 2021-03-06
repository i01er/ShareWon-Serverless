exports.handler = async function (event) {
  var StellarSdk = require("stellar-sdk");
  var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  const fee = await server.fetchBaseFee();

  var keypair = StellarSdk.Keypair.fromSecret("SBNYGNRMC3WSAUTDQ7Y6ZUV2DGBJHOF4K4CAFIP7VSMHNSF3GGQTLUBM");

  // Trust ShareWon
  var changeTrust = async function (changeAccount) {
    server.accounts()
      .accountId(keypair.publicKey())
      .call()
      .then(async ({ sequence }) => {
        const account = new StellarSdk.Account(changeAccount.publicKey(), sequence);
        const transaction = new StellarSdk.TransactionBuilder(account, {
          fee,
          networkPassphrase: StellarSdk.Networks.TESTNET
        })
        .addOperation(
          StellarSdk.Operation.changeTrust({
            asset: sharewon
          }),
        )
        .setTimeout(30)
        .build();

        transaction.sign(keypair);
        console.log(transaction.toEnvelope().toXDR('base64'));

        try {
          console.log("try");
          const transactionResult = await server.submitTransaction(transaction);
        } catch (e) {
          console.log("Error: ");
          console.log(e);
        }
      })
  }
  changeTrust(keypair);
};

exports.handler().then(console.log);