// Import
const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

const ADDR = '5DTestUPts3kjeXSTMyerHihn1uwMfLj8vU8sqF7qYrFabHE';

async function main() {
	// Construct
	const wsProvider = new WsProvider('ws://127.0.0.1:9944');
	//const wsProvider = new WsProvider('ws://127.0.0.1:8546');
	const api = await ApiPromise.create({ provider: wsProvider });

	const keyring = new Keyring({ type: 'sr25519' });
	const alice = keyring.addFromUri('//Alice', {name: 'Alice default' });

	console.log(`${alice.meta.name}: has address ${alice.address} with public key [${alice.publicKey}]`);

	console.log(`api query: ${JSON.stringify(api.query.system.accountNonce)}`);

	const n = await api.query.system.accountNonce(alice.address);
	console.log(`n ${n}`);

	const unsub = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
		console.log(`#${lastHeader.number} was authored by `);
	});

	const {nonce, data, balance } = await api.query.system.account(alice.address);
	console.log(`balance of ${balance.free} and a nonce of ${nonce}`);

	const txHash = await api.tx.balances
	   .transfer(ADDR, 12345)
	   .signAndSend(alice);

	console.log(`submitted with hash ${txHash}`);
	

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
