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
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

// job : { studentsEnrolled: { UIDS}, }

const rows = [
  createData("Upcoming", "30 July 2019 12:00", "30 July 2019 15:00", "1/4", 25),
  createData("Running", "23 May 2019 16:00", "23 May 2019 20:00", "2/2", 35),
  createData("Finished", "1 May 2019 13:00", "1 May 2019 16:00", "3/3", 40),
  createData("Finished", "2 May 2019 13:00", "2 May 2019 16:00", "3/3", 40),
  createData("Finished", "3 May 2019 13:00", "3 May 2019 16:00", "3/3", 40),
  createData("Finished", "4 May 2019 13:00", "4 May 2019 16:00", "3/3", 40),
  createData("Finished", "5 May 2019 13:00", "5 May 2019 16:00", "3/3", 40),
  createData("Finished", "6 May 2019 13:00", "6 May 2019 16:00", "3/3", 40),
  createData("Finished", "7 May 2019 13:00", "7 May 2019 16:00", "3/3", 40)
];

function SimpleTable(props) {
  const { classes, jobs } = props;

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
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
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
