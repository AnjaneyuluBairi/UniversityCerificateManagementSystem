pragma solidity ^0.4.25;

contract StudentFactory
{
    
    //Student Code Start
    struct Stu{
   		address addr;
   		uint idnum;
   		}
   		
   	
    
    
   	mapping(uint=>bool) checkids;
    mapping(uint => address) private createdAccounts;
    address[] public createdStudents; 
    mapping (address=>uint) private createdIds;
   mapping(address=>Stu)private Students;
   
   	
    function createStudent(uint Id, string name, string password, string year, string branch) public
    {
        require(!checkids[Id]);
        address newAccount = new Account(Id, msg.sender, name, password, year, branch);
        LOG[newAccount]=LoginStu(newAccount,Id,password);//lLoginStu structure push
        createdAccounts[Id] = newAccount; //mapping
        createdIds[newAccount]=Id;
        checkids[Id]=true;
        Students[newAccount]=Stu(newAccount,Id);
        createdStudents.push(newAccount); //array
        
        
    }
    
    //takes address return id
    function getCreatedId(address addr) public view returns(uint)
    {
    	return createdIds[addr];
    }
    
    
	//takes id returns address

	function login(uint id) public view returns (address)
    {
        return createdAccounts[id];
    }
    
    
    
    //to get total addresses of students
    function getcreatedStudents() public view returns (address[])
    {
      
       return createdStudents;
    }
    
    function getStudent(address addr)public view returns(address,uint){
        
       return (Students[addr].addr,Students[addr].idnum);
    }
    
    //Student Code end
    
    
    //Student login
    
        struct LoginStu
        {
            address stu_address;
            uint idnum;
            string password;
        }
        mapping(address=>LoginStu) private LOG;
    //end of student login
    
    function studentlogin(uint id,string password) public view returns(address){
        address addr=createdAccounts[id];
        string storage pwd=LOG[addr].password;
        if(keccak256(abi.encodePacked((pwd))) == keccak256(abi.encodePacked((password))))
            return addr;
        
        
    }
     // Othes code start
     
     
      struct Oth{
        address Others_address;
        string email;
        string password;
        string username;
    }
    
    
    address[] public ToatalOthers;
    mapping(string=>address) private createdOthers;
    mapping(address=>string) private cretedEmails;
    mapping(address=>Oth) private Others;
    
    
    function createOther(string email,string password,string username) public{
        address newOther=new Other(email,password,username);
        createdOthers[email]=newOther;
        cretedEmails[newOther]=email;
        Others[newOther]=Oth(newOther,email,password,username);
        ToatalOthers.push(newOther);
    }
    
    function OtherLogin(string memory email,string memory password)public view returns(address){
        address addr=createdOthers[email];
        string memory pwd=Others[addr].password;
        if(keccak256(abi.encodePacked((pwd))) == keccak256(abi.encodePacked((password))))
            return addr;
    }
    
    //Requests
     struct Req{
        address byAddress;
        string email;
        uint idnum;
        bool status;
        uint count;
    }
    
    struct Find
    {
        address addr;
        uint idnum;
    }
    
    //mapping(address=>Req) private Request;
    mapping(uint=>Req) private index;
   // Req[] public requests;
   uint public reqcount;
    
    function createRequest(address addr,string Email,uint id )public{
        
        //Request[addr]=Req(addr,Email,id,false,reqcount);
        //requests.push(Request[addr]);
       index[reqcount]=Req(addr,Email,id,false,reqcount);
        reqcount++;
    }
    
    function getRequest(uint indx) public view returns(uint,address,string,bool,uint){
        return (index[indx].idnum,index[indx].byAddress,index[indx].email,index[indx].status,index[indx].count);
    }
  
    function approveRequest(uint id) public{
        index[id].status=true;
    } 
    
    
    function getRequestCount() public view returns(uint){
      return reqcount;
    }

   
    
}

contract Account
{
   
    address public admin;
    uint public id;
    string public name;
    string  public password;
    string public year;
    string public branch;
    
    uint public imagesCount;
 
   struct Image{
        string ipfsHash;
        string ipfsLink;
    }
    mapping(uint => Image) private images;
    constructor(uint Id, address Admin, string Name,string Password,string Year,string Branch) public
    {
        admin = Admin;
        id = Id;
        name = Name;
        password = Password;
        year = Year;
        branch = Branch;
    }
    
    function getSummary() public view returns(uint){
        return id;
    }
    
    function addImage(string _ipfsHash, string _ipfsLink) public{
        images[imagesCount]=Image(_ipfsHash,_ipfsLink);
        imagesCount++;
    }
    function getImage(uint index) public view returns(string,string){
        return (images[index].ipfsHash,images[index].ipfsLink);
    }
    
}


contract Other{
    string public email;
    string public password;
    string public Username;
    
    struct OthReq{
        uint idnum;
        bool status;
        uint index;
    }
    uint public reqnum;
    mapping(uint=>OthReq) private myrequests; 
    mapping(uint=>uint) private index;
    mapping(uint=>bool) private reqstatus;
    
    constructor(string Email,string Password,string username) public
    {
        email=Email;
        password=Password;
        Username=username;
    }
    
    function pushReq(uint id) public  {
    	myrequests[reqnum]=OthReq(id,false,reqnum);
    	index[id]=reqnum;
    	reqstatus[id]=false;
    	reqnum++;
    }
    
   function getReq(uint indx)public view returns(uint,bool,uint){
        return(myrequests[indx].idnum,myrequests[indx].status,myrequests[indx].index);
    }
    
    function setReq(uint indx)public{
    	myrequests[index[indx]].status=true;
    	reqstatus[indx]=true;
    }
    
}
