import React from "react";

class TheZoneAgreeScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      agreePercentage:0
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  //TODO :call backend API to submit user agree percent
  // maybe update user agree percent if there is already a record?
  handleSubmit() {
    
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return(
      <div>
        <div>
          <div>
            <span>{this.state.agreePercentage}</span>
          </div>
          <input
            name="agreePercentage"
            type="range"
            min="0"
            max="100"
            step="1"
            value={this.state.agreePercentage}
            onChange={this.handleChange}
          >
          </input>
          
        </div>
        <button onClick={this.handleSubmit}>Agree</button>
      </div>
    );
  }
}

export default TheZoneAgreeScale;