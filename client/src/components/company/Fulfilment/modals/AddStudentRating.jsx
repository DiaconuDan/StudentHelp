import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Wrapper, Input, Box } from "../../../general/SignIn/SignIn";
import { DialogTitle, DialogActions, DialogContent } from '../styles';
import StarRatingComponent from 'react-star-rating-component';



class AddReview extends Component {
  constructor(props) {
    super(props);
    let students = [];
    let alreadyGivenRatingsAndFeedbacks = [];
    this.props.activeRow.responses.forEach((response, index) => {
      const feedbackName = 'feedback' + index;
      const ratingName = 'rating' + index;
      students.push({ feedback: response.feedbackGivenFromCompany, rating: response.ratingGivenFromCompany, feedbackValue: '', ratingInput: '', studentData: response.studentDetails, feedbackName: 'feedback' + index, ratingName: 'rating' + index });
      alreadyGivenRatingsAndFeedbacks = {
        ...alreadyGivenRatingsAndFeedbacks,
        [ratingName]: response.ratingGivenFromCompany,
        [feedbackName]: response.feedbackGivenFromCompany
      }
    });

    this.state = {
      handleClose: this.props.handleClose,
      students: students,
      ...alreadyGivenRatingsAndFeedbacks
    }
    console.log(this.state);


  }



  onStarClick(variable, value) {
    this.setState({ [variable]: value });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  addReview() {

    this.props.firebase.job(this.props.activeRow.docID)
      .get()
      .then(snapshot => {
        const job = snapshot.data();
        const responses = job.responses;
        for (let i = 0; i < responses.length; i++) {
          const rating = this.state[this.state.students[i].ratingName];
          const feedback = this.state[this.state.students[i].feedbackName];
          responses[i] = {
            ...responses[i],
            ratingGivenFromCompany: rating,
            feedbackGivenFromCompany: feedback
          }

        }
        console.log(responses);
        this.props.firebase.job(this.props.activeRow.docID).update({
          responses: responses
        });
        return this.props.handleClose();
      });




  }

  renderInput = (input) => {
    return (
      <div>
        <input
          type={input.type}
          name={input.name}
          placeholder={input.placeholder}
          onBlur={this.saveModule}
          value={input.value}
          onChange={this.handleInputChange}
        />
      </div>
    )
  }

  render() {

    if (this.state.handleClose) {
      return (
        <div>
          <Dialog
            onClose={this.state.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.props.open}
            style={{ marginTop: -100 }}
          >
            <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
              Rate the students
              </DialogTitle>
            <DialogContent>
              <Wrapper style={{ marginTop: -10 }}>
                <Typography gutterBottom>
                  <Box>
                    <form>
                      {this.state.students.length > 0 && this.state.students.map((student, index) => {
                        return (<div style={{ paddingBottom: 15 }}>
                          <h4 style={{ textAlign: "center" }}>  Rate {student.studentData.fullName}  </h4>   <div style={{ fontSize: 30 }}>  <StarRatingComponent
                            name={this.state.students[index].ratingName}
                            value={this.state[this.state.students[index].ratingName]}
                            starCount={10}
                            onChange={e => this.onTodoChange(this.state.students[index].feedbackName, e.target.value)}
                            onStarClick={this.onStarClick.bind(this, this.state.students[index].ratingName)}

                          />
                          </div>
                          <h4 style={{ textAlign: "center" }}> Feedback {student.studentData.fullName}  </h4>
                          <Input
                            style={{ textAlign: "center" }}
                            name={this.state.students[index].feedbackName}
                            type="text"
                            placeholder={this.state[this.state.students[index].feedbackName]}
                            onChange={e => this.onTodoChange(this.state.students[index].feedbackName, e.target.value)}
                            required />
                        </div>)
                      })}

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


export default AddReview;
