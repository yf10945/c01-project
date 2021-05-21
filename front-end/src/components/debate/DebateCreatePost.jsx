import React from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { createPost } from '../../api/DebateCalls';

class DebateCreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      body: "",
      error:false,
      errorMessage: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayErrorMessage = this.displayErrorMessage.bind(this);
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  displayErrorMessage(response) {
    if (response.status === 400) {
      this.setState({ errorMessage: "You already submitted an analysis." });
    } else if (response.status === 401) {
      this.setState({ errorMessage: "Session expired, please login again." });
    } else if (response.status === 500) {
      this.setState({ errorMessage: "Error with writing to database." });
		}
	}
  
  handleSubmit() {
    if (this.state.body !== "") {
      // create post with the following parameters
      // content of the post stored in state
      createPost(
        this.state.body
      ).then((response) => {
        // if response ok then create post on front end and clear the inputs
        if (response.ok) {
          this.props.addPost();
          this.setState({ body: "", error: false, errorMessage: "" })

        // else set error to true
        } else {
          this.setState({ error: true });
          this.displayErrorMessage(response);
        }
      }) 
        .catch((error) => {
        // for debugging
          console.log(error);
          this.setState({ error: true, errorMessage: "Error with response" });
      });
    }
  }
  
  render() {
    return (
      <div>
        <div>
          <label> Submit your Analysis here: </label>
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
        <div className="errorText">
          {this.state.error ? this.state.errorMessage : ''}
        </div>
      </div>
    );
  }
}

export default DebateCreatePost;
