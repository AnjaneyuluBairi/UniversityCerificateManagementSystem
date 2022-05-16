import React from 'react';
import {Menu }from 'semantic-ui-react';
import {Link} from '../routes';

export default ()=>{
  return(
    <Menu style={{marginTop:'10px'}}>
      <Link route="./campaigns/admin_login" class = "ui button">
        <a className="item" class = "ui button">
          Admin Login
        </a>
      </Link>

      <Menu.Menu position="right">
      <Link route="./campaigns/student_login">
        <a className="item">
          Student Login
        </a>
      </Link>

      <Link route="/campaigns/others_login">
        <a className="item">
          Others
        </a>
      </Link>

      </Menu.Menu>
    </Menu>
  );
};
