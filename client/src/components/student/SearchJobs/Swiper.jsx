import React, { Component } from "react";
import Swipeable from "react-swipy";
import Card from "./Card";
import Button from "./Button";
import { withFirebase } from "../../general/Firebase";
import { compose } from "recompose";
import moment from 'moment';

const ACCEPT_ANSWER = "right";
const REJECT_ANSWER = "left";
const authUser = JSON.parse(localStorage.getItem("authUser"));


const wrapperStyles = { marginTop: "100px", position: "relative", width: "250px", height: "250px", marginLeft: "30%" };
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

class Swiper extends Component {



  state = {
    jobs: [],
    hasAvailableJobs: true
  };

  constructor(props) {
    super(props);
    const currentDate = moment().format('YYYY-MM-DD HH:mm');

    // sa ma duc in jobs unde startDate >= azi
    // responses.length < studentsNumber
    // si user.id nu se afla in responses

    this.props.firebase
      .jobs()
      .where('startDate', '>=', currentDate)
      .onSnapshot(jobsSnapshot => {
        let jobs = [];

        jobsSnapshot.forEach(jobDoc => {
          let userAlreadyResponded = false;
          const job = jobDoc.data();
          job.responses.forEach(response => {
            if (response.studentUserUID === authUser.uid) {
              userAlreadyResponded = true;
            }
          })
          if (userAlreadyResponded == false && job.startDate < currentDate) {
            jobs.push(job);
          }
        });

        if (jobs.length === 0) {
          this.setState({ jobs: jobs, hasAvailableJobs: false });
        } else {
          this.setState({ jobs: jobs, hasAvailableJobs: true });
        }
      });
}



onAnswer = answer => {


  const { jobs } = this.state;

  const studentUserUID = authUser.uid;
  const jobUID = jobs[0].docID;
  let studentResponse;

  if (answer === ACCEPT_ANSWER) {
    studentResponse = true;
  } else {
    if (answer === REJECT_ANSWER) {
      studentResponse = false;
    }

  }

  console.log("Adding after response: jobUID", jobUID);
  console.log("Adding after response: studentResponse", studentResponse);
  console.log("Adding after response: studentUserUID", studentUserUID);

  setTimeout(() => this.props.firebase.responses().add({
    jobUID,
    studentResponse,
    studentUserUID
  }).then(ref => {
    ref.set({ docID: ref.id }, { merge: true })
  }), 500);

}

remove = () => this.setState(({ jobs }) => ({
  jobs: jobs.slice(1),
}))


render() {
  const { jobs, hasAvailableJobs } = this.state;

  return (
    <div>
      <div style={wrapperStyles}>
        {jobs.length > 0 && (
          <div style={wrapperStyles}>
            <Swipeable
              buttons={({ left, right }) => (
                <div style={actionsStyles}>
                  <Button onClick={left}>Reject</Button>
                  <Button onClick={right}>Accept</Button>
                </div>
              )}
              onSwipe={this.onAnswer}
              onAfterSwipe={this.remove}
            >
              <Card>{jobs[0].location}</Card>
            </Swipeable>
            {jobs.length > 1 && <Card zIndex={-1}>{jobs[1].location}</Card>}
          </div>
        )}
        {jobs.length === 0 && hasAvailableJobs && (<Card zIndex={-2}>Loading jobs..</Card>)}
        {jobs.length === 0 && !hasAvailableJobs && (<Card zIndex={-2}>No more jobs available</Card>)}

      </div>
    </div>
  );
}
}

export default compose(
  withFirebase,
)(Swiper);