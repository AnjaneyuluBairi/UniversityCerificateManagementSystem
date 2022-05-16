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
		id: '',
		password: '',
		errorMessage: '',
		loading: false
	}

	onSubmit = async (event)  =>
	{
		event.preventDefault();


		this.setState({loading:true, errorMessage: ''});
		try
		{
			const accounts = await web3.eth.getAccounts();

			const address = await factory.methods.studentlogin(this.state.id,this.state.password)
			.call();
			if(address!="0x0000000000000000000000000000000000000000")
			{
				Router.pushRoute(`/campaigns/notAdmin/${address}`);
			}
			else
			{
				alert("failed");
			}
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
						 Log in as Student
					</Header> 
					<Helmet>
      					<title>Student Login</title>
    					</Helmet>
						<Form size = 'large' onSubmit = {this.onSubmit} error = {!!this.state.errorMessage}>
						<Segment stacked>
						<Form.Input
							fluid
							icon = 'user'
							iconPosition = 'left'
							placeholder = 'user name' 
							value = {this.state.id}
							onChange = {event => this.setState({id: event.target.value})}
						/>
						<Form.Input
							fluid
							icon = 'lock'
							iconPosition = 'left'
							type = "password"
							placeholder = 'Password' 
							value = {this.state.password}
							onChange = {event => this.setState({password: event.target.value})}
						/>

					<Message error header = "oops!" content = {this.state.errorMessage} />

					<Button loading = {this.state.loading} color = 'teal' fluid size = 'large'>
							Login
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
