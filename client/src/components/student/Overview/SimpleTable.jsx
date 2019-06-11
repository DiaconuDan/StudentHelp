import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
// TO DO : ending hour => end hour
// sortari

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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


const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);


let id = 0;
function createData(status, studentResponse, startDate, endDate, location, responsesNumber, hourlyPayment) {
  id += 1;
  return { id, status, studentResponse, startDate, endDate, location, responsesNumber, hourlyPayment };
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
    if (job.studentResponse === true) {
      studentResponse = "Yes";
    } else {
      studentResponse = "No";
    }
    rows.push(createData(status, studentResponse, moment(job.startDate).format('DD-MM-YYYY HH:mm'), moment(job.endDate).format('DD-MM-YYYY HH:mm'), job.location, job.responses.length + "/" + job.studentsNumber, job.hourlyPayment));
  })
  return rows;
}


class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.state={ open: false}
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {


    const { classes, jobs } = this.props;
    const rows = generateRows(jobs);


    return (
      <React.Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell align="right">Answer</TableCell>
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
                  <Fab color="primary" aria-label="Edit" className={classes.fab} style={{ width: 40, height: 40 }} onClick={this.handleClickOpen} >
                    <EditIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Modal title
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac
              facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum
              at eros.
            </Typography>
            <Typography gutterBottom>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </Typography>
            <Typography gutterBottom>
              Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
              scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
              auctor fringilla.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  };
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
