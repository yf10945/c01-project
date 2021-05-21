import React from 'react';
import Debate from '../components/debate/Debate';
// replace whatever is in render with components
// needed for the page

class DebatePage extends React.Component {
  
  render() {
    return (<Debate currentUser={this.props.currentUser}/>)
  }
}

export default DebatePage;
