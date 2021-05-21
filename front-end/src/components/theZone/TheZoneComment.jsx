import React from 'react';
import TheZoneAgree from "./TheZoneAgree";
import './TheZoneComment.css';
import { deleteComment } from '../../api/TheZoneCalls';
import AccessProfileText from '../general/AccessProfileText.jsx';

class TheZoneComment extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    deleteComment(
      this.props.postid, this.props.commentid
    ).then((response) => {
      // if response ok then delte the post
      if (response.ok) {
        this.props.removeComment();
      }
    })
      .catch((error) => {
        // for debugging
        console.log(error);
        console.log('Error with response');
        this.setState({ error: true });
      });
  }

  render() {
    let deleteButton = null;
    if (this.props.username === this.props.currentUser) {
      deleteButton = <div><button onClick={this.handleDelete}> Delete Comment </button></div>
    } else {
      deleteButton = <div></div>
    }
    return (
      <div className="commentContainer">
        <TheZoneAgree postid={this.props.postid} commentid={this.props.commentid} like={this.props.agree - this.props.disagree} mode="comment" />
        <div> <p>Posted by <AccessProfileText username={this.props.username} handleViewProfile={this.props.handleViewProfile}/> on <span>{this.props.date}</span> </p> </div>
        <div> <p>{this.props.text}</p> </div>
        {deleteButton}
      </div>	
    );
  }
}

export default TheZoneComment;