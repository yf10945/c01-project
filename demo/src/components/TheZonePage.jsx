import React from 'react';
import TheZone from './theZone/TheZone';

// replace whatever is in render with components
// needed for the page

class TheZonePage extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div>
        <TheZone redirectToDebate={this.props.redirectToDebate}
          redirectToOpenCourt={this.props.redirectToOpenCourt}
          redirectToPicksAndPredictions={this.props.redirectToPicksAndPredictions}
          redirectToTrivia={this.props.redirectToTrivia}/>
      </div>
    )
  }
}

export default TheZonePage;
