import React from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';

/**
 * A loading screen that displays a circular progress circle and the given text
 * from `props.text`.
 */
class LoadingScreen extends React.Component {
  render() {
    return (
      <Grid
        container
        spacing={2}
        direction='column'
        justify='center'
        alignItems='center'
      >
        {/* Loading text */}
        <Grid item xs={12}>
          <Typography variant='h2' color='textPrimary'>
            {this.props.text}
          </Typography>
        </Grid>
        {/* Progress circle */}
        <Grid item xs={12}>
          <CircularProgress color='primary' size={100}/>
        </Grid>
      </Grid>
    );
  }
}

export default LoadingScreen;
