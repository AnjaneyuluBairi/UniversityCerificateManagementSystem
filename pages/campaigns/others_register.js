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
		username: '',
		password: '',
		email:'',
		errorMessage: '',
		loading: false
	}

	onRegister = async (event)  =>
	{
		event.preventDefault();


		this.setState({loading:true, errorMessage: ''});
		try
		{
			const accounts=await web3.eth.getAccounts();
			await factory.methods.createOther(this.state.email,this.state.password,this.state.username).send({
			from:accounts[0],gas:'1000000'
			});
			alert("created successfully");
			Router.pushRoute('/campaigns/others_login');
		}
		catch(err)
		{
			this.setState({ errorMessage: err.message });
		}
		this.setState({loading:false});
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
						 Register
					</Header> 
					<Helmet>
      					<title>Others Register</title>
    					</Helmet>
					<Form size = 'large' onSubmit = {this.onRegister} error = {!!this.state.errorMessage}>
						<Segment stacked>
						<Form.Input
							fluid
							icon = 'user'
							iconPosition = 'left'
							placeholder = 'user name' 
							value = {this.state.username}
							onChange = {event => this.setState({username: event.target.value})}
						/>
						<Form.Input
							fluid
							icon = 'user'
							iconPosition = 'left'
							placeholder="email"
							value={this.state.email}
							onChange={event=>this.setState({email:event.target.value})}
						/>

						<Form.Input
							fluid
							icon = 'lock'
							iconPosition = 'left'
							type="password"
							placeholder="password"
							value = {this.state.password}
							onChange = {event => this.setState({password: event.target.value})}
						/>
						
					<Message error header = "oops!" content = {this.state.errorMessage} />

					<Button loading = {this.state.loading} color = 'teal' fluid size = 'large'>
							Register
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
