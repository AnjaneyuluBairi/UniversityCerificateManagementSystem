import React,{Component} from 'react';
import Layout from '../../components/Layout_admin_new';
import Account from '../../ethereum/Account'
import {Card,Grid,Button,Form,Input,Message,Table} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import {Link,Router} from '../../routes';
import ipfs from '../../ethereum/ipfs';
import { Helmet } from 'react-helmet';


class ImagesShow extends Component{
  state={
    description:'',
    errorMessage:'',
    errorMessage:'',
    loading:false,
    loading1:false,
    file:'',
    hash:'',
    ipfsLink:'',
    filename:''
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
  captureFile = (event)=>{

    event.preventDefault()
    const file = event.target.files[0];
    this.setState({filename:file.name});
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({file: Buffer(reader.result)});

    }
  }
  onSubmit = async (event) =>{
    event.preventDefault()
   
    this.setState({loading1:true});
    await ipfs.files.add(this.state.file,async (error,result) =>{
      if(error) throw error;
      else{
        this.setState({hash:result[0].hash,ipfsLink:'http://ipfs.io/ipfs/'+result[0].hash,loading1:false})
        this.upload()
      }
    });

  }
  upload = async ()=>{
        this.setState({loading1:true});
    await web3.eth.getAccounts( async (err,accounts) =>{
      if(err) throw err;
      else{
        try{
        
          console.log(this.state.ipfsLink);
          console.log(accounts);
          const account = await Account(this.props.address);
          
          await account.methods.addImage(this.state.filename,this.state.ipfsLink).send({
          from:accounts[0]
          })
          this.setState({loading1:false});
          alert("file uploaded successfully")
          Router.pushRoute(`/campaigns/${this.props.address}`)

        }
        catch(err){
          this.setState({errorMessage:err.message+' OR No address Specified in the metamask'});
          this.setState({loading1:false});
        }
      }
    });
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
        description:'Student\'s address '
        ,style:{overflowWrap:'break-word'}
      },
      {
        header:"B"+Id_Num,
        description:'ID number of student',
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
      		<title>Student Details</title>
    	</Helmet>
    	
    	
      <div>
        <Card fluid={true}>
          <Card.Content>
            <Card.Header>
              List of Files
            </Card.Header>
            {this.renderImages()}
          </Card.Content>
          <Card.Content extra>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage1} >
              <input id='fileinput'
                onChange={this.captureFile}
                type='file'
              /><br/>
                <br/>
              <Button loading={this.state.loading1} type='submit' content='upload' primary />
              <Message error header="Oops!" content={this.state.errorMessage1}/>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </Layout>
    );
  }
}
export default ImagesShow;
