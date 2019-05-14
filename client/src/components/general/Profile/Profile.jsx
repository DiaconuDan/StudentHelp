import React from 'react';

import { withAuthorization } from '../general/Session';

const Profile = () => (
  <div>
   <h1 style={{textAlign: "center"}}> Profile and other routes to be implemented.. </h1>
  </div>
);

const condition = authUser => authUser;


export default withAuthorization(condition)(Profile);