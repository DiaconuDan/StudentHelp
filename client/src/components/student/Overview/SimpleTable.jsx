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
import { WindowClose } from "styled-icons/fa-regular/WindowClose";
import classNames from "classnames";
import { CheckCircle } from "styled-icons/boxicons-regular/CheckCircle";
import AddReview from "./modals/AddCompanyRating";
import CompanyStatistics from "./modals/CompanyStatistics";
// import CurrentUserStatics from "./modals/CurrentUserStatistics";

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.handleAddJobRatingClose = this.handleAddJobRatingClose.bind(this);
    this.state = {
      openAddJobRating: false,
      openCompanyStatistics: false,
      activeRow: null
    };
  }

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
    console.log("intrat");
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
                <TableCell align="left">Answer</TableCell>
                <TableCell align="left">Company</TableCell>
                <TableCell align="left">StartDate</TableCell>
                <TableCell align="left">EndDate</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="center">Payment per hour</TableCell>
                <TableCell align="center">Add rating</TableCell>
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
                  <TableCell align="left">
                    {row.studentResponse === "Yes" && <CheckCircle />}
                    {row.studentResponse === "No" && <WindowClose />}
                  </TableCell>
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
                  <TableCell align="left">{row.startDate}</TableCell>
                  <TableCell align="left">{row.endDate}</TableCell>
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
          {/* <CurrentUserStatics
            open={true}
            handleClose={this.handleAddJobRatingClose}
            authUserUID={this.props.authUser.uid}
            firebase={this.props.firebase}
          /> */}
        </Paper>
      </React.Fragment>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);