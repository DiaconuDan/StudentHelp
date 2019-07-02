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
class StudentStatistics extends Component {
  constructor(props) {
    super(props);
    console.log("!!!!!", this.props.activeRow);
    this.state = {
      handleClose: this.props.handleClose
    };
  }

  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  componentDidMount() {
    // let score = 0 ;
    // let numberOfReceivedRatings = 0 ;
    // this.props.firebase.jobs().onSnapshot(jobSnapshot => {
    //   jobSnapshot.forEach(jobDoc => {
    //       const responses = jobDoc.data().responses;
    //         console.log(this.props.activeRow);
    //         console.log(this.props.activeRow.studentUserUID);
    //       responses.forEach(response => {
    //         if (
    //           response.studentResponse === true &&
    //           response.feedbackGivenFromCompany !== undefined &&
    //           response.ratingGivenFromCompany!== undefined && response.studentUserUID === this.props.activeRow.studentUserUID
    //         ) {
    //            console.log('intrat prietene') ;
    //           score += response.feedbackGivenFromCompany;
    //           numberOfReceivedRatings += 1;
    //         }
    //       });
    //   });
    //   this.setState({
    //     handleClose: this.props.handleClose,
    //     numberOfReceivedRatings,
    //     score
    //   });
    // });
  }

  render() {
    if (this.state.handleClose) {
      console.log(this.state);
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
                    ;
                    {this.props.activeRow.responses.map((response, index) => {
                      return (
                        <div
                          style={{ paddingBottom: 15, fontStyle: "Montserrat" }}
                        >
                          <h4
                            style={{
                              textAlign: "center",
                              fontStyle: "Montserrat"
                            }}
                          >
                            {" "}
                            Student {response.studentDetails.fullName}{" "}
                          </h4>
                          {/* <div style={{ fontSize: 30 }}>
                                                            <StarRatingComponent
                                                                value={9}
                                                                starCount={10} />
                                                        </div> */}
                          <Email
                            style={{ textAlign: "center" }}
                            type="text"
                            value={"Email: " + response.studentDetails.email}
                            readonly="readonly"
                          />
                          <Email
                            style={{ textAlign: "center" }}
                            type="text"
                            value={
                              "Phone: " + response.studentDetails.phoneNumber
                            }
                            readonly="readonly"
                          />
                          <Email
                            style={{ textAlign: "center" }}
                            type="text"
                            value={
                              "University: " +
                              response.studentDetails.university
                            }
                            readonly="readonly"
                          />
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
