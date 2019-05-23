import { compose } from "recompose";
import React, { Component } from "react";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import { Wrapper, Email, Button, Box } from "../../general/SignIn/SignIn";

const INITIAL_STATE = {
  location: "",
  studentsNumber: "",
  hourlyPayment: "",
  startDate: "",
  error: null
};

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const {
      location,
      hourlyPayment,
      startDate,
      startHour,
      endingHour
    } = this.state;

    this.setState({ ...INITIAL_STATE });
    event.target.reset();
    console.warn("intrat");
    console.warn(this.state);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      location,
      hourlyPayment,
      startDate,
      startHour,
      endingHour
    } = this.state;

    return (
      <Wrapper style={{ marginTop: 150 }}>
        <div>
          <Box>
            <h1>Add Job</h1>
            <form onSubmit={this.onSubmit}>
              <Email
                name="location"
                type="text"
                placeholder="Location"
                onChange={this.onChange}
              />
              <Email
                name="studentsNumber"
                type="text"
                placeholder="Number of students needeed"
              />
              <Email
                name="hourlyPayment"
                type="text"
                placeholder="Payment per hour"
                onChange={this.onChange}
              />

              <Email
                name="startDate"
                type="text"
                placeholder="Date"
                onFocus={e => (e.target.type = "date")}
                onChange={this.onChange}
              />
              <Email
                name="startHour"
                type="text"
                placeholder="Starting hour"
                onFocus={e => (e.target.type = "time")}
                onChange={this.onChange}
              />
              <Email
                name="endingHour"
                type="text"
                placeholder="Ending hour"
                onFocus={e => (e.target.type = "time")}
                onChange={this.onChange}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Box>
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
