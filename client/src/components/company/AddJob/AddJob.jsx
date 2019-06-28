import { compose } from "recompose";
import React, { Component } from "react";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import {
  Wrapper,
  Email,
  Button,
  Box,
  Error
} from "../../general/SignIn/SignIn";
import moment from "moment";

const INITIAL_STATE = {
  location: "",
  studentsNumber: null,
  hourlyPayment: null,
  date: null,
  startHour: "",
  endHour: "",
  jobDescription: ""
};

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      location,
      hourlyPayment,
      date,
      startHour,
      endHour,
      studentsNumber,
      jobDescription
    } = this.state;

    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const companyUserUID = authUser.uid;
    const companyFullname = authUser.fullName;
    const startDate = moment(date + " " + startHour).format("YYYY-MM-DD HH:mm");
    const endDate = moment(date + " " + endHour).format("YYYY-MM-DD HH:mm");
    const responses = [];
    this.props.firebase
      .jobs()
      .add({
        companyUserUID,
        companyFullname,
        location,
        jobDescription,
        hourlyPayment,
        startDate,
        endDate,
        studentsNumber,
        responses
      })
      .then(ref => {
        ref.set({ docID: ref.id }, { merge: true });
      });

    this.setState({ ...INITIAL_STATE });
    event.preventDefault();
    event.target.reset();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { startHour, endHour } = this.state;

    const isInvalid =
      startHour >= endHour && endHour !== "" && startHour !== "";

    return (
      <Wrapper style={{ marginTop: 150 }}>
        <div>
          <Box>
            <h1>Add Job</h1>
            <form onSubmit={this.onSubmit.bind(this)}>
              <Email
                name="location"
                type="text"
                placeholder="Location"
                onChange={this.onChange}
                required
              />
              <Email
                name="jobDescription"
                type="text"
                placeholder="Job description"
                onChange={this.onChange}
                required
              />
              <Email
                name="studentsNumber"
                type="number"
                placeholder="Number of students needed"
                onChange={this.onChange}
                required
              />
              <Email
                name="hourlyPayment"
                type="number"
                placeholder="Payment per hour in RON"
                onChange={this.onChange}
                required
              />
              <Email
                name="date"
                type="text"
                placeholder="Date"
                onFocus={e => (e.target.type = "date")}
                onChange={this.onChange}
                required
              />
              <Email
                name="startHour"
                type="text"
                placeholder="Starting hour"
                onFocus={e => (e.target.type = "time")}
                onChange={this.onChange}
                required
              />
              <Email
                name="endHour"
                type="text"
                placeholder="Ending hour"
                onFocus={e => (e.target.type = "time")}
                onChange={this.onChange}
                required
              />
              <Button disabled={isInvalid} type="submit">
                Submit
              </Button>
            </form>
          </Box>
          {isInvalid && <Error> Start hour should be before end hour!</Error>}
        </div>
      </Wrapper>
    );
  }
}

const condition = authUser => authUser && authUser.role === "COMPANY";

export default compose(
  withAuthorization(condition),
  withFirebase
)(AddJob);
