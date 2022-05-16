import web3 from './web3';
import StudentFactory from './build/StudentFactory.json';
const instance=new web3.eth.Contract(
  JSON.parse(StudentFactory.interface),
  '0x7b11377ED27FE515E318906AF821fE9846F614D1'
);

export default instance;
