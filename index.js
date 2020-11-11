// Import
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
// Construct
const wsProvider = new WsProvider('ws://127.0.0.1:8546');
//const wsProvider = new WsProvider('ws://127.0.0.1:9944');
//const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });

//console.log(api.genesisHash.toHex()); // works
//console.log(api.consts.babe.epochDuration.toNumber());
const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';

	const now = await api.query.timestamp.now(); // works
//	const { nonce, data: balance } = await api.query.system.account(ADDR);
//	console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

	console.log(`timestamp now: ${now}`);

	const chain = await api.rpc.system.chain(); // works

	console.log(`system chain: ${chain}`);

	
	const blockHash = await api.rpc.chain.getBlockHash();
	console.log(`current blockhash ${blockHash}`);

	const block = await api.rpc.chain.getBlock(blockHash);

	console.log(`current block: ${block}`);


	const lastHeader = await api.rpc.chain.getHeader();
	console.log(`lastHeader ${lastHeader}`);
let count = 0;

	const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
		console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
		if(++count === 10) {
			unsubHeads();
		}
	});
	count = 0;
	const unsubFins = await api.rpc.chain.subscribeFinalizedHeads((lastFin) => {
		console.log(`${chain}: last fin block #${lastFin.number} has hash ${lastFin.hash}`);
		if(++count === 10) {
			unsubFins();
		}
		getblock(lastFin.hash, api);
	});

}


async function getblock(hash, api) {

		const block = await api.rpc.chain.getBlock(hash);
		console.log(`block ${block.header}`);
}
main();
