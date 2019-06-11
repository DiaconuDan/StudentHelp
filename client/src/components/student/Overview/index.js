import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';
import { AuthUserContext } from '../../general/Session/index';
import  Overview from './Overview' ;

const OverviewPage = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        <Overview authUser = {authUser} />
      }
   
    </AuthUserContext.Consumer>
  </div>
);

const condition = authUser => authUser && authUser.role === "STUDENT";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(OverviewPage);