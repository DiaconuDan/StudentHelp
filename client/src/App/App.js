import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import List from '../pages/List';
import Navigation from '../components/general/Navigation/Navigation';
import { SignUp } from '../components/general/SignUp/SignUp' ;
import { SignIn } from '../components/general/SignIn/SignIn' ;
import CompanyProfile from '../components/company/Profile/Profile';
import StudentProfile from '../components/student/Profile/Profile' ;
import Overview from '../components/student/Overview/Overview' ;
import SearchJobs from '../components/student/SearchJobs/SearchJobs' ;
import AddJob from '../components/company/AddJob/AddJob' ;
import Fulfilment from '../components/company/Fulfilment/Fulfilment' ;
import * as ROUTES from '../constants/routes';
import { withAuthentication } from '../components/general/Session/index';

const App = () => (
      <div>
        <Navigation />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={SignIn}/>
          <Route path={ROUTES.LIST} component={List}/>
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.COMPANY_PROFILE} component={CompanyProfile} />
          <Route path={ROUTES.COMPANY_ADD_JOB} component={AddJob} />
          <Route path={ROUTES.COMPANY_FULFILMENT} component={Fulfilment} />
          <Route path={ROUTES.STUDENT_PROFILE} component={StudentProfile} />
          <Route path={ROUTES.STUDENT_SEARCH_JOBS} component={SearchJobs} />
          <Route path={ROUTES.STUDENT_OVERVIEW} component={Overview} />
        </Switch>
      </div>
);


export default withAuthentication(App);