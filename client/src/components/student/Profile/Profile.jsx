import { compose } from "recompose";
import React, { Component } from "react";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import styled from "styled-components";
import {Ban} from "styled-icons/fa-solid/Ban";

import {
  Wrapper,
  Email,
  Button,
  Box
} from "../../general/SignIn/SignIn";

const Label = styled.label`
  font-family: "Open Sans", sans-serif;
  font-size: 1em ;
`;


class StudentProfile extends Component {

  constructor(props) {
    super(props);
    const authUser = this.props.authUser;
    console.log(authUser);
    this.props.firebase.user(authUser.uid)
      .get()
      .then(snapshot => {
        const dbUser = snapshot.data();
        console.log({ ...dbUser });
        // merge auth and db user
        this.setState({ ...dbUser });
        console.log(this.state);
      });

  }

  onSubmit = event => {
    const {
      fullName,
      university,
      phoneNumber
    } = this.state;
    const authUser = this.props.authUser;
    this.props.firebase.user(authUser.uid).update({
        university: university,
      phoneNumber: phoneNumber,
      fullName: fullName
    }) ;
    
  };

  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    if (!this.state) {
      return (<div style={{ marginLeft: 200 }}> Loading..</div>)
    }

    const {
      fullName,
      email,
      role,
      university,
      phoneNumber
    } = this.state;



    return (
      <Wrapper style={{ marginLeft: 10 }}>
        <div>
          <Box>
            <h1> Edit profile</h1>


            <form onSubmit={this.onSubmit.bind(this)}>

              <Label style={{ float: 'left', marginTop: 10, marginLeft: 20 }}>Email <Ban style={{width: 20}}/> </Label>
              <Email
                type="text"
                disabled
                value={email}
              />
              <Label style={{ float: 'left', marginTop: 10, marginLeft: 20 }}>Role <Ban style={{width: 20}} /> </Label>

              <Email
                type="text"
                value={role}
                disabled
              />
              <Label style={{ float: 'left', marginTop: 10, marginLeft: 20 }}> Company name </Label>
              <Email
                type="text"
                value={fullName}
                onChange={e => this.onTodoChange("fullName", e.target.value)}
              />


              <Label style={{ float: 'left', marginTop: 10, marginLeft: 20 }}> University </Label>
              <Email
                type="text"
                value={university}
                onChange={e => this.onTodoChange("university", e.target.value)}
              />


              <Label style={{ float: 'left', marginTop: 10, marginLeft: 20 }}> Phone Number </Label>
              <Email
                type="number"
                value={phoneNumber}
                onChange={e => this.onTodoChange("phoneNumber", e.target.value)}
              />
              <Button type="submit">
                Submit
              </Button>
            </form>
          </Box>
        </div>
      </Wrapper>
    );
  }
}

const condition = authUser => authUser && authUser.role === "STUDENT";

export default compose(
  withAuthorization(condition),
  withFirebase
)(StudentProfile);
