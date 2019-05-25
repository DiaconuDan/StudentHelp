import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
function createData(status, startTime, endTime, studentsEnrolled, hourlyPayment) {
  id += 1;
  return { id, status, startTime, endTime, studentsEnrolled, hourlyPayment };
}

// job : { studentsEnrolled: { UIDS}, }

const getStatus = ( date, startHour, endingHour) => {
  const currentDate = Date.now();
  console.log(currentDaten);
  return "Upcoming" ;
}

const generateRows = ( jobs ) => {
  let rows = [] ;
  jobs.forEach( job => {
    const status = getStatus( job.date, job.startHour, job.endingHour) ;
    rows.push(createData(status, job.date + " " + job.startHour, job.date + " " + job.endingHour, job.studentsEnrolledInJob.length + "/" + job.studentsNumber, job.hourlyPayment));
  })
  return rows ;
}


const  SimpleTable = (props) => {
  const {  classes, jobs } = props;
  console.warn(jobs);
  const rows = generateRows(jobs) ;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="right">StartTime</TableCell>
            <TableCell align="right">EndTime</TableCell>
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
              <TableCell align="right">{row.startTime}</TableCell>
              <TableCell align="right">{row.endTime}</TableCell>
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
