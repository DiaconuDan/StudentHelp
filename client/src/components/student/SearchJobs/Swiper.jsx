import React, {Component} from "react";
import Swipeable from "react-swipy"

import Card from "./Card";
import Button from "./Button";

const wrapperStyles = {position: "relative", width: "250px", height: "250px", marginLeft: "30%"};
const actionsStyles = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: 12,
};

class Swiper extends Component {
  state = {
    cards: ["First", "Second", "Third"],
    jobs: [{ id: 1, location: "Zara"}, {id:2, location: "Palas"}]
  };
 
  componentDidMount() {
   // refa cards
  }

  onAnswer = answer => {
    const {jobs} = this.state;
    console.log(answer) ;
    console.log(jobs[0].location);
  }

  remove = () =>

    this.setState(({jobs}) => ({
      jobs: jobs.slice(1, jobs.length),
    }));

  render() {
    const {jobs} = this.state;

    return (
      <div>
        <div style={wrapperStyles}>
          {jobs.length > 0 ? (
            <div style={wrapperStyles}>
              <Swipeable
                buttons={({left, right}) => (
                  <div style={actionsStyles}>
                    <Button onClick={left}>Reject</Button>
                    <Button onClick={right}>Accept</Button>
                  </div>
                )}
                onSwipe= {this.onAnswer}
                onAfterSwipe={this.remove}
              >
                <Card>{jobs[0].location}</Card>
              </Swipeable>
              {jobs.length > 1 && <Card zIndex={-1}>{jobs[1].location}</Card>}
            </div>
          ) : (
            <Card zIndex={-2}>No more jobs available</Card>
          )}
        </div>
      </div>
    );
  }
}

export default Swiper;