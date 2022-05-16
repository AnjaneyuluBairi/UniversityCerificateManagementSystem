import React ,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import {Link,Router} from '../routes';

class RequestRowOther extends Component{

	onApprove= async()=>{
	
		const accounts=await web3.eth.getAccounts();
		const addr_stu=await factory.methods.login(this.props.idnum).call();
		if(this.props.access)
			Router.pushRoute(`/campaigns/notAdmin/${addr_stu}`);
		else
			console.log("rejext");
	};
	
	render(){
		const {Row,Cell}=Table;
		const {idnum,status,count,access}=this.props;
		return(
			<Row>
				<Cell>{count}</Cell>
				<Cell>{idnum}</Cell>
				<Cell>{status}</Cell>
				<Cell>
					<Button color="green" basic onClick={this.onApprove}>
						View
					</Button>
				</Cell>
			</Row>
		);
	}
}

export default RequestRowOther;
