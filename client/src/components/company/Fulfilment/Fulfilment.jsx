import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import SimpleTable from "./SimpleTable";
import { sortJobsByDate } from "./utils";

class Fulfilment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      jobs: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const currentCompanyUID = this.props.authUser.uid;
    this.props.firebase
      .jobs()
      .where("companyUserUID", "==", currentCompanyUID) // ma duc in joburile companiei
      .onSnapshot(jobsSnapshot => {
        let jobs = [];
        jobsSnapshot.forEach(jobDoc => {
          jobs.push({ ...jobDoc.data() });
        });
        console.log(jobs);
        this.setState({
          jobs,
          loading: false
        });
      });
  }

  render() {
    const { jobs, loading } = this.state;

    if (loading) {
      return <h1 style={{ textAlign: "center" }}>Loading ...</h1>;
    } else {
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Fulfilment overview</h1>
          <SimpleTable
            jobs={sortJobsByDate(jobs)}
            authUser={this.props.authUser}
            firebase={this.props.firebase}
          />
        </div>
      );
    }
  }
}

const condition = authUser => authUser && authUser.role === "COMPANY";

export default compose(
  withAuthorization(condition),
  withFirebase
)(Fulfilment);
