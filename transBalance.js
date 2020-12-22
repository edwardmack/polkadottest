// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

// test keyring
const {Keyring } = require('@polkadot/keyring');
const {randomAsU8a} = require('@polkadot/util-crypto');

// Known account we want to use (available on dev chain, with funds)
const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const AMOUNT = 10000;

async function main () {
	const provider = new WsProvider('ws://127.0.0.1:8546');
	//const provider = new WsProvider('ws://127.0.0.1:9944');

	// Create an await for the API
  const api = await ApiPromise.create({provider});

	const keyring = new Keyring({type: 'sr25519' });
	const alice = keyring.addFromUri('//Alice');

	const transfer = api.tx.balances.transfer(BOB, 12345);
	console.log(`sending ${transfer}`);

  // Sign and send the transaction using our account
  const hash = await transfer.signAndSend(alice);

  console.log('Transfer sent with hash', hash.toHex());

  aliceBal = await api.query.system.account(Alice);
  console.log(`Alice free bal ${JSON.stringify(aliceBal)}`);
  

}

main().catch(console.error);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

