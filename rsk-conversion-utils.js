var bs58 = require('bs58');
var wallet = require('ethereumjs-wallet').default;
var convertHex = require('convert-hex');
var sha256 = require('js-sha256');

function keyBtcToRskInBytes(privKeyAsExportedByBitcoinDumpprivkey) {
    var decodedKey = bs58.decode(privKeyAsExportedByBitcoinDumpprivkey);
    var checksumLength = privKeyAsExportedByBitcoinDumpprivkey.length === 52 ? 5 : 4;
    var privKeyBytes = decodedKey.slice(1, decodedKey.length - checksumLength);
    return privKeyBytes;
}

function privKeyToRskFormat(btcPrivateKey) {
	var privKeyBytes = keyBtcToRskInBytes(btcPrivateKey);
	var privKeyInRskFormat = new Buffer(privKeyBytes).toString('hex');
	return privKeyInRskFormat;
}

function getRskAddress(btcPrivateKey) {
	var myWallet = wallet.fromPrivateKey(new Buffer(keyBtcToRskInBytes(btcPrivateKey)));
	var addressInRskFormat = myWallet.getAddress();
	return addressInRskFormat.toString('hex');
}

function getBtcPrivateKey(btcNet, rskAddress) {
	var addressArray = convertHex.hexToBytes(rskAddress);
	var partialResult = new Array();
	var result = new Array();

	if(btcNet === 'MAIN_NET') {
		partialResult.push(0x80);
	} else {
		partialResult.push(0xEF);
	}
	for (var i = 0;  i < addressArray.length; i++) {
		partialResult.push(addressArray[i]);
	}
	partialResult.push(0x01);
	var check = convertHex.hexToBytes(sha256(convertHex.hexToBytes(sha256(partialResult))));

	for (var i = 0;  i < partialResult.length; i++) {
		result.push(partialResult[i]);
	}
	for (var i = 0;  i < 4; i++) {
		result.push(check[i]);
	}

	return bs58.encode(result);
}

module.exports = {
	privKeyToRskFormat: function (btcPrivateKey) {
		return privKeyToRskFormat(btcPrivateKey);
	},
	getRskAddress: function (btcPrivateKey) {
		return getRskAddress(btcPrivateKey);
	},
	getBtcPrivateKey: function (btcNet, rskAddress) {
		return getBtcPrivateKey(btcNet, rskAddress);
	}
};

