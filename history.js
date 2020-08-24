exports.handler = async (event) => {
	var StellarSdk = require("stellar-sdk");
	const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
	const accountId = event.address;
	var history = [];

	var gethistory = await server.payments()
		.forAccount(accountId)
		.call().catch(function (e) {
			var resp = {
				statusCode: 400,
				body: JSON.stringify({
					successful: false,
					message: "An error has occured: " + e
				})
			};

			return resp;
		});

	for (var i in gethistory.records) {
		var result = {};
		if (gethistory.records[i].asset_code == "ShareTEST") {
			result.to = gethistory.records[i].to;
			result.from = gethistory.records[i].from;
			result.asset_code = gethistory.records[i].asset_code;
			result.amount = gethistory.records[i].amount;
			history.push(result);
		}
	}

	var resp = {
		statusCode: 200,
		body: JSON.stringify({
			successful: true,
			history: history
		})
	};

	return resp;
};

exports.handler().then(console.log);