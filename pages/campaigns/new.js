import React,{Component} from 'react';
import { Form, Button, Input, Message, Grid, Header, Image, Segment } from 'semantic-ui-react';
import Layout from '../../components/Layout_admin_new';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';
import { Helmet } from 'react-helmet';
class CampaignNew extends Component {

  state={
    idnum:'',
    name:'',
    year:'',
    branch:'',
    password:'',
    errorMessage:'',
    loading:false
  };

  onSubmit=async(event)=>{
      event.preventDefault();
      this.setState({loading:true,errorMessage:''});
      const accounts=await web3.eth.getAccounts();
      try{
        await factory.methods.createStudent(this.state.idnum,this.state.name,this.state.password,this.state.year,this.state.branch)
        .send({
          from:accounts[0]
        });

        Router.pushRoute('/campaigns/admin_home');
      }catch(err){
        this.setState({errorMessage:err.message});
    }
    this.setState({loading:false});
  };
  render() {
    return (
    	<div className = 'login-form'>{}
      <Layout>
       <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
        background-color : #D3D3D3;
      }
    `}
    </style>
	<Grid textAlign = 'center' style = {{ height: '100%' }} verticalAlign = 'middle' >
					<Grid.Column style = {{maxWidth : 450}}>
					<Header as = 'h2' color = 'teal' textAlign = 'center'>
						 Create New Student Account
					</Header> 
						<Helmet>
						      <title>Create New Student</title>
						 </Helmet>
						<Form size = 'large' onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
						<Segment stacked>
						<Form.Input
							fluid
							icon = 'user'
							iconPosition = 'left'
							placeholder = 'id' 
							value={this.state.idnum}
         					 onChange={event=>this.setState({idnum:event.target.value})}
						/>
						
						<Form.Input
							fluid
							icon = 'user'
							iconPosition = 'left'
							placeholder = 'name' 
							value={this.state.name}
         					 onChange={event=>this.setState({name:event.target.value})}
						/>
						<Form.Input
							fluid
							icon = 'lock'
							iconPosition = 'left'
							placeholder = 'Password' 
							type = "password"
    					      value={this.state.password}
        					  onChange={event=>this.setState({password:event.target.value})}
						/>
						<Form.Input
							fluid
							icon = 'tag'
							iconPosition = 'left'
							placeholder = 'year' 
							value={this.state.year}
          					onChange={event=>this.setState({year:event.target.value})}
						/>
						<Form.Input
							fluid
							icon = 'tag'
							iconPosition = 'left'
							placeholder = 'branch' 
							value={this.state.branch}
         					 onChange={event=>this.setState({branch:event.target.value})}
						/>
        
						<Message error header = "oops!" content = {this.state.errorMessage} />

						<Button loading = {this.state.loading} color = 'teal' fluid size = 'large'>
							Create
						</Button>
					</Segment>
				</Form>
				</Grid.Column>
			</Grid>
			</Layout>
			</div>
    );
  }
}

export default CampaignNew;
