// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Known account we want to use (available on dev chain, with funds)
const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

async function main () {
	//const provider = new WsProvider('ws://127.0.0.1:9944');
	const provider = new WsProvider('ws://127.0.0.1:8546');

	// Create an await for the API
  	const api = await ApiPromise.create({provider});

	freeBal = await api.query.system.account(Alice);
	console.log(`Alice free bal ${JSON.stringify(freeBal)}`);

	const hash = await api.rpc.chain.getBlockHash(1)
	const block = await api.rpc.chain.getBlock(hash)
	console.log(block.header)
}

main().catch(console.error);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

