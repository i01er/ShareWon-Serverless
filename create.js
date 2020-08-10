exports.handler = async function(event, context) {
	var StellarSdk = require("stellar-sdk");
	var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");
	var sourceAccount = StellarSdk.Keypair.fromSecret("SBHFOFRLXJHCPI646BWFD6XHA3ECN7E5VMWI3HNKHFBM5POIDW5MVPGE");

	const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

  	// Create new wallet account

	var createdAccount = StellarSdk.Keypair.random()

	const account = await server.loadAccount(sourceAccount.publicKey());
	const fee = await server.fetchBaseFee();
  
  var create = await server.accounts()
      .accountId(sourceAccount.publicKey())
      .call()
      .then(({ sequence }) => {
        const transaction = new StellarSdk.TransactionBuilder(account, {
          fee,
          networkPassphrase: StellarSdk.Networks.TESTNET
        })
          .addOperation(StellarSdk.Operation.createAccount({
            destination: createdAccount.publicKey(),
            startingBalance: '1'
          }))
          .addOperation(StellarSdk.Operation.changeTrust({
              asset: sharewon,
              source: createdAccount.publicKey()
          }))
          .setTimeout(30)
          .build()
        transaction.sign(sourceAccount)
        return server.submitTransaction(transaction)
      })
      .then(await function(results) {
        // console.log('Transaction', results._links.transaction.href);
        if(results.successful) {
        	console.log('New Keypair', createdAccount.publicKey(), createdAccount.secret());
        	console.log("account created");
        	var resp = {
            statusCode: 200,
            body: JSON.stringify({
              successful: true,
              PublicKey: createdAccount.publicKey(),
              SecretKey: createdAccount.secret()
            })
          };
        	return resp;
        } else {
          var resp = {
            statusCode: 500,
            body: JSON.stringify({
              successful: false,
              message: results
            })
          };
        	return resp;
        }
      });

  return create;
};

exports.handler();