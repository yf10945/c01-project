//Should probably have the main app pass user data when login auth success
//redirect function empty for now, not sure how to redirect in react -> maybe render a new page? 
import React from "react";
import "./TheZone.css";
import ScoreTicker from './ScoreTicker';
import TheZonePostList from './TheZonePostList';


class TheZone extends React.Component{

  render() {
    return (
      <div>
        <div className="TheZoneContainer"> 
          <button className="redirect" onClick={this.props.redirectToTrivia}>Trivia</button>
          <button className="redirect" onClick={this.props.redirectToPicksAndPredictions}>Picks & Predictions</button>
          <button className="redirect" onClick={this.props.redirectToDebate}>Debate</button>
        </div>
        <TheZonePostList currentUser={this.props.currentUser} handleViewProfile={this.props.handleViewProfile}/>
      </div>
    )
  }
}

export default TheZone;