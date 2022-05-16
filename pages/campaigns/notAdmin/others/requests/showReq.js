import React ,{Component} from 'react';
import {Link} from '../../../../../routes';
import Layout from '../../../../../components/Layout_admin_new';
import {Button,Table} from 'semantic-ui-react';
import factory from '../../../../../ethereum/factory';
import RequestRow from '../../../../../components/RequestRow';
import { Helmet } from 'react-helmet';

class RequestIndex extends Component{

	static async getInitialProps(props){
		
		const requestCount=await factory.methods.reqcount().call();
		
		const requests=await Promise.all(
			  Array(parseInt(requestCount)).fill().map((element,index)=>{
				return factory.methods.getRequest(index).call();
			})		
		);
		console.log(requests);
		return {requestCount,requests};
	
	}
	
	
	renderRow(){
		console.log(this.props.requests);
		return this.props.requests.map((request,index)=>{
			let s;
			let ap;
			if(request[3]){
				s="accepted";
				ap="Approved";
				}
			else{
				s="pending";
				ap="Approve"
				}
				
			return <RequestRow
				idnum={request[0]}
				address={request[1]}
				email={request[2]}
				status={s}
				index={request[4]}
				approve={ap}
			/>;
		});
	
	}
	
	
	
	render(){
		const{Header,Row,HeaderCell,Body}=Table;
	
		return(
			<Layout>
			<h3>Request List</h3>
				<Helmet>
      					<title>View Requests</title>
    				</Helmet>
				<Table>
					<Header>
						<Row>
							<HeaderCell>S.No</HeaderCell>
							<HeaderCell>Address</HeaderCell>
							<HeaderCell>email</HeaderCell>
							<HeaderCell>Id Num</HeaderCell>
							<HeaderCell>status</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
						</Row>
					</Header>
					<Body>
						{this.renderRow()}
					</Body>
				</Table>
			</Layout>
		);
	}

}

export default RequestIndex;
