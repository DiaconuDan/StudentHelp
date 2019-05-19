import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';

const Overview = () => (
  <div>
   <h2 style={{textAlign: "center"}}> Here the user will see the overall situation of his answers to jobs</h2>
  </div>
);

const condition = authUser => authUser && authUser.role === "STUDENT";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(Overview);