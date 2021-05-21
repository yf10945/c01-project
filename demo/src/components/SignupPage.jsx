import React from 'react';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core'

/**
 * The container for the sign up page components and process.
 */
class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      favSport: '',
      age: 0,
      sportLevel: 0,
      sportLearn: '',
      favTeam: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // TODO
  handleSubmit(event) {
    // make sure all required fields are filled in
    // validate the input
    // if valid, send to server and redirect to login
  }
  
  render() {
    return (
      <div className='SignupPage'>
        <Grid container direction='column' justify='flex-start' alignItems='flex-start'>
          <Grid item>
            <h1>Sign Up</h1>
          </Grid>
          <Grid container item>
            <form onSubmit={this.handleSubmit}>
              {/* Email */}
              <Grid item>
                <TextField 
                  label='Email'
                  name='email'
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  required
                  autoFocus
                  variant='filled'
                  fullWidth
                >
                </TextField>
              </Grid>

              {/* Phone */}
              <Grid item>
                <TextField
                  label='Phone'
                  name='phone'
                  value={this.state.phone}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              
              {/* Password */}
              <Grid item>
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label='Confirm password'
                  type='password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>

              {/* Favourite Sport */}
              <Grid item>
                <TextField
                  label='Favourite sport'
                  name='favSport'
                  value={this.state.favSport}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              
              {/* Age */}
              <Grid item>
                <TextField
                  select
                  label='Age'
                  name='age'
                  value={this.state.age}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                  <MenuItem value=''>None</MenuItem>
                  <MenuItem value={0}>0 - 20</MenuItem>
                  <MenuItem value={1}>21 - 40</MenuItem>
                </TextField>
              </Grid>
              
              {/* Highest level of sport play */}
              <Grid item>
                <TextField
                  select
                  label='Highest level of sport play'
                  name='sportLevel'
                  value={this.state.sportLevel}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                  <MenuItem value={0}>No History</MenuItem>
                  <MenuItem value={1}>College</MenuItem>
                </TextField>
              </Grid>
              
              {/* What sport do you want to know/learn about? */}
              <Grid item>
                <TextField
                  label='What sport do you want to know/learn about?'
                  name='sportLearn'
                  value={this.state.sportLearn}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>
              
              {/* Favourite sports team */}
              <Grid item>
                <TextField
                  label='Favourite sports team'
                  name='favTeam'
                  value={this.state.favTeam}
                  onChange={this.handleInputChange}
                  required
                  variant='filled'
                >
                </TextField>
              </Grid>

              <Grid item>
                <Button type='submit' variant="contained" color="primary">Submit</Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default SignupPage;
