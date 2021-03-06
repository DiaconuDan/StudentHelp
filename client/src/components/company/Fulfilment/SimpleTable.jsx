import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import AddReview from "./modals/AddStudentRating";
import { styles } from "./styles";
import { generateRows } from "./utils";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import StudentStatistics from "./modals/StudentStatistics";
import DeleteIcon from "@material-ui/icons/Delete";

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.handleAddJobRatingClose = this.handleAddStudentRatingClose.bind(this);
    this.handleStudentStatisticsClose = this.handleStudentStatisticsClose.bind(this);
    this.state = {
      openAddStudentRating: false,
      openStudentStatistics: false,
      openUserStatistics: false,
      activeRow: null
    };
  }

  handleClickOpenAddStudentRating = row => event => {
    this.setState({
      openAddStudentRating: true,
      activeRow: {
        ...row
      }
    });
  };

  handleDeleteJob = row => event => {
    return this.props.firebase.job(row.docID).delete();
  };

  handleAddStudentRatingClose = () => {
    this.setState({ openAddStudentRating: false });
  };

  handleOpenStudentStatistics = row => event => {
    let score = 0;
    let numberOfReceivedRatings = 0;

    //   mergi pe la fiecare student care participa
    //   gaseste-i rating-ul, adauga-l la array
    // trimite array-ul ca prop la studentStatistic

    this.props.firebase.jobs().onSnapshot(jobSnapshot => {
      jobSnapshot.forEach(jobDoc => {
        const responses = jobDoc.data().responses;

        responses.forEach(response => {
          if (
            response.studentResponse === true &&
            response.feedbackGivenFromCompany !== undefined &&
            response.ratingGivenFromCompany !== undefined &&
            response.studentUserUID === row.studentUserUID
          ) {
            console.log("intrat prietene");
            score += response.feedbackGivenFromCompany;
            numberOfReceivedRatings += 1;
          }
        });
      });
      this.setState({
        handleClose: this.props.handleClose,
        numberOfReceivedRatings,
        score
      });
    });
    this.setState({
      openStudentStatistics: true,
      activeRow: {
        ...row
      }
    });
  };

  handleStudentStatisticsClose = () => {
    this.setState({ openStudentStatistics: false });
  };

  render() {
    const { classes, jobs } = this.props;
    const rows = generateRows(jobs);
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">StudentsEnrolled</TableCell>
              <TableCell align="right">JobDescription</TableCell>
              <TableCell align="right">StartDate</TableCell>
              <TableCell align="right">EndDate</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Payment per hour</TableCell>
              <TableCell align="center">Add rating</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.status === "Finished" && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {" "}
                      {row.status}{" "}
                    </Button>
                  )}
                  {row.status === "Upcoming" && (
                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames(
                        classes.margin,
                        classes.cssRoot,
                        classes.button
                      )}
                    >
                      {row.status}{" "}
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  {" "}
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={this.handleOpenStudentStatistics(row)}
                  >
                    {" "}
                    {row.responsesNumber}
                  </p>
                </TableCell>
                <TableCell align="right">{row.jobDescription}</TableCell>
                <TableCell align="right">
                  {" "}
                  <div style={{ fontSize: 12, marginLeft: -20 }}>
                    {row.startDate}
                  </div>
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <div style={{ fontSize: 12, marginLeft: -15 }}>
                    {row.endDate}
                  </div>
                </TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.hourlyPayment}</TableCell>
                <TableCell align="center">
                  {row.status === "Finished" && (
                    <Fab
                      color="primary"
                      aria-label="Edit"
                      className={classes.fab}
                      style={{ width: 40, height: 40 }}
                      onClick={this.handleClickOpenAddStudentRating(row)}
                    >
                      <EditIcon />
                    </Fab>
                  )}
                  {row.status === "Upcoming" && (
                    <Fab
                      color="primary"
                      aria-label="Edit"
                      className={classes.fab}
                      style={{
                        width: 40,
                        height: 40,
                        color: "white !important"
                      }}
                      onClick={this.handleClickOpenAddStudentRating(row)}
                      disabled
                    >
                      <EditIcon />
                    </Fab>
                  )}
                </TableCell>
                <TableCell align="center">
                  <DeleteIcon
                    className={classes.icon}
                    onClick={this.handleDeleteJob(row)}
                    style={{ cursor: "pointer" }}
                  />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {this.state.activeRow != null &&
          this.state.openStudentStatistics === true && (
            <StudentStatistics
              open={this.state.openStudentStatistics}
              handleClose={this.handleStudentStatisticsClose}
              activeRow={this.state.activeRow}
              authUser={this.props.authUser}
              firebase={this.props.firebase}
            />
          )}
        {this.state.activeRow != null &&
          this.state.openAddStudentRating === true && (
            <AddReview
              open={this.state.openAddStudentRating}
              handleClose={this.handleAddStudentRatingClose}
              activeRow={this.state.activeRow}
              rating={this.state.activeRow.rating}
              feedback={this.state.activeRow.feedback}
              authUser={this.props.authUser}
              firebase={this.props.firebase}
            />
          )}
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
