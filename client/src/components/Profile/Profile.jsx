import React from 'react';

import { withAuthorization } from '../general/Session';

const Profile = () => (
  <div>
   <h1> Profile </h1>
  </div>
);

const condition = authUser => !!authUser;


export default withAuthorization(condition)(Profile);