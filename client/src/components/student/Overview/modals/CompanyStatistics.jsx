import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import { Wrapper, Email, Box } from "../../../general/SignIn/SignIn";
import { DialogTitle, DialogActions, DialogContent, styles } from '../styles';



class CompanyStatistics extends Component {
  constructor(props) {
    super(props);
    


    this.state = {
      handleClose: this.props.handleClose,
      feedbackArray: []
    };
  }

  componentDidMount() {
    let feedbackArray=[];
    let score = 0 ;
    // ia id-ul companiei
    // cauta-l peste tot in jobs cu responses 
    // score array
    // feedbacks arrays
    // avg score: suma score/ core.length
    // set this as this as state
    this.props.firebase
    .users()
    .where('fullName', '==', this.props.activeRow.companyFullname) // ma duc in joburile companiei
    .onSnapshot(userSnapshot => {
      let id ;
      userSnapshot.forEach(uerDoc => {
    
        id = uerDoc.id ;
      });
      
      this.props.firebase
      .jobs()
      .onSnapshot(jobSnapshot => {
      

        jobSnapshot.forEach(jobDoc => {
          if ( jobDoc.data().companyUserUID === id) {
            const responses = jobDoc.data().responses ;
            responses.forEach(response => {
              if ( response.studentResponse === true && response.feedback !== undefined && response.rating !== undefined) {
               
            
                feedbackArray.push({
                  feedback: response.feedback,
                  rating: response.rating
                })
              }
            })
          }
        });
        this.setState({
          handleClose: this.props.handleClose,
          feedbackArray
        })
      
      })
      
  
    
  
    });

   

  }
  onTodoChange(name, value) {
    this.setState({
      [name]: value
    });
  }

 
  render() {
    if ( this.state.handleClose && this.state.feedbackArray ) {
      let score = 0 ;
    console.log(this.state.feedbackArray);
    console.log(this.state.feedbackArray[0]);
        return (
            <div>
                <Dialog
              onClose={this.state.handleClose}
              aria-labelledby="customized-dialog-title"
              open={this.props.open}
              style={{ marginTop: -150 }}
            >
              <DialogTitle id="customized-dialog-title" onClose={this.props.handleClose}>
                Statics of the company {this.props.activeRow.companyFullname}
              </DialogTitle>
              <DialogContent>
                <Wrapper style={{ marginTop: -10 }}>
                  <Typography gutterBottom>
                    <Box>
                    <h4 style={{ marginLeft: -210 }}>  Rating </h4>
                        <div style={{ fontSize: 30 }}>
            {this.state.feedbackArray&& this.state.feedbackArray.map( feedback => {
              return <h1>{ feedback.rating } - {feedback.feedback}</h1>
            })}
                        </div>
                        <h4 style={{ marginLeft: -190 }}> Feedback </h4>
                        <Email
                          style={{ marginLeft: 12 }}
                          name="feeback"
                          type="text"
                          placeholder="Leave your opinion on this offer"
                          onChange={e => this.onTodoChange("feedback", e.target.value)}
                          required
                        />
                      
                    </Box>
                  </Typography>
                </Wrapper>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.handleClose} color="primary">
                  Save changez
                </Button>
              </DialogActions>
            </Dialog>
            </div>
          );
    } 
 
  }

}


export default CompanyStatistics ;
