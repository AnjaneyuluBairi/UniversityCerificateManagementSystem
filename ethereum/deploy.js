const HDWalletProvider=require('truffle-hdwallet-provider');
const Web3=require('web3');
const StudentFactory=require('./build/StudentFactory.json');
const {interface,bytecode}=require('./compile');
const provider=new HDWalletProvider('hold elite worth wait select script cool describe fall slam mango fashion',
	'https://rinkeby.infura.io/v3/23f37653c6a64c799c9b8ac0dec66dea');
const web3=new Web3(provider);
const deploy= async()=>{
	console.log('ima');
	const accounts=await web3.eth.getAccounts();
	console.log('Attempting to deploy from account',accounts[0]);

	const result=await new web3.eth.Contract(JSON.parse(StudentFactory.interface))
		.deploy({
			data: '0x'+ StudentFactory.bytecode , //add 0x to avoid low gas limit problem

		}).send({
		 gas:'4000000',from:accounts[0]});
	console.log('Contract deployed to ',result.options.address);
};
deploy();
