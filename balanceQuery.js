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

	await sleep(1000)
//	babeAuths = await api.query.babe.authorities();
//	console.log(`babe auths ${JSON.stringify(babeAuths)}`);

	totalIss = await api.query.balances.totalIssuance();
	console.log(`totalIss ${JSON.stringify(totalIss)}`);

	await sleep(1000)
	freeBal = api.query.system.account(Alice);
	//freeBal = await api.query.balances.freeBalance(Alice);
	console.log(`Alice free bal ${JSON.stringify(freeBal)}`);
/*	
	await sleep(1000)
	freeBalBob = await api.query.balances.freeBalance(Bob);
	console.log(`Bob free bal ${JSON.stringify(freeBalBob)}`);
	
	await sleep(1000)
	freeBalTestAcct = await api.query.balances.freeBalance(TestAcct);
	console.log(`TestAcct free bal ${JSON.stringify(freeBalTestAcct)}`);
	
	await sleep(1000)
	freeBalTest2 = await api.query.balances.freeBalance(Test2);
	console.log(`Test2 free bal ${JSON.stringify(freeBalTest2)}`);
*/
/*
  // Retrieve the initial balance. Since the call has no callback, it is simply a promise
  // that resolves to the current on-chain value
  let { data: { free: previousFree }, nonce: previousNonce } = await api.query.balances.totalissuance();

  console.log(`${Alice} has a balance of ${previousFree}, nonce ${previousNonce}`);
  console.log(`You may leave this example running and start example 06 or transfer any value to ${Alice}`);

  // Here we subscribe to any balance changes and update the on-screen value
  api.query.system.account(Alice, ({ data: { free: currentFree }, nonce: currentNonce }) => {
    // Calculate the delta
    const change = currentFree.sub(previousFree);

    // Only display positive value changes (Since we are pulling `previous` above already,
    // the initial balance change will also be zero)
    if (!change.isZero()) {
      console.log(`New balance change of ${change}, nonce ${currentNonce}`);

      previousFree = currentFree;
      previousNonce = currentNonce;
    }
  });
  */
}

main().catch(console.error);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

