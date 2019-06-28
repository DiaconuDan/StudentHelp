import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut/SignOut";
import SideNav, { NavItem, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import * as ROUTES from "../../../constants/routes";
import { AuthUserContext } from "../Session/index";
import styled from "styled-components";
import { LogIn } from "styled-icons/boxicons-regular/LogIn";
import { PersonPin } from "styled-icons/material/PersonPin";
import { DocumentText } from "styled-icons/typicons/DocumentText";
import { SearchAlt2 } from "styled-icons/boxicons-regular/SearchAlt2";
import { LocalPostOffice } from "styled-icons/material/LocalPostOffice";
import { DocumentAdd } from "styled-icons/typicons/DocumentAdd";

import { StatsDots } from "styled-icons/icomoon/StatsDots";
const SearchAlt2Icon = styled(SearchAlt2)`
  height: 23px;
  margin-left: 5px;
  padding-right: 2px;
`;

const AddJobIcon = styled(DocumentAdd)`
  height: 23px;
  margin-left: 5px;
  padding-right: 2px;
`;

const FulfilmentIcon = styled(StatsDots)`
  height: 20px;
  margin-left: 8px;
  padding-right: 2px;
`;
const RegisterIcon = styled(LocalPostOffice)`
  height: 25px;
  margin-left: 5px;
`;
const LogInIcon = styled(LogIn)`
  height: 25px;
`;

const DocumentTextIcon = styled(DocumentText)`
  height: 23px;
  margin-left: 5px;
  padding-right: 2px;
`;

const PersonPinIcon = styled(PersonPin)`
  height: 23px;
  margin-left: 7px;
  padding-right: 5px;
`;

const SideNavigation = styled(SideNav)`
  width: 95px;
`;

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) =>
  authUser.role === "COMPANY" ? (
    <NavigationCompanyAuth />
  ) : (
    <NavigationStudentAuth />
  );

const NavigationCompanyAuth = () => (
  <SideNavigation style={{ background: "#57308b", color: "#FFF", width: 115 }}>
    <SideNavigation.Nav defaultSelected="fulfilment">
      <NavItem eventKey="fulfilment">
        <NavText>
          <Link
            to={ROUTES.COMPANY_FULFILMENT}
            style={{ textDecoration: "none" }}
          >
            {" "}
            <FulfilmentIcon /> Fulfilment{" "}
          </Link>
        </NavText>
      </NavItem>
      <NavItem eventKey="addJob">
        <NavText>
          <Link to={ROUTES.COMPANY_ADD_JOB} style={{ textDecoration: "none" }}>
            {" "}
            <AddJobIcon /> Add Job{" "}
          </Link>
        </NavText>
      </NavItem>
      <NavItem eventKey="profile" style={{ marginTop: 10 }}>
        <NavText>
          <Link to={ROUTES.COMPANY_PROFILE} style={{ textDecoration: "none" }}>
            {" "}
            <PersonPinIcon /> Profile{" "}
          </Link>
        </NavText>
      </NavItem>

      <NavItem eventKey="signOut" navitemStyle={{ marginTop: 10 }}>
        <NavText>
          <SignOutButton />
        </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);

const NavigationStudentAuth = () => (
  <SideNavigation style={{ background: "#57308b", color: "#FFF", width: 115 }}>
    <SideNavigation.Nav defaultSelected="searchJobs">
      <NavItem eventKey="searchJobs">
        <NavText>
          <Link
            to={ROUTES.STUDENT_SEARCH_JOBS}
            style={{ textDecoration: "none" }}
          >
            <SearchAlt2Icon /> Jobs
          </Link>
        </NavText>
      </NavItem>
      <NavItem eventKey="overview">
        <NavText>
          <Link to={ROUTES.STUDENT_OVERVIEW} style={{ textDecoration: "none" }}>
            {" "}
            <DocumentTextIcon /> Overview{" "}
          </Link>
        </NavText>
      </NavItem>
      <NavItem eventKey="profile" style={{ marginTop: 10 }}>
        <NavText>
          <Link to={ROUTES.STUDENT_PROFILE} style={{ textDecoration: "none" }}>
            {" "}
            <PersonPinIcon /> Profile{" "}
          </Link>
        </NavText>
      </NavItem>
      <NavItem eventKey="signOut" navitemStyle={{ marginTop: 10 }}>
        <NavText>
          <SignOutButton />
        </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);

const NavigationNonAuth = () => (
  <SideNavigation style={{ background: "#57308b", color: "#FFF" }}>
    <SideNavigation.Nav defaultSelected="signIn">
      <NavItem eventKey="signIn">
        <NavText>
          <Link to={ROUTES.SIGN_IN} style={{ textDecoration: "none" }}>
            {" "}
            <LogInIcon /> Login{" "}
          </Link>
        </NavText>
      </NavItem>
      <NavItem eventKey="signUp">
        <NavText>
          <Link to={ROUTES.SIGN_UP} style={{ textDecoration: "none" }}>
            {" "}
            <RegisterIcon /> Register{" "}
          </Link>
        </NavText>
      </NavItem>
    </SideNavigation.Nav>
  </SideNavigation>
);

export default Navigation;
