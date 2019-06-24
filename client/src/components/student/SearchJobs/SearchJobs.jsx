import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization,AuthUserContext } from '../../general/Session';
import Swiper from './Swiper' ;
import MediaCard from './MediaCard' ;


const SearchJobs = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser && <MediaCard authUser={authUser}  /> 
      }
    </AuthUserContext.Consumer>
  
  </div>
);

const condition = authUser => authUser && authUser.role === "STUDENT";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(SearchJobs);