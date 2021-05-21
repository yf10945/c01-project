import React from 'react';
import TriviaQuestion from './TriviaQuestion';

/**
 * The actual trivia game. Displays each question and their possible answers.
 * The player is shown the question first for `props.previewTimer` seconds,
 * and then they have to pick an answer within `props.answerTimer` seconds.
 * 
 * The question object has the shape:
 * ```
 * {
 *  _id: string;
 *  question: string;
 *  answer: string;
 *  other: string[]; // at least 1 string
 * }
 * ```
 */
class TriviaGame extends React.Component {
  /**
   * @param {*[]} props.triviaQuestions an array of trivia question objects
   * @param {Number} props.previewTimer number of seconds to preview the question for
   * @param {Number} props.answerTimer number of seconds to choose an answer
   * @param {*} props.onFinish callback when all trivia questions are answered.
   * Accepts an array of booleans which indicate whether the player answered
   * correctly or incorrectly for each question in the same order as
   * `props.triviaQuestions`
   */
  constructor(props) {
    super(props);
    this.state = {
      // The current question index; 0 <= questionCount < total
      questionCount: 0,
      // Total number of questions
      total: this.props.triviaQuestions.length,
      // The result of each question in the same order as props.triviaQuestions
      results: []
    };
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  componentDidUpdate() {
    // If there are no questions left, then invoke the callback
    if (this.state.questionCount >= this.state.total) {
      this.props.onFinish(this.state.results);
    }
  }

  // When a trivia question is answered.
  handleAnswer(correct) {
    // Record the result
    // Move to the next question
    this.setState((state) => ({
      results: state.results.concat(correct),
      questionCount: state.questionCount + 1
    }));
  }

  render() {
    const questions = this.props.triviaQuestions;
    const previewTimer = this.props.previewTimer;
    const answerTimer = this.props.answerTimer;
    // For each trivia question, show the question and then prompt the user
    // for an answer within the time given.
    let content = null;
    if (this.state.questionCount < this.state.total) {
      // Note: handleAnswer() will increment the count
      content = (
        <TriviaQuestion
          question={questions[this.state.questionCount]}
          questionNumber={this.state.questionCount + 1}
          questionTotal={this.state.total}
          previewTimer={previewTimer}
          answerTimer={answerTimer}
          onAnswer={this.handleAnswer}
          // Key is essential for telling React to recreate this component when
          // it's question prop changes. Without a key, any state in
          // TriviaQuestion will NOT be reset, which breaks it's intended
          // behaviour, because React will only update the existing one without
          // reseting it's state ie. the previous state persists.
          key={'TQ-' + this.state.questionCount}
        />
      );
    }
    return content;
  }
}

export default TriviaGame;
