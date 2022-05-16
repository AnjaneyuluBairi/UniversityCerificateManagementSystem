import React ,{Component} from 'react';
import { Helmet } from 'react-helmet';
import factory from '../ethereum/factory';
import {Card,Button, Image, Grid} from 'semantic-ui-react';
import Layout_home from '../components/Layout_home';
import Account from '../ethereum/Account';
import  {Link} from '../routes';

class ProjectHome extends Component{




onClick1=async(event)=>{
		event.preventDefault();
		
		Router.pushRoute('/campaigns/admin_login');	
	};



  render()
  {
    return (
    	
      <Layout_home>
  	<style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
        background-color : #D3D3D3;
      }
    `}
    </style>
    
    <br/><br/><br/><br/><br/>
    
    <div>
     	<p><font size = "100" color="teal"><center>University Certificate Management System</center></font></p>
     </div>
     
     <br/><br/><br/><br/><br/><br/><br/><br/>
     <Helmet>
      <title>Home page</title>
    </Helmet>
     <Grid>
     	<Grid.Column width ={5}>
		     <div class="ui card">
		  <div class="content">
		    <div class="header"><font size = "6" color = "teal" >Admin</font></div>
		  </div>
		  <div class="content">
		    <h4 class="ui sub header"><font size = "3">Activity:</font></h4>
		    <div class="ui small feed">
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     Admin has all the priviliges to add students, upload certificates and also give permissions to others
			  </div>
			</div>
		      </div>
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     
			  </div>
			</div>
		      </div>
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     
			  </div>
			</div>
		      </div>
		    </div>
		  </div>
		  <div class="extra content">
		     <Link route="./campaigns/admin_login" class = "ui button">
		     	<Button basic>
			  Login as admin
			</Button>
		      </Link>
		  </div>
		  </div>
		  
		  
	</Grid.Column>  
		  
	<Grid.Column width ={5}>
		  
		  <div class="ui card">
		  <div class="content">
		    <div class="header"><font size = "6" color = "teal" >Student</font></div>
		  </div>
		  <div class="content">
		    <h4 class="ui sub header"><font size = "3">Activity:</font></h4>
		    <div class="ui small feed">
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     Student can Log into their own account and can see their own details and files uploaded by admin
			  </div>
			</div>
		      </div>
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     
			  </div>
			</div>
		      </div>
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     
			  </div>
			</div>
		      </div>
		    </div>
		  </div>
		  <div class="extra content">
		     <Link route="./campaigns/student_login">
		     <Button basic>
       			 <a className="item">
        		  Login as student
       			 </a>
       			</Button>
      		</Link>

		  </div>
		  </div>
		</Grid.Column>
		
		
		<Grid.Column width ={5}>
		  
		  <div class="ui card">
		  <div class="content">
		    <div class="header"><font size = "6" color = "teal" >Others</font></div>
		  </div>
		  <div class="content">
		    <h4 class="ui sub header"><font size = "3">Activity:</font></h4>
		    <div class="ui small feed">
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     Others can request for any student details to the admin. Others get view permissions on the approval of admin
			  </div>
			</div>
		      </div>
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     
			  </div>
			</div>
		      </div>
		      <div class="event">
			<div class="content">
			  <div class="summary">
			     
			  </div>
			</div>
		      </div>
		    </div>
		  </div>
		  <div class="extra content">
		   <Link route="/campaigns/others_login">
		   <Button basic>
      		  <a className="item">
       		   Others Log in here
        		</a>
        		</Button>
      		</Link>
		  </div>
		  </div>
		</Grid.Column>
    
	</Grid>
    </Layout_home>
  );
  }
}
export default ProjectHome;
