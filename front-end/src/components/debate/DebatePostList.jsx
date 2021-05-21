import React from 'react';
import DebatePostGroup from './DebatePostGroup';
import DebateCreatePost from './DebateCreatePost';
import { getAllPost } from '../../api/DebateCalls';

class DebatePostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.addPost = this.addPost.bind(this);
  }
  
  componentDidMount() {
    getAllPost().then(result =>  {
      this.setState({
        users: result
      })
    })
  }
  
  addPost() {
    getAllPost().then(result => {
      this.setState({
        users: result
      })
    })
  }
 
  render() {
    return (
      <div>
        <div>
          <DebateCreatePost
            className="createPost"
            addPost={this.addPost} />
        </div>
        
        {this.state.users.map(
          key => <DebatePostGroup
            userGroup = {key}
            currentUser={this.props.currentUser}
          />
         )}
  
      </div>
    );
  }
}

export default DebatePostList;