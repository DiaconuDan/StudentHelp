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
import Button from "@material-ui/core/Button";
import { styles } from "./styles";
import { generateRows } from "./utils";
import classNames from "classnames";
import AddReview from "./modals/AddCompanyRating";
import CompanyStatistics from "./modals/CompanyStatistics";
import DeleteIcon from '@material-ui/icons/Delete';


class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.handleAddJobRatingClose = this.handleAddJobRatingClose.bind(this);
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this);
    this.state = {
      openAddJobRating: false,
      openCompanyStatistics: false,
      activeRow: null
    };
  }

  handleDeleteAnswer= (row, authUser) => event => {

    this.props.firebase.job(row.docID)
    .get()
    .then(snapshot => {
      const job = snapshot.data();
      let responses = job.responses ;
        for ( let i = 0 ; i < responses.length; i++) {
            if ( responses[i].studentUserUID === authUser.uid) {
              responses.splice(i);
            }
        }
        console.log(responses);
        this.props.firebase.job(row.docID).update({
            responses: responses
          }) ;
         
    });

  };


  handleClickOpenAddJobRating = row => event => {
    this.setState({
      openAddJobRating: true,
      activeRow: {
        ...row
      }
    });
  };

  handleAddJobRatingClose = () => {
    this.setState({ openAddJobRating: false });
  };

  handleClickOpenCompanyStatistics = row => event => {
    this.setState({
      openCompanyStatistics: true,
      activeRow: {
        ...row
      }
    });
  };

  handleCompanyStatisticsClose = () => {
    this.setState({ openCompanyStatistics: false });
  };

  render() {
    const { classes, jobs } = this.props;

    const rows = generateRows(jobs);
    let companyName;
    if (this.state.activeRow) {
      companyName = this.state.activeRow.companyFullname;
    } else {
      companyName = "Company";
    }
    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="center">Status</TableCell>
                <TableCell align="left">Job Description</TableCell>
                <TableCell align="left">Company</TableCell>
                <TableCell align="left">StartDate</TableCell>
                <TableCell align="left">EndDate</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="center">Payment per hour</TableCell>
                <TableCell align="center">Add rating</TableCell>
                <TableCell align="center">Reject</TableCell>
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
                  <TableCell align="left">{row.jobDescription}</TableCell>
                  <TableCell align="left">
                    {" "}
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={this.handleClickOpenCompanyStatistics(row)}
                    >
                      {" "}
                      {row.companyFullname}
                    </p>
                  </TableCell>
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
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="center">{row.hourlyPayment}</TableCell>
                  <TableCell align="center">
                    {row.status === "Finished" && (
                      <Fab
                        color="primary"
                        aria-label="Edit"
                        className={classes.fab}
                        style={{ width: 40, height: 40 }}
                        onClick={this.handleClickOpenAddJobRating(row)}
                      >
                        <EditIcon />
                      </Fab>
                    )}
                    {row.status === "Upcoming" && (
                      <Fab
                        color="primary"
                        aria-label="Edit"
                        className={classes.fab}
                        style={{ width: 40, height: 40 }}
                        onClick={this.handleClickOpenAddJobRating(row)}
                        disabled
                      >
                        <EditIcon />
                      </Fab>
                    )}
                  </TableCell>
                  <TableCell align="center"><DeleteIcon className={classes.icon}  onClick={this.handleDeleteAnswer(row, this.props.authUser)} style={{cursor:"pointer"}} />  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {this.state.activeRow != null &&
            this.state.openCompanyStatistics === true && (
              <CompanyStatistics
                open={this.state.openCompanyStatistics}
                handleClose={this.handleCompanyStatisticsClose}
                companyName={companyName}
                activeRow={this.state.activeRow}
                authUserUID={this.props.authUser.uid}
                firebase={this.props.firebase}
              />
            )}
          {this.state.activeRow != null &&
            this.state.openAddJobRating === true && (
              <AddReview
                open={this.state.openAddJobRating}
                handleClose={this.handleAddJobRatingClose}
                companyName={companyName}
                activeRow={this.state.activeRow}
                rating={this.state.activeRow.rating}
                feedback={this.state.activeRow.feedback}
                authUser={this.props.authUser}
                firebase={this.props.firebase}
              />
            )}

          {/* {this.state.activeRow != null &&
            this.state.openAddJobRating === true && (
              <AddReview
                open={this.state.openAddJobRating}
                handleClose={this.handleAddJobRatingClose}
                companyName={companyName}
                activeRow={this.state.activeRow}
                rating={this.state.activeRow.rating}
                feedback={this.state.activeRow.feedback}
                authUser={this.props.authUser}
                firebase={this.props.firebase}
              />
            )} */}
        </Paper>
      </React.Fragment>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
