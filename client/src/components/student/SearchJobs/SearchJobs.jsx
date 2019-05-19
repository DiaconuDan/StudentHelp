import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';

const SearchJobs = () => (
  <div>
   <h1 style={{textAlign: "center"}}> Here the user will search for jobs</h1>
  </div>
);

const condition = authUser => authUser && authUser.role === "STUDENT";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(SearchJobs);