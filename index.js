exports.handler = async function (event, context) {
  var StellarSdk = require("https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/5.0.4/stellar-sdk.js-sdk");
  // var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");
  // var sourceAccount = StellarSdk.Keypair.fromSecret("SBHFOFRLXJHCPI646BWFD6XHA3ECN7E5VMWI3HNKHFBM5POIDW5MVPGE");
  console.log("StellarSdk");

  // const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
};

exports.handler();