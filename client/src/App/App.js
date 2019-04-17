import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from '../pages/Home';
import List from '../pages/List';
import Navigation from '../components/Navigation/Navigation';
import { SignUp } from '../components/SignUp/SignUp' ;
import { SignIn } from '../components/SignIn/SignIn' ;
import Profile from '../components/Profile/Profile';
import * as ROUTES from '../constants/routes';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }
  render() {
    const App = () => (
      <div>
        <Navigation authUser={this.state.authUser} />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Home}/>
          <Route path={ROUTES.LIST} component={List}/>
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.PROFILE} component={Profile} />
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;