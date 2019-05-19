import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';

const AddJob = () => (
  <div>
   <h1 style={{textAlign: "center"}}> Here the company will be adding a job</h1>
  </div>
);

const condition = authUser => authUser && authUser.role === "COMPANY";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(AddJob);