import React from "react";
import "./DebatePost.css";
import DebateAgree from "./DebateAgree";
import { getPost, deletePost } from '../../api/DebateCalls';

class DebatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "Topic Here",
      poster: "Poster",
      body: "POST BODY",
      error: false,
      errorMessage: "",
      agreeActive: false
    };
    this.loadPost = this.loadPost.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  componentDidMount() {
    this.loadPost();
  }

  hideError() {
    this.setState({ error: false });
	}

  displayErrorMessage(response) {
    this.setState({ error: true });
    if (response.status === 400) {
      this.setState({ errorMessage: "Bad input, please choose a number between 0 to 100." });
    } else if (response.status === 401) {
      this.setState({ errorMessage: "Session expired, please login again." });
    } else if (response.status === 404) {
      this.setState({ errorMessage: "Post no longer exists. Please refresh the page." });
		} else if (response.status === 500) {
      this.setState({ errorMessage: "Error with writing to database." });
    }
  }


  loadPost() {
    getPost(this.props.username).then(result => {
      this.setState({
        likes: Math.ceil(result.score),
        agreeActive: true,
        topic: result.question.question,
        body: result.answer,
        poster: result.username
      })
    })
	}

  render() {
    return (
      <div>
        <div className="postContainer">
          <div className="postHeaderContainer">
            {this.state.agreeActive ?
              <DebateAgree username={this.props.username}
                currentUser={this.props.currentUser}
                displayErrorMessage={this.displayErrorMessage}
                hideError={this.hideError}
                likes={this.state.likes}/>
             : null}
            <div className="titleContainer">
              <h1 className="title">{this.state.topic}</h1>
              <p>Posted by <span>{this.state.poster}</span></p>
            </div>
          </div>
          <div className="postContent">
            <p>{this.state.body}</p>
          </div>
        </div>
        <div className="errorText">
          {this.state.error ? this.state.errorMessage : ''}
        </div>
       </div>
    );
  }
}

export default DebatePost;