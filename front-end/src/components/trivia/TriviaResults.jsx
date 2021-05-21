import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

/**
 * Displays the results of a Trivia game. Also provides buttons to play again
 * and go back to the main menu (start).
 * 
 * @param {*} props.results array of booleans where true is a correct answer
 * and false is an incorrect answer
 * @param {string} props.newAcs the player's new ACS after playing trivia
 * 
 * @param {*} props.onPlayAgain callback when player requests to play again
 * @param {*} props.onMainMenu callback when main menu is requested
 */
class TriviaResults extends React.Component {
  countCorrect() {
    let count = 0;
    this.props.results.forEach(result => {
      if (result) {
        count++;
      }
    });
    return count;
  }

  render() {
    // Success color if more correct than incorrect, normal if same amount,
    // red/error color if less
    // Text reflects whether the ACS stayed the same, increased, or decreased
    const correctCount = this.countCorrect();
    let correctColor = 'textPrimary';
    let acsTextPrefix = 'Your ACS did not change: ';
    const neutralThreshold = this.props.results.length / 2;
    if (correctCount > neutralThreshold) {
      correctColor = 'primary';
      acsTextPrefix = 'Your ACS increased to ';
    } else if (correctCount < neutralThreshold) {
      correctColor = 'error';
      acsTextPrefix = 'Your ACS decreased to ';
    }
    return (
      <Grid
        container
        spacing={2}
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12}>
          <Typography variant='h1' color={correctColor}>
            {correctCount + '/' + this.props.results.length + ' Correct'}
          </Typography>
        </Grid>
        {/* Text about the updated ACS */}
        <Grid item xs={12}>
          <Typography variant='h6' color='secondary'>
            {acsTextPrefix + this.props.newAcs}
          </Typography>
        </Grid>
        {/* Play Again and Main Menu buttons */}
        <Grid item container direction='row' spacing={2} xs={12}>
          <Grid item xs={6}>
            <Button
              variant='contained'
              color='primary'
              onClick={this.props.onPlayAgain}
            >
              Play Again
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant='contained'
              color='primary'
              onClick={this.props.onMainMenu}
            >
              Main Menu
            </Button>
          </Grid>
        </Grid> {/* Play Again and Main Menu buttons */}
      </Grid>
    );
  }
}

export default TriviaResults;
