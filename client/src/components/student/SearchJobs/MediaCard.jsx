import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../general/Firebase";
import { compose } from "recompose";
import Loader from "react-loader-spinner";
import {ACCEPT_ANSWER, REJECT_ANSWER, styles} from './styles.js';



import {getPictureOfJobDescription,noResultPicture } from './images.js' ;

class MediaCard extends React.Component {
  state = {
    jobs: [],
    hasAvailableJobs: true
  };

  constructor(props) {
    super(props);
    const currentDate = moment().format("YYYY-MM-DD HH:mm");

    // sa ma duc in jobs unde startDate >= azi
    // responses.length < studentsNumber ( nu e full deja)
    // si user.id nu se afla in responses ( nu am raspuns deja)

    this.props.firebase
      .jobs()
      .where("startDate", ">=", currentDate)
      .onSnapshot(jobsSnapshot => {
        let jobs = [];

        jobsSnapshot.forEach(jobDoc => {
          let userAlreadyResponded = false;
          const job = jobDoc.data();

          job.responses.forEach(response => {
            const authUser = this.props.authUser;
            if (response.studentUserUID === authUser.uid) {
              userAlreadyResponded = true;
            }
          });
          if (
            !userAlreadyResponded &&
            job.startDate > currentDate &&
            job.responses.length < job.studentsNumber
          ) {
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
    const authUser = this.props.authUser;
    const studentUserUID = authUser.uid;
    const jobUID = jobs[0].docID;
    const currentResponses = jobs[0].responses;
    let studentResponse;

    if (answer === ACCEPT_ANSWER) {
      studentResponse = true;
    } else {
      if (answer === REJECT_ANSWER) {
        studentResponse = false;
      }
    }

    const responsesUpdated = [
      ...currentResponses,
      {
        studentUserUID: studentUserUID,
        studentResponse: studentResponse,
        studentDetails: this.props.authUser
      }
    ];

    setTimeout(
      () =>
        this.props.firebase.job(jobUID).update({
          responses: responsesUpdated
        }),
      500
    );

    this.remove();
  };

  remove = () =>
    this.setState(({ jobs }) => ({
      jobs: jobs.slice(1)
    }));

  render() {
    const { classes } = this.props;
    const { jobs, hasAvailableJobs } = this.state;
    return (
      <div>
        {jobs.length > 0 && (
          <Card className={classes.card}>
            <CardHeader
              title={jobs[0].companyFullname}
              subheader={
                moment(jobs[0].startDate, "YYYY-MM-DD HH:mm").format("LLL") +
                " - " +
                moment(jobs[0].endDate, "YYYY-MM-DD HH:mm").format("LLL")
              }
            />
            <CardMedia
              className={classes.media}
              image={getPictureOfJobDescription(jobs[0].jobDescription)}
            />
            <CardContent>
              <Typography component="p">
                Location: {jobs[0].location}
              </Typography>
              <br />

              <Typography component="p">
                Hourly payment: {jobs[0].hourlyPayment}
              </Typography>
              <br />

              <Typography component="p">
                Fulfilment: {jobs[0].responses.length} /{" "}
                {jobs[0].studentsNumber}
              </Typography>
              <br />
              <Typography component="p">
                Job description:  {jobs[0].jobDescription}
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableActionSpacing>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.onAnswer(ACCEPT_ANSWER)}
                className={classNames(
                  classes.margin,
                  classes.greenButton,
                  classes.button
                )}
              >
                {" "}
                Accept{" "}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.onAnswer(REJECT_ANSWER)}
                className={classNames(
                  classes.margin,
                  classes.redButton,
                  classes.button
                )}
              >
                {" "}
                Reject{" "}
              </Button>
            </CardActions>
          </Card>
        )}
        {jobs.length === 0 && hasAvailableJobs && (
          <div style={{ position: "fixed", top: "50%", left: "50%" }}>
            {" "}
            <Loader style={{ marginLeft: 600 }} />
          </div>
        )}

        {jobs.length === 0 && !hasAvailableJobs && (
          <Card
            className={classes.card}
            style={{ margin: "0 auto", marginTop: 75 }}
          >
            <CardHeader title={"There are no available jobs at the moment"} />
            <CardMedia
              className={classes.media}
              image={noResultPicture}
            />
            <CardContent>
              <Typography component="p">
                Have some patience and come back later when the students will
                respond to the offer.
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  withStyles(styles)
)(MediaCard);
