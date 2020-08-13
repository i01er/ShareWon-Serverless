exports.handler = async (event) => {
    var StellarSdk = require("stellar-sdk");
    var sharewon = new StellarSdk.Asset("ShareTEST", "GBMMVGV4BDIY2X3SKKH6OF2IYRKVO2EK4WVJRO3ZMTGQCBBK3NVXJ4QT");
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

    try {
        const account = await server.loadAccount(event.address);
        var resp = {
            statusCode: 200,
            body: JSON.stringify({
                successful: true,
                account: event.address,
                assetName: account.balances[0].asset_code,
                balance: account.balances[0].balance
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