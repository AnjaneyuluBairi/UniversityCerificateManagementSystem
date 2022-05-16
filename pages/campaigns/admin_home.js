import React ,{Component} from 'react';
import factory from '../../ethereum/factory';
import {Card,Button,Grid} from 'semantic-ui-react';
import Layout from '../../components/Layout_admin_home';
import Account from '../../ethereum/Account';
import  {Link} from '../../routes';
import { Helmet } from 'react-helmet';
class CampaignIndex extends Component{

  static async getInitialProps(){
    const students=await factory.methods.getcreatedStudents().call();
	var ids=Array();
	for(var i=0;i<students.length;i++)
		ids.push(await factory.methods.getStudent(students[i]).call());
    return {ids,students};
    
  }
    
  renderCampaigns(){
    const items=this.props.ids.map(id=>{
      return{
        header:"B"+id[1],
        description:(
          <Link route={`/campaigns/${id[0]}`}>
          <a>View Student</a>
          </Link>
        ),
        fluid:true
      };
    });

    return  <Card.Group items={items}/>;
  }

  render()
  {

    return (
      <Layout>
      <br/><br/>
        <div>
	<Helmet>
      <title>Admins page</title>
    </Helmet>
            
            <div>
            <Grid>
		        <Grid.Column width={6}>
				    <Link route="/campaigns/new">
				    <a>
				      <Button floated="right"
				        content="Create Student"
				        icon="add circle"
				        primary
				      />
				      </a>
				      </Link>
				      </Grid.Column>
				      <Grid.Column width={6}>
				      <Link route="/campaigns/notAdmin/others/requests/showReq">
				      	<a>
				      		<Button floated="right"
				      		
				        	content="View Requests"
				        	primary
				      		/>
				      	</a>
				      </Link>
		          </Grid.Column>
              </Grid><br/><br/>
              <center><h2>Accounts of Students</h2></center><br/><br/>
              </div>
              <div>
              {this.renderCampaigns()}
              </div>
          </div>
    </Layout>
  );
  }
}
export default CampaignIndex;
