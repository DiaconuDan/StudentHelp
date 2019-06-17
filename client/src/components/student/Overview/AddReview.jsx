import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Wrapper, Email, Box } from "../../general/SignIn/SignIn";
import { DialogTitle, DialogActions, DialogContent, styles } from './styles';
import StarRatingComponent from 'react-star-rating-component';



class AddReview extends Component {
  constructor(props) {
    super(props);
    const authUser = this.props.authUser;
    this.state = {
      rating: this.props.rating,
      feedback: this.props.feedback
    };
  }
 
  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    const {rating} = this.state ;

   
      return (
        <div>
            <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={true}
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
            <Button onClick={this.props.handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      );
    
  }

}


export default AddReview ;
