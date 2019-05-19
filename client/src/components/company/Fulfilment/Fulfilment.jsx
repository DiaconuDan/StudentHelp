import React from 'react';
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase" ;
import { withAuthorization } from '../../general/Session';

const Fulfilment = () => (
  <div>
   <h1 style={{textAlign: "center"}}> Here will be displayed the company job situation </h1>
  </div>
);

const condition = authUser => authUser && authUser.role === "COMPANY";


export default compose(
  withAuthorization(condition),
  withFirebase,
)(Fulfilment);