import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';
import { AuthUserContext } from '../../general/Session/index';

const Profile = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        console.log("profile auth user", authUser) 
      }
   
    </AuthUserContext.Consumer>
   <h1 style={{textAlign: "center"}}> Profile and other routes to be implemented.. </h1>
  </div>
);

const condition = authUser => authUser && authUser.role === "COMPANY";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(Profile);