import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import List from '../pages/List';
import Navigation from '../components/general/Navigation/Navigation';
import { SignUp } from '../components/general/SignUp/SignUp' ;
import { SignIn } from '../components/general/SignIn/SignIn' ;
import Profile from '../components/Profile/Profile';
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
          <Route path={ROUTES.PROFILE} component={Profile} />
        </Switch>
      </div>
);


export default withAuthentication(App);