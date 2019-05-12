import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { Link, withRouter  } from 'react-router-dom';
import { compose } from 'recompose';
import styled from "styled-components" ;

import { withFirebase } from '../Firebase';
import { Wrapper, Email, Password, Button, Box, Error } from "../SignIn/SignIn" ;

export const Options = styled.select`
  border-radius: 4px;
  background: #ecf0f1;
  border: #ccc 1px solid;
  padding: 5px;
  width: 268px;
  height: 37.4px;
  font-size: 1em;
}
`;

const SignUp = () => (
  <Wrapper>
    <h1>SignUp</h1>
    <SignUpForm />
  </Wrapper>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
         this.props.firebase
          .users().add({
            username,
            email
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PROFILE);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';

    return (
      <div>
      <Box>
      <form onSubmit={this.onSubmit}>

        <Options>
          <option> User account</option>
          <option> Company account</option>
        </Options>
        <Email
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <Email
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <Password
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <Password
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />

     

        <Button disabled={isInvalid} type="submit">Sign Up</Button>

       
      </form>
      </Box>
      {error && <Error>{error.message}</Error>}
      </div>
    );
  }
}


const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);


export { SignUp, SignUpForm, SignUpLink };
