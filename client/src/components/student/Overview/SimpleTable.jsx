import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
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
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  }
});

let id = 0;
function createData(status,studentResponse, startDate, endDate,location, responsesNumber, hourlyPayment) {
  id += 1;
  return { id, status,studentResponse, startDate, endDate, location, responsesNumber, hourlyPayment };
}


const getStatus = (jobStartDate, jobEndDate) => {


  const currentDate = moment().format('YYYY-MM-DD HH:mm');


  if (jobStartDate > currentDate) {
    return "Upcoming";
  }
  if (jobEndDate < currentDate) {
    return "Finished";
  }
  if (currentDate >= jobStartDate && currentDate <= jobEndDate) {
    return "Running";
  }

}

const generateRows = (jobs) => {
  let rows = [];
 
  jobs.forEach(job => {
     console.log(jobs);
    const status = getStatus(job.startDate, job.endDate);
    let studentResponse;
    if ( job.studentResponse == true ) {
      studentResponse  = "Yes" ;
    } else {
      studentResponse = "No" ;
    }
    rows.push(createData(status, studentResponse, moment(job.startDate).format('DD-MM-YYYY HH:mm'), moment(job.endDate).format('DD-MM-YYYY HH:mm'), job.location, job.responses.length + "/" + job.studentsNumber, job.hourlyPayment));
  })
  return rows;
}


const SimpleTable = (props) => {
  const { classes, jobs } = props;
  const rows = generateRows(jobs);
 

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell  align="right">Answer</TableCell>
            <TableCell align="right">StartDate</TableCell>
            <TableCell align="right">EndDate</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="center">Payment per hour</TableCell>
            <TableCell align="center" >Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.status}
              </TableCell>
              <TableCell align="right">{row.studentResponse}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="center">{row.hourlyPayment}</TableCell>
              <TableCell align="center">
              <Fab color="primary" aria-label="Edit" className={classes.fab} style={{width:40, height:40}} >
               <EditIcon  />
               </Fab>
              </TableCell>
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
