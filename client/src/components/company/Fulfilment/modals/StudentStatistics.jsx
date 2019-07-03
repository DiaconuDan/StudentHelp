import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Wrapper, Input } from "../../../general/SignIn/SignIn";
import { DialogTitle, DialogActions, DialogContent } from "../styles";
import styled from "styled-components";
// import StarRatingComponent from "react-star-rating-component";

// const StarRating = styled(StarRatingComponent)`
//   padding: 8px;
//   width: 250px;
//   margin-top: 5px;
//   margin-left: -20px;
//   font-size: 1em;
//   border-radius: 4px;
// `;

// const Label = styled.label`
//   font-family: "Open Sans", sans-serif;
//   font-size: 1em;
// `;
const Box = styled.div`
  background: white;
  width: 300px;
  border-radius: 6px;

  margin: 0 auto 0 auto;
  padding: 0px 0px 20px 0px;
`;
class StudentStatistics extends Component {
  constructor(props) {
    super(props);
    console.log("!!!!!", this.props.activeRow);
    this.state = {
      handleClose: this.props.handleClose,
      statisticsOfStudents: []
    };
  }

  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    let statisticsOfStudents = [];

    this.props.activeRow.responses.forEach(student => {
      let score = 0;
      let numberOfReceivedRatings = 0;
      let receivedFeedbacksOfStudent = [];
      this.props.firebase.jobs().onSnapshot(jobSnapshot => {
        jobSnapshot.forEach(jobDoc => {
          const responses = jobDoc.data().responses;

          responses.forEach(response => {
            if (
              response.studentResponse === true &&
              response.feedbackGivenFromCompany !== undefined &&
              response.ratingGivenFromCompany !== undefined &&
              response.studentUserUID === student.studentUserUID
            ) {
              score += response.ratingGivenFromCompany;
              numberOfReceivedRatings += 1;
              receivedFeedbacksOfStudent.push(
                response.feedbackGivenFromCompany
              );
            }
          });
        });

        statisticsOfStudents.push({
          score: score,
          numberOfReceivedRatings: numberOfReceivedRatings,
          feedbacks: receivedFeedbacksOfStudent
        });

        console.log(statisticsOfStudents);
        this.setState({
          statisticsOfStudents: statisticsOfStudents
        });
      });
    });


  }

  render() {
    if (this.state.handleClose && this.state.statisticsOfStudents) {
      
  
      return (
        <div>
          <Dialog
            onClose={this.state.handleClose}
            aria-labelledby="customized-dialog-title"
            open={this.props.open}
            style={{ marginTop: -20 }}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={this.props.handleClose}
              style={{ textAlign: "center", fontStyle: "Montserrat" }}
            >
              Student details
            </DialogTitle>
            <DialogContent>
              <Wrapper style={{ marginTop: -10 }}>
                <Typography gutterBottom>
                  <Box>
                    {this.props.activeRow.responses.length === 0 && (
                      <h3
                        style={{ textAlign: "center", fontStyle: "Montserrat" }}
                      >
                        {" "}
                        No students registered yet{" "}
                      </h3>
                    )}
                    
                    {this.props.activeRow.responses.map((response, index) => {
                      return (
                        <div
                          style={{
                            paddingBottom: 15, fontStyle: "Montserrat", border: "1px solid rgb(87, 48, 139)",
                            borderRadius: "14px",
                            marginBottom: "8px"
                          }}
                        >
                        

                          {this.state.statisticsOfStudents && this.state.statisticsOfStudents[index] && (
                              <h4
                        
                              >
                                Avg. rating of {(this.state.statisticsOfStudents[index].score / this.state.statisticsOfStudents[index].numberOfReceivedRatings).toFixed(2) } from {this.state.statisticsOfStudents[index].numberOfReceivedRatings} {this.state.statisticsOfStudents[index].numberOfReceivedRatings > 1 ? 'reviews':'review'}
                              </h4>
                            )}
                            <Input
                            style={{ textAlign: "center" }}
                            type="text"
                            value={"Fullname: " + response.studentDetails.fullName}
                            readonly="readonly"
                          />
                          
                          <Input
                            style={{ textAlign: "center" }}
                            type="text"
                            value={"Email: " + response.studentDetails.email}
                            readonly="readonly"
                          />
                          <Input
                            style={{ textAlign: "center" }}
                            type="text"
                            value={
                              "Phone: " + response.studentDetails.phoneNumber
                            }
                            readonly="readonly"
                          />
                          <Input
                            style={{ textAlign: "center" }}
                            type="text"
                            value={
                              "University: " +
                              response.studentDetails.university
                            }
                            readonly="readonly"
                          />
                        
                        
                            <h4> Feedbacks: </h4>
                          {this.state.statisticsOfStudents && this.state.statisticsOfStudents[index] &&
                            this.state.statisticsOfStudents[index].feedbacks.map((feedback, newIndex) => {
                              return <Input
                                style={{ textAlign: "center", display: this.state.statisticsOfStudents[index].numberOfReceivedRatings - 1 < newIndex ? "none" : "inline" }}
                                type="text"
                                value={
                                feedback
                                }
                                readonly="readonly"
                              />
                            })}
                        </div>
                      );
                    })}
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

export default StudentStatistics;
