const routes=require('next-routes')();

routes
  .add('/campaigns/new','/campaigns/new')
  .add('/campaigns/admin_home','/campaigns/admin_home')
  .add('/campaigns/others_login','/campaigns/others_login')
  .add('/campaigns/others_register','/campaigns/others_register')
  .add('/campaigns/:address','/campaigns/show')
  .add('/campaigns/notAdmin/:address','/campaigns/notAdmin/notShow')
  .add('/campaigns/notAdmin/others/:address','campaigns/notAdmin/others/notnotShow');

module.exports=routes;
