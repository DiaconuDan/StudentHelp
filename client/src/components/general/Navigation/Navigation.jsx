import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut/SignOut';
import SideNav, {  NavItem, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import * as ROUTES from '../../../constants/routes' ;
import { AuthUserContext } from '../Session/index';
import styled from "styled-components" ;
import {LogIn} from "styled-icons/boxicons-regular/LogIn" ;
import {AddressCard} from "styled-icons/fa-regular/AddressCard" ;

const LogInIcon = styled(LogIn)`
  height: 25px;
`

const ProfileIcon = styled(AddressCard)`
  height: 20px;
  margin-left: 10px;
  padding-right: 5px;
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
  <SideNavigation style={{ background: '#57308b', color: '#FFF', width: 115}}>
  <SideNavigation.Nav defaultSelected="fulfilment">
      <NavItem eventKey="fulfilment" style={{ marginTop: 5 }}>
          <NavText>
          <Link to={ROUTES.COMPANY_FULFILMENT} style={{ textDecoration: 'none'}}> <LogInIcon /> Fulfilment </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="addJob" style={{ marginTop: 20 }}>
          <NavText>
          <Link to={ROUTES.COMPANY_ADD_JOB} style={{ textDecoration: 'none' }}> <LogInIcon /> Add Job </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="profile"  style={{ marginTop: 20 }}>
          <NavText>
          <Link to={ROUTES.COMPANY_PROFILE} style={{ textDecoration: 'none' }}> <ProfileIcon /> Profile </Link>
          </NavText>
      </NavItem>
      <NavItem eventKey="signOut" navitemStyle={{marginTop:450, marginLeft: 10}}>
      <NavText>
         <SignOutButton />
      </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);

const NavigationStudentAuth = () => (
  <SideNavigation style={{ background: '#57308b', color: '#FFF', width: 115}}>
  <SideNavigation.Nav defaultSelected="searchJobs">
      <NavItem eventKey="searchJobs" style={{ marginTop: 5}}>
          <NavText>
          <Link to={ROUTES.STUDENT_SEARCH_JOBS} style={{ textDecoration: 'none' }}> <LogInIcon /> Search Jobs </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="overview" style={{ marginTop: 20 }}>
          <NavText>
          <Link to={ROUTES.STUDENT_OVERVIEW} style={{ textDecoration: 'none' }}> <LogInIcon /> Overview </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="profile" style={{ marginTop: 20 }}>
          <NavText>
          <Link to={ROUTES.STUDENT_PROFILE} style={{ textDecoration: 'none' }}> <LogInIcon /> Profile </Link> 
          </NavText>
      </NavItem>
      <NavItem eventKey="signUp" navitemStyle={{marginTop:450, marginLeft: 10}}>
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