import React from 'react';
import TheZonePost from './TheZonePost';
import TheZoneCreatePost from './TheZoneCreatePost';
import { getAllPost } from '../../api/TheZoneCalls';

class TheZonePostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      postid: [
      ]
    };
    this.addPost = this.addPost.bind(this);
    this.removePost = this.removePost.bind(this);
  }
  
  //TODO: get list of all posts from the backend api to display
  componentDidMount() {
    getAllPost().then(result =>  {
      this.setState({
        postid: result
      })
    })
  }

  // add a new post to post list
  addPost() {
    getAllPost().then(result => {
      this.setState({
        postid: result
      })
    })
  }

  removePost() {
    getAllPost().then(result => {
      this.setState({
        postid: result
      })
    })
	}
 
  render() {
    return (
      <div>
        <div>
          <TheZoneCreatePost
            addPost={this.addPost} />
        </div>
        {this.state.postid.map(
          id => <TheZonePost
            key={id.toString()}
            postid={id}
            currentUser={this.props.currentUser}
            removePost={this.removePost}
            handleViewProfile={this.props.handleViewProfile} />)}
      </div>
    );
  }
}

export default TheZonePostList;