import React from 'react';
import TheZone from '../components/theZone/TheZone';
// replace whatever is in render with components
// needed for the page

class TheZonePage extends React.Component {
  
  render() {
    return (
      <div>
        <TheZone
          redirectToDebate={this.props.redirectToDebate}
          redirectToOpenCourt={this.props.redirectToOpenCourt}
          redirectToPicksAndPredictions={this.props.redirectToPicksAndPredictions}
          redirectToTrivia={this.props.redirectToTrivia}
          currentUser={this.props.currentUser}
          handleViewProfile={this.props.handleViewProfile}/>
      </div>
    )
  }
}

export default TheZonePage;
