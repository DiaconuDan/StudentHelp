import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';
import { AuthUserContext } from '../../general/Session/index';
import  Profile from './Profile' ;

const StudentProfilePage = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        <Profile authUser = {authUser} />
      }
   
    </AuthUserContext.Consumer>
  </div>
);

const condition = authUser => authUser && authUser.role === "STUDENT";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(StudentProfilePage);