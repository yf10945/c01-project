import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { createComment } from '../../api/TheZoneCalls.js';

class TheZoneCreateComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      body: "",
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  //TODO: call backend api and submit comment with state values 
  // and update parent post comment on success to rerender the comments
  handleSubmit() {
    if (this.state.body !== "") {
      // create comment ith the following parameters
      // current post id 
      // content of the comment stored in state
      createComment(
        this.props.postid, this.state.body
      ).then((response) => {
        // if response ok then create comment on front end and clear the inputs
        if (response.ok) {
          // add comment to post
          this.props.addComment(this.state.body);
          this.setState({ body: "" })
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
          <label> Comment: </label>
        </div>
        <TextareaAutosize
          rowsMin={3}
          name="body"
          value={this.state.body}
          onChange={this.handleChange}
        />        
        <div>
        <button onClick={this.handleSubmit}> Submit Comment </button>
        </div>
      </div>
    );
  }
}

export default TheZoneCreateComment;