import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import SimpleTable from "./SimpleTable";
import { sortJobsByDate } from "./utils";
import Loader from "react-loader-spinner";
class Overview extends Component {
  constructor(props) {
    super(props);
    const authUser = this.props.authUser;
    this.state = {
      loading: true,
      studentJobResponses: [],
      authUser: authUser
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const { authUser } = this.state;

    this.props.firebase.jobs().onSnapshot(jobsSnapshot => {
      let jobs = [];
      jobsSnapshot.forEach(jobDoc => {
        let alreadyResponded = false;
        let job = jobDoc.data();
        const responses = job.responses;

        responses.forEach(response => {
          if (response.studentUserUID === authUser.uid) {
            alreadyResponded = true;
            job = { ...job, studentResponse: response.studentResponse };
          }
        });
        if (alreadyResponded) {
          jobs.push(job);
        }
      });
      this.setState({
        studentJobResponses: jobs,
        loading: false
      });
    });
  }

  render() {
    const { studentJobResponses, loading } = this.state;

    if (loading) {
      return (
        <div style={{ position: "fixed", top: "50%", left: "50%" }}>
          {" "}
          <Loader style={{ marginLeft: 600 }} />
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Overview</h1>
          <SimpleTable
            jobs={sortJobsByDate(studentJobResponses)}
            authUser={this.props.authUser}
            firebase={this.props.firebase}
          />
        </div>
      );
    }
  }
}

const condition = authUser => authUser && authUser.role === "STUDENT";

export default compose(
  withAuthorization(condition),
  withFirebase
)(Overview);
