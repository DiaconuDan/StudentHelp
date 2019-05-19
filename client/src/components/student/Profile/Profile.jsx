import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';
import { AuthUserContext } from '../../general/Session/index';

const StudentProfile = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        console.log("profile auth user", authUser) 
      }
   
    </AuthUserContext.Consumer>
   <h1 style={{textAlign: "center"}}> Profile of the user </h1>
  </div>
);

const condition = authUser => authUser;


export default compose(
  withAuthorization(condition),
  withFirebase,
)(StudentProfile);