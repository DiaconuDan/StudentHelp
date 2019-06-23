import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Wrapper, Email, Box } from "../../../general/SignIn/SignIn";
import { DialogTitle, DialogActions, DialogContent } from '../styles';
import StarRatingComponent from 'react-star-rating-component';



class AddReview extends Component {
  constructor(props) {
    super(props);
    this.props.activeRow.responses.forEach( response => {
      if ( response.studentUserUID === this.props.authUser.uid) {
        this.state = { // eslint-disable-line
          rating: response.ratingGivenFromStudent,
          feedback: response.feedbackGivenFromStudent,
          handleClose: this.props.handleClose
        };
      }

    })
   
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  addReview() {
        // trimite docID, authUserID -> schimba la authUserID si adauga
        // fa update
        console.log("intrat");
        this.props.firebase.job(this.props.activeRow.docID)
        .get()
        .then(snapshot => {
          const job = snapshot.data();
          const responses = job.responses ;
            for ( let i = 0 ; i < responses.length; i++) {
                if ( responses[i].studentUserUID === this.props.authUser.uid) {
                    responses[i] = {
                        ...responses[i],
                        ratingGivenFromStudent: this.state.rating,
                        feedbackGivenFromStudent: this.state.feedback,
                        studentDetails: this.props.authUser
                    }
                }
            }
            console.log(responses);
            this.props.firebase.job(this.props.activeRow.docID).update({
                responses: responses
              }) ;
              return this.props.handleClose() ;
        });


    
  }
  render() {
    const {rating} = this.state ;
    if ( this.state.handleClose) {
        return (
            <div>
                <Dialog
              onClose={this.state.handleClose}
              aria-labelledby="customized-dialog-title"
              open={this.props.open}
              style={{ marginTop: -150 }}
            >
              <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                Rate this job from  {this.props.companyName}
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
                          name="feeback"
                          type="text"
                          placeholder={this.state.feedback === '' ? "Leave your opinion on this offer" : this.state.feedback}
                          onChange={e => this.onTodoChange("feedback", e.target.value)}
                          required
                        />
                      </form>
                    </Box>
                  </Typography>
                </Wrapper>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.addReview.bind(this)} color="primary">
                  Save changes
                </Button>
              </DialogActions>
            </Dialog>
            </div>
          );
    }
     
    
  }

}


export default AddReview ;
