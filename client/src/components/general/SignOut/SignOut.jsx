import React from 'react';
import {SignOut} from 'styled-icons/octicons/SignOut' ;
import { withFirebase } from '../Firebase';
import styled from "styled-components";

const SignOutIcon = styled(SignOut)`
  height: 20px;
  margin-left: 10px;
`


const SignOutButton = ({ firebase }) => (
  <div onClick={firebase.doSignOut}>
    <SignOutIcon /> Sign Out
  </div> 
 
);

export default withFirebase(SignOutButton);