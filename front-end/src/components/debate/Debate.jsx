
import React from "react";
import "./Debate.css";
import DebatePostList from './DebatePostList';
import { getDebateTopic } from '../../api/DebateCalls';

class Debate extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      topic: "DEBATE TOPIC HERE"
    };
  }

  componentDidMount() {
    getDebateTopic().then(result => {
      this.setState({
        topic: result.question.question

      })
    })
  }
  render() {
    return (
      <div>
        <div className="debateSubmit">
          <h2> Your Debate Topic For Today is: </h2>
          <h2> {this.state.topic} </h2>
        </div>
        <DebatePostList currentUser={this.props.currentUser}/>
      </div>
    )
  }
}

export default Debate;