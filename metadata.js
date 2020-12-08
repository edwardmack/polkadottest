// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');
const prompt = require('prompt-sync')();
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
	
	const metadata = await api.rpc.state.getMetadata();
	// console.log(`metadata: ${metadata}`);

	/*
	console.log('formatted: ' + JSON.stringify(metadata.asLatest.toHuman(), null, 2) );

	console.log('modules '+ metadata.asLatest.modules.length);

	console.log('module[0] '+ JSON.stringify( metadata.asLatest.modules[0].toHuman(), null, 2));

	console.log('items2: ' + JSON.stringify(metadata.asLatest.modules[0].storage.value.items[0].toHuman(), null, 2));
	*/
	const modules = metadata.asV8.modules;
	
	for (var m in modules) {
		console.log(m + ' ' + modules[m].name);
	}

	while(true) {
		const modNum = prompt('Choose module:');
		console.log('module[0] '+ JSON.stringify( modules[modNum].calls.toHuman(), null, 2));
	}	
}

main().catch(console.error);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

