// Import
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
	// Construct
	const wsProvider = new WsProvider('ws://127.0.0.1:8546');
	const api = await ApiPromise.create({ provider: wsProvider });


	const now = await api.query.timestamp.now(); // works

	console.log(`timestamp now: ${now}`);

	const chain = await api.rpc.system.chain(); // works

	console.log(`system chain: ${chain}`);

	
	const blockHash = await api.rpc.chain.getBlockHash();
	console.log(`current blockhash ${blockHash}`);

	const block = await api.rpc.chain.getBlock(blockHash);

	console.log(`current block: ${block}`);

	getblock(blockHash, api);

	const lastHeader = await api.rpc.chain.getHeader();
	console.log(`lastHeader ${lastHeader}`);
let countB = 0;

	const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
		console.log(`c ${countB} ${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
		console.log(`raw lastHeader: ${lastHeader}`);
		if(++countB === 3) {
			unsubHeads();
		}
		getBlockHash(lastHeader.number, api);
		//getblock(lastHeader.hash, api);
	});
	
	countF = 0;
	const unsubFins = await api.rpc.chain.subscribeFinalizedHeads((lastFin) => {
		console.log(`c ${countF} ${chain}: last fin block #${lastFin.number} has hash ${lastFin.hash}`);
		if(++countF === 3) {
			unsubFins();
		}
		//getBlockHash(lastFin.hash, api);
	});
	console.log('all done');

}

async function getBlockHash(number, api) {
	console.log(`getBlockHash number: ${number}`);
	const hash = await api.rpc.chain.getBlockHash(number);
	console.log(`block hash for ${number}: ${hash}`);
	getblock(hash, api);
}

async function getblock(hash, api) {
	console.log(`getBlock hash: ${hash}`);

		const block = await api.rpc.chain.getBlock(hash);
		console.log(`block ${block}`);
}
main();
