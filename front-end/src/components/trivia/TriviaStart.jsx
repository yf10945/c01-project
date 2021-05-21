import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';

/**
 * The start screen of Trivia.
 * Lets the user choose Solo Trivia or Head to Head Trivia.
 * 
 * @param props.onSolo callback when Solo Trivia is selected
 * @param props.onHeadToHead callback when Head to Head Trivia is selected
 * @param props.errorText optional error text to display
 */
class TriviaStart extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  render() {
    return (
      <Grid
        container
        spacing={2}
        direction='column'
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12}>
          <Typography variant="h1" color='textPrimary'>Trivia</Typography>
        </Grid>

        {/* Solo and Head to Head buttons */}
        <Grid item container direction='row' spacing={2} xs={12}>
          <Grid item xs={6}>
            <Button
              variant='contained'
              color='primary'
              onClick={this.props.onSolo}
            >
              Play Solo
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              disabled
              variant='contained'
              color='primary'
              onClick={this.props.onHeadToHead}
            >
              Play Head to Head
            </Button>
          </Grid>
        </Grid> {/* Solo and Head to Head buttons */}

        {/* Optional error text */}
        <Grid item xs={12}>
          <Typography variant='body1' color='error'>
            {this.props.errorText}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

export default TriviaStart;
