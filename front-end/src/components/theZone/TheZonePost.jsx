import React from "react";
import "./TheZonePost.css";
import TheZoneCreateComment from "./TheZoneCreateComment";
import TheZoneAgree from "./TheZoneAgree";
import TheZoneComment from "./TheZoneComment";
import { getPost, deletePost } from '../../api/TheZoneCalls';
import AccessProfileText from '../general/AccessProfileText.jsx';


class TheZonePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "POST TITLE",
      poster: "Poster",
      body: "POST BODY",
      comments: [
      ]

    };
    this.addComment = this.addComment.bind(this);
    this.loadPost = this.loadPost.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  // add a new comment 
  addComment() {
    this.loadPost();
  }
  //TODO: get post data from back end api given the post id
  // and set the post data with state
  componentDidMount() {
    this.loadPost();
  }

  removeComment() {
    this.loadPost();
  }

  loadPost() {
    getPost(this.props.postid).then(result => {
      const commentList = [];
      result.comments.forEach(function (entry) {
        var dates = new Date(entry.date).toTimeString();
        entry.date = dates;
        commentList.push(entry);
      });
      this.setState({
        date: new Date(result.date).toTimeString(),
        title: result.content.title,
        poster: result.username,
        body: result.content.text,
        comments: commentList
      })
    })
	}


  handleDelete() {
    deletePost(
      this.props.postid
    ).then((response) => {
      // if response ok then delte the post
      if (response.ok) {
        this.props.removePost();
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
    if (this.state.poster === this.props.currentUser) {
      deleteButton = <div><button onClick={this.handleDelete}> Delete Post </button></div>
    } else {
      deleteButton = <div></div>
    }
    return (
      <div>
        <div className="postContainer">
          <div className="postHeaderContainer">
            <TheZoneAgree postid={this.props.postid} mode="post" />
            <div className="titleContainer">
              <h1 className="title">{this.state.title}</h1>
              <p>Posted by <AccessProfileText username={this.state.poster} handleViewProfile={this.props.handleViewProfile}/> on <span>{this.state.date}</span></p>
            </div>
          </div>
          {deleteButton}
          <div className="postContent">
            <p>{this.state.body}</p>
          </div>
          <div className="commentsContainer">
            <h3 className="commentTitleText">Comments</h3>
            {this.state.comments.map(
              comment => <TheZoneComment
                postid={this.props.postid}
                commentid={comment._id}
                agree={comment.agree}
                disagree={comment.disagree}
                username={comment.username}
                date={comment.date}
                text={comment.text}
                removeComment={this.removeComment}
                currentUser={this.props.currentUser}
                handleViewProfile={this.props.handleViewProfile}
              />
            )}
            <TheZoneCreateComment
              addComment={this.addComment}
              postid={this.props.postid}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TheZonePost;