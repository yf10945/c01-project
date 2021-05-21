import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { createPost } from '../../api/TheZoneCalls.js';

class TheZoneCreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      title: "",
      body: "",
      date: new Date(),
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  //TODO: call backend api and submit post with state values
  // and update PostList on success add to re-render the comments
  handleSubmit() {
    if (this.state.title !== "" && this.state.body !== "") {
      // create post with the following parameters
      // content of the post stored in state
      createPost(
        this.state.title, this.state.body
      ).then((response) => {
        // if response ok then create post on front end and clear the inputs
        if (response.ok) {
          // dummy post id
          this.props.addPost();
          this.setState({ title: "", body: "" })
        // else set error to true
        } else {
          this.setState({ error: true });
        }
      }) 
        .catch((error) => {
        // for debugging
        console.log(error);
        console.log('Error with response');
        this.setState({ error: true });
      });
    }
  }
  
  render() {
    return (
      <div>
        <div>
          <label> Post Title: </label>
        </div>
        <div>
          <input
            className="postTitle"
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label> Post Body: </label>
        </div>
        <TextareaAutosize
          rowsMin={3}  
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        />              
        <div>
        <button onClick={this.handleSubmit}> Submit Post </button>
        </div>
      </div>
    );
  }
}

export default TheZoneCreatePost;