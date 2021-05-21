import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import { shuffle } from '../../util/utilities';

// The 3 possible phases
const PREVIEW = 0;  // Preview the question
const SELECT = 1;  // Select an answer within the alloted time
const RESULTS = 2;  // Answer was selected or time ran out

// Minimum amount of milliseconds to display results before calling onAnswer
const RESULTS_DELAY = 1500;

// Max number of characters in a question before decreasing the Question
// text size so it fits nicely on the screen
const LARGE_CHARACTER_LIMIT = 145;

/**
 * Shows the given question `props.question.question` for `props.previewTimer`
 * seconds, then gives `props.answerTimer` seconds for the player to choose an
 * answer. Calls `props.onAnswer` when the player chooses an answer or the
 * time runs out.
 */
class TriviaQuestion extends React.Component {
  /**
   * @param {*} props.onAnswer callback when an answer is selected or time runs
   * out. Accepts 1 argument: `correct`: boolean. `correct` is true when the
   * selected answer matches `props.question.answer`, otherwise false. If no
   * answer is selected, that is the time runs out, then false.
   */
  constructor(props) {
    super(props);
    this.state = {
      // Number of seconds elapsed
      time: 0,
      // Disables the answer buttons if true. The index corresponds to an
      // index in the answer array (see componentDidMount()). It is set in
      // componentDidMount since there are a variable number of answers
      disabled: [],
      // The index of the answer that the player selected
      selected: null
    }
    
    this.handleAnswerSelect = this.handleAnswerSelect.bind(this);
  }

  componentDidMount() {
    // Setup a timer for every second
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
    // Collect trivia answers into one for easy iterating, and randomly
    // shuffle their order
    this.answers = [this.props.question.answer, ...this.props.question.other];
    shuffle(this.answers);
    // Populate the disabled array to match the number of answers given
    let disable = [];
    for (let i = 0; i < this.answers.length; i++) {
      disable.push(false);
    }
    this.setState({disabled: disable});
  }

  componentWillUnmount() {
    // Done using the timer
    clearInterval(this.timerId);
  }

  // Updates state every second
  tick() {
    // Need to disable all answers if one wasn't selected during SELECT phase
    // Have to check the second before the SELECT phase ends, otherwise the
    // change will occur 1 second after RESULTS begins
    const time = this.state.time;
    const preview = this.props.previewTimer;
    const answer = this.props.answerTimer;
    if (time === preview + answer - 1 ) {
      if (this.state.selected === null) {
        let disableAll = [];
        for (let i = 0; i < this.answers.length; i++) {
          disableAll.push(true);
        }
        this.setState((state) => ({
          time: state.time + 1,
          disabled: disableAll
        }));
      }
    // Display result for specified milliseconds before indicating an answer
    // is selected or timeout
    } else if (this.getPhase() === RESULTS) {
      // No longer need to update state every second
      clearInterval(this.timerId);
      const result = this.isCorrect();
      setTimeout(this.props.onAnswer, RESULTS_DELAY, result);
    // Otherwise just elapse 1 second
    } else {
      this.setState((state) => ({
        time: state.time + 1
      }));
    }
  }

  // Returns the current phase: `PREVIEW`, `SELECT`, or `RESULTS`
  getPhase() {
    let phase = null;
    const time = this.state.time;
    const preview = this.props.previewTimer;
    const answer = this.props.answerTimer;
    // Preview phase is within the first `props.previewTimer` seconds
    if (time < preview) {
      phase = PREVIEW;
    // Selection phase comes right after preview for `props.answerTimer` seconds
    } else if (this.state.selected === null && (time < answer + preview)) {
      phase = SELECT;
    // Results phase when an answer is selected within the given time or
    // time runs out before an answer is selected
    } else {
      phase = RESULTS;
    }
    return phase;
  }

  // Returns true if the selected answer is correct, otherwise false.
  // If no answer is selected, then false.
  isCorrect() {
    let correct = false;
    const selected = this.state.selected;
    const correctAnswer = this.props.question.answer;
    if (selected != null && this.answers[selected] === correctAnswer) {
      correct = true;
    }
    return correct;
  }

  // When an answer is selected
  handleAnswerSelect(answerIndex) {
    // Since an answer can only be selected once, disable the other options
    // and record the answer
    let disable = [];
    for (let i = 0; i < this.answers.length; i++) {
      disable.push(true);
    }
    disable[answerIndex] = false;
    this.setState({disabled: disable, selected: answerIndex});
  }

  render() {
    return(
      <Grid
        container
        className='TriviaQuestion'
        spacing={2}
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12}>{this.renderQuestion()}</Grid>
        <Grid item xs={12}>{this.renderQuestionCount()}</Grid>
        {/* The possible answers */}
        <Grid container item xs={12} spacing={2}>
          {
            this.getPhase() !== PREVIEW
            ? this.renderAnswers()
            : null
          }
        </Grid>
        {/* The countdown, or icon for correct/incorrect answer */}
        <Grid item xs={12}>
          {
            this.state.selected === null && this.getPhase() !== RESULTS
            ? this.renderTimer()
            : this.renderResult()
          }
        </Grid>
      </Grid>
    );
  }

  renderQuestion() {
    // Lower font size if the question is long
    let size = 'h2';
    if (this.props.question.question.length > LARGE_CHARACTER_LIMIT) {
      size = 'h4';
    }
    return (
      <Typography variant={size} color='textPrimary'>
        {this.props.question.question}
      </Typography>
    );
  }

  renderQuestionCount() {
    return (
      <Typography variant='subtitle1' color='textSecondary'>
        {this.props.questionNumber + '/' + this.props.questionTotal}
      </Typography>
    );
  }

  renderAnswers() {
    return this.answers.map((answer, index) => (
      <Grid item xs={12} sm={6} key={'TriviaAnswer-' + index}>
        <Button
          disabled={this.state.disabled[index]}
          value={index}
          onClick={() => this.handleAnswerSelect(index)}
          variant='contained'
          color='primary'
        >
          {answer}
        </Button>
      </Grid>
    ));
  }

  renderTimer() {
    let timer = null;
    const previewTime = this.props.previewTimer;
    const answerTime = this.props.answerTimer;
    // Render the countdown for each phase
    if (this.getPhase() === PREVIEW) {
      // Question preview
      timer = (
        <Typography variant='h2' color='secondary'>
          {previewTime - this.state.time}
        </Typography>
      );
    // Answer phase
    } else if (this.getPhase() === SELECT) {
      // Want the time since the preview phase ended
      const decrement = this.state.time - previewTime;
      timer = (
        <Typography variant='h2' color='secondary'>
          {answerTime - decrement}
        </Typography>
      );
    }
    return timer;
  }

  renderResult() {
    // Checkmark for correct answer, X for incorrect
    const hugeSize = { fontSize: 100 };
    let result = <CloseIcon color='error' style={hugeSize} />;
    if (this.isCorrect()) {
      // Perhaps set a theme color for success and use that instead?
      result = <CheckIcon color='primary' style={hugeSize} />;
    }
    return result;
  }
}

export default TriviaQuestion;
