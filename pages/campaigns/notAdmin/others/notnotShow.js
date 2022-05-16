import React,{Component} from 'react';
import Layout from '../../../../components/Layout_notnotshow';
import Account from '../../../../ethereum/Account';
import factory from '../../../../ethereum/factory';
import Other from '../../../../ethereum/Other';
import {Card,Grid,Button,Form,Input,Message,Table} from 'semantic-ui-react';
import web3 from '../../../../ethereum/web3';
import {Link,Router} from '../../../../routes';
import ipfs from '../../../../ethereum/ipfs';
import RequestRowOther from '../../../../components/RequestRowOther';
import { Helmet } from 'react-helmet';

class ImagesShowOther extends Component{
  state={
    idnum:'',
    errorMessage:'',
    errorMessage:'',
    loading:false,
    loading1:false,
    file:'',
    hash:'',
    ipfsLink:'',
  }
  static async getInitialProps(props){
    const address = props.query.address;
    const account = await Other(address);
    const username=await account.methods.Username().call();
    const email=await account.methods.email().call();
    var images = Array();
    const requestCount=await account.methods.reqnum().call();
    
    const requests=await Promise.all(
			  Array(parseInt(requestCount)).fill().map((element,index)=>{
				return account.methods.getReq(index).call();
			})		
		);
    return {username,email,address,requestCount,requests}
  }
 

  
  
  renderCards(){

	const username=this.props.username;
	const addr_other=this.props.address;
	const email=this.props.email;
    const items=[
      {
        header:addr_other,
        meta:'Address ',
        description:'your block chain address '
        ,style:{overflowWrap:'break-word'}
      },
      {
        header:email,
        meta:'your email',
        description:'details of guest',
      },
      {
      	header:username,
        meta:'Username',
        description:'details of guest',
      }
    ];

    return <Card.Group items={items}/>;
  }
  
  onSubmit=async(event)=>{
  	const accounts=await web3.eth.getAccounts();
  	const other=Other(this.props.address);
  	
  	const check=await other.methods.getCheck(this.state.idnum).call();
  	const check2=await factory.methods.getCheck(this.state.idnum).call();
  	if((!check) &&check2){
	  	await factory.methods.createRequest(this.props.address,this.props.email,this.state.idnum).send({
	  	from:accounts[0],gas:'1000000'
	  	});
	  	
	  	await other.methods.pushReq(this.state.idnum).send({
	  	from:accounts[0],gas:'1000000'
	  	}); 	
	  	location.reload();
	  	alert("request created");
	}else{
		alert("Request not Possible");
	}
  }
  
  
  renderRow(){
		
		return this.props.requests.map((request,index)=>{
			let s;
			if(request[1])
				s="ok";
			else
				s="pending";
			return <RequestRowOther
				idnum={request[0]}
				status={s}
				count={request[2]}
				access={request[1]}
			/>;
		});
	
	}
  
  
  render(){
  const{Header,Row,HeaderCell,Body}=Table;
    return(
      <Layout>
      <div>
      	<h1>{this.props.id}</h1>
        <h3>Your Details</h3>
        <Grid>
        	<Grid.Column width ={10}>
        	 {this.renderCards()}
        	</Grid.Column>


        	<Grid.Column width ={6}>
        	
	        	<Form onSubmit={this.onSubmit}>
		        	<Form.Field>
		        	<label> Make a New Request For Student Details</label>
		        	<Input label = "Id"  labelPosition = "right" 
		        	value={this.state.idnum}
          			onChange={event=>this.setState({idnum:event.target.value})}/>
		        	</Form.Field>
		        	<Button primary>
		        		Request
		        	</Button>
        	</Form>
        	</Grid.Column>
        </Grid>
        
        <h3>Request List</h3>
        <Helmet>
      	<title>Others Home</title>
    	</Helmet>
				<Table>
					<Header>
						<Row>
							<HeaderCell>S.No</HeaderCell>
							<HeaderCell>IdNum</HeaderCell>
							<HeaderCell>Status</HeaderCell>
							<HeaderCell>View</HeaderCell>
							
						</Row>
					</Header>
					<Body>
						{this.renderRow()}
					</Body>
				</Table>
      </div>
    </Layout>
    );
  }
}
export default ImagesShowOther;
