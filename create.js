exports.handler = async function (event) {
  var StellarSdk = require("stellar-sdk");
  var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");
  var sourceAccount = StellarSdk.Keypair.fromSecret("SBHFOFRLXJHCPI646BWFD6XHA3ECN7E5VMWI3HNKHFBM5POIDW5MVPGE");

  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  // Create new wallet account
  var createdAccount = StellarSdk.Keypair.random()

  const account = await server.loadAccount(sourceAccount.publicKey());
  const fee = await server.fetchBaseFee();
  // const call = await server.accounts().accountId(sourceAccount.publicKey()).call();

  const createAccount = async function () {
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.createAccount({
        destination: createdAccount.publicKey(),
        startingBalance: '10'
      }))
      .setTimeout(30)
      .build()
    transaction.sign(sourceAccount)
    const resp = await server.submitTransaction(transaction);
    return console.log("New Keypair", createdAccount.publicKey(), createdAccount.secret());
  }

  const changeTrust = async function (changeAccount) {
    const call = await server.accounts().accountId(changeAccount.publicKey()).call();
    const sequence = call.sequence;

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
    transaction.sign(changeAccount);
    const transactionResult = await server.submitTransaction(transaction);
    return console.log("return changeTrust");
  }

  try {
    const create = await createAccount();
    const change = await changeTrust(createdAccount);
    var resp = {
      statusCode: 200,
      body: JSON.stringify({
        successful: true,
        // userID: event.userID,
        PublicKey: createdAccount.publicKey(),
        SecretKey: createdAccount.secret(),
      })
    };
    return resp;

  } catch (error) {
    var resp = {
      statusCode: 400,
      body: JSON.stringify({
        successful: false,
        message: error
      })
    };
    return resp;
  }
};

exports.handler().then(console.log);