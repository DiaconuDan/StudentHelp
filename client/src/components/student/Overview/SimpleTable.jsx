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
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Wrapper, Email, Box } from "../../general/SignIn/SignIn";
import { DialogTitle, DialogActions, DialogContent, styles } from './styles';
import StarRatingComponent from 'react-star-rating-component';
import { generateRows } from './utils';
import { WindowClose } from 'styled-icons/fa-regular/WindowClose';
import { EyeClosed } from 'styled-icons/octicons/EyeClosed';
import classNames from 'classnames';
import { CheckCircle } from 'styled-icons/boxicons-regular/CheckCircle';
import AddReview from './AddReview';

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = { open: false, editRow: null };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  handleClickOpen = row => event => {

    this.setState({
      open: true,
      editRow: {
        ...row
      }
    });
  };

  handleClose = () => {


    console.log("intrat");
    this.setState({ open: false });
  };

  render() {
    const { classes, jobs } = this.props;

    const rows = generateRows(jobs);
    let companyName;
    if (this.state.editRow) {
      companyName = this.state.editRow.companyFullname;
    }
    else {
      companyName = "Company";
    }
    return (
      <React.Fragment>
        <Paper className={classes.root} >
          <Table className={classes.table} >
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
                    {row.status === "Finished" && <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >  {row.status} </Button>}
                    {row.status === "Upcoming" && <Button
                      variant="contained"
                      color="primary"
                      className={classNames(classes.margin, classes.cssRoot, classes.button)}
                    >
                      {row.status} </Button>}

                  </TableCell>
                  <TableCell align="left">{row.studentResponse === "Yes" && <CheckCircle />}{row.studentResponse === "No" && <WindowClose />}</TableCell>
                  <TableCell align="left">{row.companyFullname}</TableCell>
                  <TableCell align="left">{row.startDate}</TableCell>
                  <TableCell align="left">{row.endDate}</TableCell>
                  <TableCell align="left">{row.location}</TableCell>
                  <TableCell align="center">{row.hourlyPayment}</TableCell>
                  <TableCell align="center">
                    {row.status === "Finished" &&
                      (<Fab
                        color="primary"
                        aria-label="Edit"
                        className={classes.fab}
                        style={{ width: 40, height: 40 }}
                        onClick={this.handleClickOpen(row)}

                      >
                        <EditIcon />
                      </Fab>)}
                    {row.status === "Upcoming" &&
                      (<Fab
                        color="primary"
                        aria-label="Edit"
                        className={classes.fab}
                        style={{ width: 40, height: 40 }}
                        onClick={this.handleClickOpen(row)}
                        disabled
                      >
                        <EditIcon />
                      </Fab>)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          { this.state.editRow != null && <AddReview open={this.state.open} handleClose={this.handleClose} companyName={companyName} activeRow={this.state.editRow} rating={this.state.editRow.rating} feedback={this.state.editRow.feedback} authUserUID = {this.props.authUser.uid} firebase={this.props.firebase}/>}
        </Paper>
      
        {/* { this.state.open && (  <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
          style={{ marginTop: -150 }}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Rate this job from  {companyName}
          </DialogTitle>
          <DialogContent>
            <Wrapper style={{ marginTop: -10 }}>
              <Typography gutterBottom>
                <Box>
                  <form>
                    <h4 style={{ marginLeft: -210 }}>  Rating </h4>
                    <div style={{ fontSize: 30 }}>
                      <StarRatingComponent
                        name="rating"
                        starCount={10}
                        value={rating}
                        onStarClick={this.onStarClick.bind(this)}
                      />
                    </div>
                    <h4 style={{ marginLeft: -190 }}> Feedback </h4>
                    <Email
                      style={{ marginLeft: 12 }}
                      name="rating"
                      type="text"
                      placeholder="Leave your opinion on this offer"
                      required
                    />
                  </form>
                </Box>
              </Typography>
            </Wrapper>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>)} */}

      </React.Fragment>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
