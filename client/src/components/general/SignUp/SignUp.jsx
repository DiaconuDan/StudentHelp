import React, { Component } from 'react';
import * as ROUTES from '../../../constants/routes';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import styled from "styled-components";

import { withFirebase } from '../Firebase';
import { Wrapper, Email, Password, Button, Box, Error } from "../SignIn/SignIn";
import * as ROLES from "./roles";

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
    <h1>Register</h1>
    <SignUpForm />
  </Wrapper>
);

const INITIAL_STATE = {
  fullName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  role: ROLES.STUDENT,
  error: null,
};


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { fullName, email, passwordOne, role } = this.state;


    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        const uid = authUser.user.uid;
        console.log("uid", uid);
        // this.props.firebase
        // .users().add({
        //   uid,
        //   fullName,
        //   email,
        //   role
        // });
        this.props.firebase.user(authUser.user.uid).set(
          {
            fullName,
            email,
            role
          }, { merge: true },

        );

      })
      .then(() => {

        this.setState({ ...INITIAL_STATE });
        if ( role === ROLES.STUDENT) {
          this.props.history.push(ROUTES.STUDENT_PROFILE);
        } else {
          if ( role === ROLES.COMPANY) {
            this.props.history.push(ROUTES.COMPANY_PROFILE);
          }
        }
    
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeRole = event => {
    this.setState({ role: event.target.value });
  };

  render() {
    const {
      fullName,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || fullName === '';

    return (
      <div>
        <Box>
          <form onSubmit={this.onSubmit}>

            <Options onChange={this.onChangeRole}>
              <option value={ROLES.STUDENT} > Student account</option>
              <option value={ROLES.COMPANY}> Company account</option>
            </Options>
            <Email
              name="fullName"
              value={fullName}
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
