import React, {Component} from "react";
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
import AddReview from "./modals/AddStudentRating" ;
import { styles } from './styles';
import { generateRows } from './utils';

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.handleAddJobRatingClose = this.handleAddStudentRatingClose.bind(this);
    this.state = {
      openAddStudentRating: false,
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

  handleAddStudentRatingClose = () => {
    this.setState({ openAddStudentRating: false });
  };


  render() {
    const { classes, jobs } = this.props;
    const rows = generateRows(jobs);
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">StartDate</TableCell>
              <TableCell align="right">EndDate</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Students Enrolled</TableCell>
              <TableCell align="right">Payment per hour</TableCell>
              <TableCell align="center">Add rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
                <TableCell align="right">{row.location}</TableCell>
                <TableCell align="right">{row.responsesNumber}</TableCell>
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
                        style={{ width: 40, height: 40 }}
                        onClick={this.handleClickOpenAddStudentRating(row)}
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
            this.state.openAddStudentRating === true && (
              <AddReview
                open={this.state.openAddStudentRating}
                handleClose={this.handleAddStudentRatingClose}
                activeRow={this.state.activeRow}
                rating={this.state.activeRow.rating}
                feedback={this.state.activeRow.feedback}
                authUserUID={this.props.authUser.uid}
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
