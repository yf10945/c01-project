//Should probably have the main app pass user data when login auth success
//redirect function empty for now, not sure how to redirect in react -> maybe render a new page? 
import React from "react";
import "./TheZone.css";
import ScoreTicker from './ScoreTicker';


class TheZone extends React.Component{
  constructor(props) {
      super(props);
  }
  
  render() {
    return (
      <div>
        <ScoreTicker/>
        <div className="TheZoneContainer"> 
          <button onClick={this.props.redirectToTrivia}>Trivia</button>
          <h3>Description for Trivia</h3>
        </div>
        <div className="TheZoneContainer"> 
          <button onClick={this.props.redirectToDebate}>Debate</button>
          <h3>Description for Debate</h3>
        </div>
        <div className="TheZoneContainer"> 
          <button onClick={this.props.redirectToOpenCourt}>Open Court</button>
          <h3>Description for Open Court</h3>
        </div>
        <div className="TheZoneContainer"> 
          <button onClick={this.props.redirectToPicksAndPredictions}>Picks & Predictions</button>
          <h3>Description for Picks and Predictions</h3>
        </div>
      </div>
    )
  }
}

export default TheZone;