import React from 'react';
import {Menu }from 'semantic-ui-react';
import {Link} from '../routes';


export default ()=>{
  return(
    <Menu style={{marginTop:'10px'}}>
      <Link >
        <a className="item">
          Welcome Admin
        </a>
      </Link>

      <Menu.Menu position="right">
      <Link route="/">
        <a className="item">
          Log out
        </a>
      </Link>
      </Menu.Menu>
    </Menu>
  );
};
