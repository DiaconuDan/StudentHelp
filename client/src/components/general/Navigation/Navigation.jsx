import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut/SignOut';
import SideNav, {  NavItem, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as ROUTES from '../../../constants/routes' ;
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
        authUser  ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
      }
   
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ( {authUser} ) => (
  authUser.role === "COMPANY" ? <NavigationCompanyAuth /> : <NavigationStudentAuth />
);

const NavigationCompanyAuth = () => (
  <SideNavigation style={{ background: '#57308b', color: '#FFF'}}>
  <SideNavigation.Nav defaultSelected="profile">
      <NavItem eventKey="profile">
          <NavText>
          <Link to={ROUTES.PROFILE} style={{ textDecoration: 'none' }}> <LogInIcon /> CompanyPr </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="signUp" navitemStyle={{marginTop:580, marginLeft: 10}}>
      <NavText>
         <SignOutButton />
      </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);

const NavigationStudentAuth = () => (
  <SideNavigation style={{ background: '#57308b', color: '#FFF'}}>
  <SideNavigation.Nav defaultSelected="profile">
      <NavItem eventKey="profile">
          <NavText>
          <Link to={ROUTES.PROFILE} style={{ textDecoration: 'none' }}> <LogInIcon /> StudentPr </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="signUp" navitemStyle={{marginTop:580, marginLeft: 10}}>
      <NavText>
         <SignOutButton />
      </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);

const NavigationNonAuth = () => (
  <SideNavigation style={{ background: '#57308b', color: '#FFF'}}>
  <SideNavigation.Nav defaultSelected="signIn">
      <NavItem eventKey="signIn">
          <NavText>
          <Link to={ROUTES.SIGN_IN} style={{ textDecoration: 'none' }}> <LogInIcon /> Login </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="signUp">
      <NavText>
          <Link to={ROUTES.SIGN_UP} style={{ textDecoration: 'none' }}> <LogInIcon /> Register </Link> 
          </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);



export default Navigation;