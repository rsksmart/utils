$(document).ready(function(){
	$( "#toRskBtn" ).click(function() {
		try {
			var privKey = $( "#toRskInput" ).val();
			var privKeyInRskFormat = RSKUtils.privKeyToRskFormat(privKey);
			var rskAddress = RSKUtils.getRskAddress(privKey);
			$("#toRskResult").html('<h3>RSK Private Key: ' + privKeyInRskFormat + '</h3><h3>RSK Address: ' + rskAddress + '</h3>');
		} catch(err) {
			$("#toRskResult").html('<h3 class="has-error">' + err.message + '</h3>');
		}
	});

	$( "#toBtcBtn" ).click(function() {
		try {
			var privKey = $( "#toBtcInput" ).val();
			if(privKey === '') 
				throw new Error("Invalid RSK private key value");

			var net = $( "#btcNet" ).val();
			var btcKey = RSKUtils.getBtcPrivateKey(net, privKey);
			$("#toBtcResult").html('<h3>BTC Private Key: ' + btcKey + '</h3>');
		} catch(err) {
			$("#toBtcResult").html('<h3 class="has-error">' + err.message + '</h3>');
		}
	});
});
