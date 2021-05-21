import React from 'react';
import DebatePost from './DebatePost';

class DebatePostGroup extends React.Component {
 
  render() {
    return (
      <div>
        {this.props.userGroup.map(
          key => <DebatePost
            username = {key}
            currentUser={this.props.currentUser}
          />)}
        <div className="divider">
        </div>
      </div>
    );
  }
}

export default DebatePostGroup;