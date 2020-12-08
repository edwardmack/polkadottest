// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Known account we want to use (available on dev chain, with funds)
const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const Bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const TestAcct = '5CXrQshxdeXW1tjQf7h8WickrTBWQ1t5LYPqoDnqvPUYNzSf';
const Test2 = '5ENZyMWrjcmP9apHqpQBfA9ifEof85GNbPE58RWMN1KQ9jPL';

async function main () {
	const provider = new WsProvider('ws://127.0.0.1:8546');
	//const provider = new WsProvider('ws://127.0.0.1:9944');

  // Create an await for the API
  const api = await ApiPromise.create({provider});
	const qApi = api.query;

	var refl = new Reflector(qApi);
	console.log('props ' + refl.getProperties().join('\n'));
	console.log('methods ' + refl.getMethods().join('\n'));

/*
	
	funcs = refl.getProperties();
	for (var f in funcs) {
		var r = new Reflector(funcs[f]);
		console.log('f ' + funcs[f]);
		console.log('\tf: ' + r.getProperties().join('\n'));
	}
	*/

	const subApi = qApi.balances;
	console.log('f0 : ' + JSON.stringify(subApi, null, 2));
	var rSub = new Reflector(subApi);
	console.log('rMeth0: ' + rSub.getMethods().join('\n'));
	console.log('rdoc0: ' + rSub.getDocumentations().join('\n'));
	console.log('args: ' + getArgs(subApi.freeBalance));
	console.log('args2: ' + getArgs(subApi.totalIssuance));

	/*
	var properties = [];
	for (var key in qApi) {
		if(qApi.hasOwnProperty(key) && typeof qApi[key] !== 'function') {
			console.log('key ' + key);
		}
	}
	*/
	//let accountNonce = await api.query.system.accountNonce(Alice);
	//console.log(`acc nonce ${accountNonce}`);

	//extCount = await api.query.system.extrinsicCount();
	//console.log(`extCount ${JSON.stringify(extCount)}`);

	//allExt = await api.query.system.allExtrinsicsWeight();
	//console.log(`all extrinsic weight ${JSON.stringify(allExt)}`);

	//blockHash = await api.query.system.blockHash("1");

	//console.log(`block hash ${JSON.stringify(blockHash)}`);

	//number = await api.query.system.number();
	//console.log(`number ${JSON.stringify(number)}`);


}

main().catch(console.error);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
var Reflector = function(obj) {
	this.getProperties = function() {
		var properties = [];
		for (var prop in obj) {
			if (typeof obj[prop] != 'function') {
				properties.push(prop);
			}
		}
		return properties;
	};

	this.getMethods = function() {
		var methods = [];
		for (var meth in obj) {
			if(typeof obj[meth] == 'function') {
				methods.push(meth);
			}
		}
		return methods;
	};

	this.getDocumentations = function() {
		var docs = [];
		for (var doc in obj) {
			docs.push(typeof doc);
			
		}
		return docs;
	
	};
}

function getArgs(func) {
  // First match everything inside the function argument parens.
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

  // Split the arguments string into an array comma delimited.
  return args.split(',').map(function(arg) {
    // Ensure no inline comments are parsed and trim the whitespace.
    return arg.replace(/\/\*.*\*\//, '').trim();
  }).filter(function(arg) {
    // Ensure no undefined values are added.
    return arg;
  });
}
