import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Wrapper, Email } from "../../../general/SignIn/SignIn";
import { DialogTitle, DialogActions, DialogContent } from "../styles";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";

const StarRating = styled(StarRatingComponent)`
  padding: 8px;
  width: 250px;
  margin-top: 5px;
  margin-left: -20px;
  font-size: 1em;
  border-radius: 4px;
`;

const Label = styled.label`
  font-family: "Open Sans", sans-serif;
  font-size: 1em;
`;
const Box = styled.div`
  background: white;
  width: 300px;
  border-radius: 6px;

  margin: 0 auto 0 auto;
  padding: 0px 0px 20px 0px;
`;
class CompanyStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handleClose: this.props.handleClose,
      feedbackArray: [],
      score: 0
    };
  }

  componentDidMount() {
    let feedbackArray = [];

    // ia id-ul companiei
    // cauta-l peste tot in jobs cu responses
    // score array
    // feedbacks arrays
    // avg score: suma score/ core.length
    // set this as this as state
    this.props.firebase
      .users()
      .where("fullName", "==", this.props.activeRow.companyFullname) // ma duc in joburile companiei
      .onSnapshot(userSnapshot => {
        let id;
        let score = 0;
        userSnapshot.forEach(uerDoc => {
          id = uerDoc.id;
        });

        this.props.firebase.jobs().onSnapshot(jobSnapshot => {
          jobSnapshot.forEach(jobDoc => {
            if (jobDoc.data().companyUserUID === id) {
              const responses = jobDoc.data().responses;
              responses.forEach(response => {
                if (
                  response.studentResponse === true &&
                  response.feedback !== undefined &&
                  response.rating !== undefined
                ) {
                  score += response.feedback;
                  feedbackArray.push({
                    feedback: response.feedback,
                    rating: response.rating
                  });
                }
              });
            }
          });
          this.setState({
            handleClose: this.props.handleClose,
            feedbackArray,
            score
          });
        });
      });
  }
  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.handleClose && this.state.feedbackArray) {
      let score = 0;
      this.state.feedbackArray.forEach(feedback => {
        score += feedback.rating;
      });
      console.log(score);
      return (
        <div>
          <Dialog
            onClose={this.state.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.props.open}
            style={{ marginTop: -150 }}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.props.handleClose}
            >
              Statics of the company {this.props.activeRow.companyFullname}
            </DialogTitle>
            <DialogContent>
              <Wrapper style={{ marginTop: -10 }}>
                <Typography gutterBottom>
                  <Box>
                    {this.state.feedbackArray.length !== 0 && (
                      <h4 style={{ marginLeft: -60 }}>
                        Avg. rating of {score / this.state.feedbackArray.length}{" "}
                        from {this.state.feedbackArray.length} reviews
                      </h4>
                    )}
                    {this.state.feedbackArray &&
                      this.state.feedbackArray.map(feedback => {
                        return (
                          <Box>
                            <Label
                              style={{
                                float: "left",
                                marginTop: 10,
                                marginLeft: 20
                              }}
                            >
                              Rating
                            </Label>
                            <div style={{ fontSize: 25 }}>
                              <StarRating
                                name="rating"
                                starCount={10}
                                value={feedback.rating}
                              />
                            </div>

                            <Label
                              style={{
                                float: "left",
                                marginTop: 10,
                                marginLeft: 20
                              }}
                            >
                              Feedback
                            </Label>
                            <Email
                              type="text"
                              value={feedback.feedback}
                              disabled
                              style={{ width: 260, marginLeft: 15 }}
                            />
                          </Box>
                        );
                      })}
                    {this.state.feedbackArray.length === 0 && (
                      <h3>Looking for ratings for this company.. </h3>
                    )}
                  </Box>
                </Typography>
              </Wrapper>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

export default CompanyStatistics;
