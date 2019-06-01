import React, { Component } from "react";
import { compose } from "recompose";
import { withFirebase } from "../../general/Firebase";
import { withAuthorization } from "../../general/Session";
import SimpleTable from "./SimpleTable";

// vreau sa caut in Jobs toate job-urile cu companyUserId egal cu curentul authUser
// le pun in tabel
// daca Date.now ( cu tot cu ora) >= endHour -> FINISHEEEED ( pot da review)
// daca Date.now ( cu tot cu ora) < startHour -> UPCOMING
// daca Date.now ( cu tot cu ora) >= startHour && <= endHour -> RUNNING

let currentCompanyUser = JSON.parse(localStorage.getItem('authUser'));


class Fulfilment extends Component {
  constructor(props) {
    super(props);
    
     const authUser = this.props.authUser ; 
     console.log(authUser);
    this.state = {
      loading: true,
      jobs: [],
      authUser: authUser
    };
  }



  componentDidMount() {
    this.setState({ loading: true });
    const { authUser} = this.state ;
    console.log(authUser);
    const currentCompanyUID = currentCompanyUser.uid;
    this.props.firebase
      .jobs()
      .where('companyUserUID', '==', currentCompanyUID) // ma duc in joburile companiei
      .onSnapshot(jobsSnapshot => {
        let jobs = [];
        jobsSnapshot.forEach(jobDoc => {
          jobs.push({ ...jobDoc.data() });
        });
        console.log(jobs);
        this.setState({
          jobs,
          loading: false,
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
          <h1 style={{ textAlign: "center" }}>
            Fulfilment overview
        </h1>
          <SimpleTable jobs={jobs} />
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
