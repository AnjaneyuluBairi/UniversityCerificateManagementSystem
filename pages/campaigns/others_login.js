import React, { Component } from 'react';
import Layout from '../../components/Layout_admin_login';
import { Form, Button, Input, Message, Grid, Header, Image, Segment } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { Helmet } from 'react-helmet';

class AccountCreate extends Component
{

	state = 
	{
		email: '',
		password: '',
		errorMessage: '',
		loading: false,
		address:''
	}

	onSubmit = async (event)  =>
	{
		event.preventDefault();


		this.setState({loading:true, errorMessage: ''});
		try
		{
			const accounts=await web3.eth.getAccounts();
			const address=await factory.methods.OtherLogin(this.state.email,this.state.password).call();
			this.setState({address});
			if(address!="0x0000000000000000000000000000000000000000")
			{
				Router.pushRoute(`/campaigns/notAdmin/others/${this.state.address}`);
			}
			else
				alert("failed");
		}
		catch(err)
		{
			this.setState({ errorMessage: err.message });
		}
		this.setState({loading:false});
	};
	
	onRegister=async(event)=>{
		event.preventDefault();
		
		Router.pushRoute('/campaigns/others_register');	
	};


	render()
	{
		return (
		<div className = 'login-form'>{}
			<Layout>
				<br/><br/><br/><br/>
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
						 Log in
					</Header> 
					<Helmet>
      					<title>Others Login</title>
    					</Helmet>
						<Form size = 'large' onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
						<Segment stacked>
						<Form.Input
							fluid
							icon = 'user'
							iconPosition = 'left'
							value = {this.state.email}
							onChange = {event => this.setState({email: event.target.value})} 
							placeholder="email"
						/>
						<Form.Input
							fluid
							icon = 'user'
							iconPosition = 'left'
							placeholder="password"
							type="password"
							value = {this.state.password}
							onChange = {event => this.setState({password: event.target.value})}
					
						/>
					
						<Message error header = "oops!" content = {this.state.errorMessage} />

						<Button loading = {this.state.loading} color = 'teal' fluid size = 'large'>
							Login
						</Button>
						<div>
							OR
						</div>
						<Button  onClick={this.onRegister} color = 'Gray' fluid size = 'large'>
							New User!! Register
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

export default AccountCreate;
