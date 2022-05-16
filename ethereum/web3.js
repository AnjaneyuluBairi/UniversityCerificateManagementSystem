import Web3 from 'web3';

let web3;
if(typeof window!=='undefined' && typeof window.web3!=='undefined'){
  //we are in the browser and metamask is running
  web3=new Web3(window.web3.currentProvider);
}else {
  //We are on the server or metamask is not running
  const provider=new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/23f37653c6a64c799c9b8ac0dec66dea');
  web3=new Web3(provider);
}



export default web3;
