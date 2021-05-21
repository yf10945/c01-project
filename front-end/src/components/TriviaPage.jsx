import React from 'react';
import Trivia from './trivia/Trivia';
import './TriviaPage.css';

/**
 * The container for playing a Trivia game.
 */
class TriviaPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  
  render() {
    return <div className="TriviaPage"><Trivia/></div>;
  }
}

export default TriviaPage;
