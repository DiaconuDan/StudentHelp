import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment" ;

// TO DO : ending hour => end hour
// sortari

const styles = theme => ({
  root: {
    marginLeft: 350,
    width: "60%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

let id = 0;
function createData(status, startDate, endDate, location, studentsEnrolled, hourlyPayment) {
  id += 1;
  return { id, status, startDate, endDate,location,  studentsEnrolled, hourlyPayment };
}

// job : { studentsEnrolled: { UIDS}, }

const getStatus = ( jobStartDate, jobEndDate) => {


  const currentDate = moment().format('YYYY-MM-DD HH:mm');
  

  if ( jobStartDate > currentDate) {
    return "Upcoming" ;
  }
  if ( jobEndDate < currentDate) {
    return "Finished" ;
  }
  if ( currentDate>= jobStartDate && currentDate <= jobEndDate) {
    return "Running" ;
  } 
 
}

const generateRows = ( jobs ) => {
  let rows = [] ;
  jobs.forEach( job => {
    const status = getStatus( job.startDate, job.endDate) ;
    rows.push(createData(status, job.startDate, job.endDate, job.location, job.studentsEnrolledInJob.length + "/" + job.studentsNumber, job.hourlyPayment));
  })
  return rows ;
}


const  SimpleTable = (props) => {
  const {  classes, jobs } = props;
  const rows = generateRows(jobs) ;

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
              <TableCell align="right">{row.studentsEnrolled}</TableCell>
              <TableCell align="right">{row.hourlyPayment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);