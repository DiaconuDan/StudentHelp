import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import List from '../pages/List';
import Navigation from '../components/general/Navigation/Navigation';
import { SignUp } from '../components/general/SignUp/SignUp' ;
import { SignIn } from '../components/general/SignIn/SignIn' ;
import CompanyProfilePage from '../components/company/Profile/index';
import StudentProfilePage from '../components/student/Profile/index' ;
import Overview from '../components/student/Overview/Overview' ;
import SearchJobs from '../components/student/SearchJobs/SearchJobs' ;
import AddJob from '../components/company/AddJob/AddJob' ;
import FulfilmentPage from '../components/company/Fulfilment/index' ;
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
          <Route path={ROUTES.COMPANY_PROFILE} component={CompanyProfilePage} />
          <Route path={ROUTES.COMPANY_ADD_JOB} component={AddJob} />
          <Route path={ROUTES.COMPANY_FULFILMENT} component={FulfilmentPage} />
          <Route path={ROUTES.STUDENT_PROFILE} component={StudentProfilePage} />
          <Route path={ROUTES.STUDENT_SEARCH_JOBS} component={SearchJobs} />
          <Route path={ROUTES.STUDENT_OVERVIEW} component={Overview} />
        </Switch>
      </div>
);


export default withAuthentication(App);