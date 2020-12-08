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
	console.log("sending");
	const hash = await transfer.signAndSend(alice);

	console.log('trans hash', hash.toHex());

// Subscribe to balance changes for our account
// const unsub = await api.query.system.account(Alice, ({ nonce, data: balance }) => {
//   console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
// });

	// const {nonce} = await api.query.system.account(Alice);

	let nonce = await api.query.system.accountNonce(Alice);
        console.log(`acc nonce ${nonce}`);

	const recipient = keyring.addFromSeed(randomAsU8a(32)).address;

  // // await sleep(1000)
	//  freeBal = await api.query.balances.freeBalance(Alice);
  //  console.log(`Alice free bal ${JSON.stringify(freeBal)}`);
  
	
	console.log(`keyring ${keyring}`);
	console.log(`alice keypair ${alicePair}`);
	console.log(`recipient  ${recipient}`);
console.log('Sending', AMOUNT, 'from', alicePair.address, 'to', recipient, 'with nonce', nonce.toString());

  // Do the transfer and track the actual status
  api.tx.balances
    .transfer(recipient, AMOUNT)
    .signAndSend(alicePair, { nonce }, ({ events = [], status }) => {
      console.log('Transaction status:', status.type);

      if (status.isInBlock) {
        console.log('Included at block hash', status.asInBlock.toHex());
        console.log('Events:');

        events.forEach(({ event: { data, method, section }, phase }) => {
          console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
        });
      } else if (status.isFinalized) {
        console.log('Finalized block hash', status.asFinalized.toHex());

        process.exit(0);
      }
    });


}

main().catch(console.error);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

