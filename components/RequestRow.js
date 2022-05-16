import React ,{Component} from 'react';
import {Table,Button} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import factory from '../ethereum/factory';
import Other from '../ethereum/Other';

class RequestRow extends Component{

	onApprove= async()=>{
		if(this.props.status=="pending")
		{
		const accounts=await web3.eth.getAccounts();
		await factory.methods.approveRequest(this.props.index).send({
			from:accounts[0] ,gas:'1000000'
		});
		
		const other=Other(this.props.address);
		console.log(this.props.idnum);
		console.log(this.props.address);
		await other.methods.setReq(this.props.idnum).send({
		from:accounts[0],gas:'1000000'
		});
		location.reload();
		}
		
		
	};
	
	render(){
		const {Row,Cell}=Table;
		const {idnum,address,email,status,index,approve}=this.props;
		
		return(
			<Row>
				<Cell>{index}</Cell>
				<Cell>{address}</Cell>
				<Cell>{email}</Cell>
				<Cell>{idnum}</Cell>
				<Cell>{status}</Cell>
				<Cell>
					<Button color="green" basic onClick={this.onApprove}>
					{approve+" "}
					</Button>
				</Cell>
			</Row>
		);
	}
}

export default RequestRow;
