import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import Button from "@material-ui/core/Button";
import { withFirebase } from "../../general/Firebase";
import { compose } from "recompose";
import green from '@material-ui/core/colors/green';
import Loader from "react-loader-spinner";

const ACCEPT_ANSWER = "right";
const REJECT_ANSWER = "left";
const styles = theme => ({
    card: {
        maxWidth: 550,
        margin: "0 auto",
        marginTop: 50
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    actions: {
        display: "flex"
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500]
    },
    margin: {
        margin: theme.spacing.unit,
    },
    greenButton: {
        fontColor: "white",
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    redButton: {
        fontColor: "white",
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    button: {
        margin: theme.spacing.unit,
        textTransform: "none",
        width: 250,
        color: "white"
    }
});

class MediaCard extends React.Component {
    state = {
        jobs: [],
        hasAvailableJobs: true
    };


    constructor(props) {
        super(props);
        const currentDate = moment().format('YYYY-MM-DD HH:mm');

        // sa ma duc in jobs unde startDate >= azi
        // responses.length < studentsNumber ( nu e full deja)
        // si user.id nu se afla in responses ( nu am raspuns deja)

        this.props.firebase
            .jobs()
            .where('startDate', '>=', currentDate)
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
                    })
                    if (!userAlreadyResponded && job.startDate > currentDate && job.responses.length < job.studentsNumber) {
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

        ]


        setTimeout(() => this.props.firebase.job(jobUID).update({
            responses: responsesUpdated
        }), 500);

        this.remove();
    }

    remove = () => this.setState(({ jobs }) => ({
        jobs: jobs.slice(1),
    }))

    render() {
        const { classes } = this.props;
        const { jobs, hasAvailableJobs } = this.state ;
        console.log(this.state);
        return (
            <div>
                 {jobs.length > 0 && (
          <Card className={classes.card}>
          <CardHeader
             

              title={jobs[0].companyFullname}
              subheader={moment(jobs[0].startDate, "YYYY-MM-DD HH:mm").format('LLL') + " - " + moment(jobs[0].endDate, "YYYY-MM-DD HH:mm").format('LLL') }
              
          />
          <CardMedia
              className={classes.media}
              image={require("./office_job.jpg")}
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
                Fulfilment: {jobs[0].responses.length} / {jobs[0].studentsNumber}
              </Typography>

              
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
              <Button
                  variant="contained"
                  color="primary"
                  onClick= {() => this.onAnswer(ACCEPT_ANSWER)}
                  className={classNames(
                      classes.margin,
                      classes.greenButton,
                      classes.button
                  )}
              > Accept </Button>
              <Button
                  variant="contained"
                  color="primary"
                  onClick= { () => this.onAnswer(REJECT_ANSWER)}
                  className={classNames(
                      classes.margin,
                      classes.redButton,
                      classes.button
                  )}
              > Reject </Button>
          </CardActions>
      </Card>
        )}
                 {jobs.length === 0 && hasAvailableJobs && (<div style={{position:"fixed",top:"50%",left:"50%"}}> <Loader style={{marginLeft: 600}} /></div>)}



                 {jobs.length === 0 && !hasAvailableJobs && (  <Card className={classes.card} style={{margin:"0 auto", marginTop:75}}>
          <CardHeader
            title={"There are no available jobs at the moment"}
          />
          <CardMedia
              className={classes.media}
              image={require("./searching_job.jpg")}
          />
          <CardContent>
              <Typography component="p">
                Have some patience and come back later when the students will respond to the offer.
              </Typography>
          </CardContent>
      </Card>)}








               
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
)(MediaCard)