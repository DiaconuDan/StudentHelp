import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut/SignOut';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session/index';
import styled from "styled-components" ;
import {LogIn} from "styled-icons/boxicons-regular/LogIn" ;


const LogInIcon = styled(LogIn)`
  height: 25px;
`

const SideNavigation = styled(SideNav)`
width: 95px;
`

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <SideNavigation>
  <SideNavigation.Nav defaultSelected="profile">
      <NavItem eventKey="profile">
          <NavText>
          <Link to={ROUTES.PROFILE} style={{ textDecoration: 'none' }}> <LogInIcon /> Profile </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="signUp">
      <NavText>
         <SignOutButton />
      </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);

const NavigationNonAuth = () => (
  <SideNavigation>
  <SideNavigation.Nav defaultSelected="signIn">
      <NavItem eventKey="signIn">
          <NavText>
          <Link to={ROUTES.SIGN_IN} style={{ textDecoration: 'none' }}> <LogInIcon /> Sign in </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="signUp">
      <NavText>
          <Link to={ROUTES.SIGN_UP} style={{ textDecoration: 'none' }}> <LogInIcon /> Sign up </Link> 
          </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);



export default Navigation;