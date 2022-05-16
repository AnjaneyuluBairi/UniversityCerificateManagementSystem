import React,{Component} from 'react';
import Layout from '../../../components/Layout_notshow';
import Account from '../../../ethereum/Account'
import {Card,Grid,Button,Form,Input,Message,Table} from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import {Link,Router} from '../../../routes';
import ipfs from '../../../ethereum/ipfs';
import { Helmet } from 'react-helmet';


class ImagesShowNotAdmin extends Component{
  state={
    description:'',
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
    const account = await Account(address);
    //e
    const id=await account.methods.id().call();
    const name = await account.methods.name().call();
    const year = await account.methods.year().call();
    const branch = await account.methods.branch().call();
    
    const imagesCount = await account.methods.imagesCount().call();
    var images = Array();
    for(var i=0;i<imagesCount;i++){
      images.push(await account.methods.getImage(i).call());
    }
    console.log(imagesCount);
    //e
    return {id,address,images,account, name, year, branch}
  }
 
  renderImages(){
    const items = this.props.images.map(image=> {
      return {
        header: image[0],
        description: <a href={image[1]} target='_blank'>View</a>,
        fluid:true
      }
    })
    return <Card.Group items={items}/>;
  }
  
  //added whole fn
  
  renderCards(){

	const Id_Num=this.props.id;
	const addr_student=this.props.address;
	const name_stu = this.props.name;
	const year_stu = this.props.year;
	const branch_stu = this.props.branch;
    const items=[
      {
        header:addr_student,
        meta:'Address of Student',
        description:'The Student address '
        ,style:{overflowWrap:'break-word'}
      },
      {
        header:"B"+Id_Num,
        meta:'id number of student',
        description:'details of student',
      },
      {
        header:name_stu,
        description:'Name of Student',
      },
      {
        header:year_stu,
        description:'year of student',
      },
      {
        header:branch_stu,
        description:'branch of student',
      },
    ];

    return <Card.Group items={items}/>;
  }
  
  
  
  
  
  header(){
  	if(this.props.messageCount == 0)
  	{
  		return <p>There are no Files</p>;
  	}
  	else
  	{
  		return (
  		<Card.Header>
             	Files of Students:
             	<br/><br/> 
            	</Card.Header>);
          }
  }
  
  
  
  
  
  
  render(){
    return(
      <Layout>
      <div>
      	<h1>B{this.props.id}</h1>
        <h3>Student Details Show</h3>
         {this.renderCards()}
      </div>
      
      <br/><br/><br/><br/>
      <Helmet>
      	<title>Student Home</title>
    	</Helmet>
      <div>
        <Card fluid={true}>
          <Card.Content>
       
             {this.header()}
         
            {this.renderImages()}
          </Card.Content>
        </Card>
      </div>
    </Layout>
    );
  }
}
export default ImagesShowNotAdmin;
