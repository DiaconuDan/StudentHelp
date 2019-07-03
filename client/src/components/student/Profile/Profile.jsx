import { compose } from "recompose";
import React, { Component } from "react";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import styled from "styled-components";
import { Ban } from "styled-icons/fa-solid/Ban";
import Loader from "react-loader-spinner";
import { Wrapper, Input, Button, Box } from "../../general/SignIn/SignIn";
import CurrentUserStatistics from './modals/CurrentUserStatistics' ; 
import { PersonPin } from "styled-icons/material/PersonPin";
const PersonPinIcon = styled(PersonPin)`
  height: 30px;
  margin-left: 5px;
  padding-right: 5px;
  margin-bottom: 5px;
`;

const Label = styled.label`
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
`;

class StudentProfile extends Component {
  constructor(props) {
    super(props);
    const authUser = this.props.authUser;
    this.handleStatisticsClose = this.handleStatisticsClose.bind(this);
    console.log(authUser);
    this.props.firebase
      .user(authUser.uid)
      .get()
      .then(snapshot => {
        const dbUser = snapshot.data();
        console.log({ ...dbUser });
        // merge auth and db user
        this.setState({ ...dbUser,openStatistics: false });
        console.log(this.state);
      });
  }

  onSubmit = event => {
    const { fullName, university, phoneNumber } = this.state;
    const authUser = this.props.authUser;
    this.props.firebase.user(authUser.uid).update({
      university: university,
      phoneNumber: phoneNumber,
      fullName: fullName
    });
  };

  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }
  
  handleClickOpenStatistics = () => {
    this.setState({
      openStatistics: true
    });
  };

  handleStatisticsClose = () => {
    this.setState({ openStatistics: false });
  };

  render() {
    if (!this.state) {
      return (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          {" "}
          <Loader style={{ marginLeft: 600 }} />
        </div>
      );
    }

    const { fullName, email, role, university, phoneNumber } = this.state;

    return (
      <Wrapper style={{ marginLeft: 10 }}>
        <div>
          <Box>
            <h1> Edit profile <PersonPinIcon onClick={this.handleClickOpenStatistics} /> </h1>

            <form onSubmit={this.onSubmit.bind(this)}>
              <Label style={{ float: "left", marginTop: 10, marginLeft: 20 }}>
                Email <Ban style={{ width: 20 }} />{" "}
              </Label>
              <Input type="text" disabled value={email} />
              <Label style={{ float: "left", marginTop: 10, marginLeft: 20 }}>
                Role <Ban style={{ width: 20 }} />{" "}
              </Label>

              <Input type="text" value={role} disabled />
              <Label style={{ float: "left", marginTop: 10, marginLeft: 20 }}>
                {" "}
                Company name{" "}
              </Label>
              <Input
                type="text"
                value={fullName}
                onChange={e => this.onTodoChange("fullName", e.target.value)}
              />

              <Label style={{ float: "left", marginTop: 10, marginLeft: 20 }}>
                {" "}
                University{" "}
              </Label>
              <Input
                type="text"
                value={university}
                onChange={e => this.onTodoChange("university", e.target.value)}
              />

              <Label style={{ float: "left", marginTop: 10, marginLeft: 20 }}>
                {" "}
                Phone Number{" "}
              </Label>
              <Input
                type="number"
                value={phoneNumber}
                onChange={e => this.onTodoChange("phoneNumber", e.target.value)}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Box>
        </div>
        <CurrentUserStatistics firebase={this.props.firebase} open={this.state.openStatistics} authUser={this.props.authUser} handleClose={this.handleStatisticsClose} />
      </Wrapper>
    );
  }
}

const condition = authUser => authUser && authUser.role === "STUDENT";

export default compose(
  withAuthorization(condition),
  withFirebase
)(StudentProfile);
