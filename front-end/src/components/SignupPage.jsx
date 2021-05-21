import React from 'react';
import { Button, Grid, Link, MenuItem, TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  isUsernameExists, isEmailExists, isPhoneExists, signUp
} from '../api/SignupCalls.js';
import './SignupPage.css';

// TODO: refactor form into its own component

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#86C232'
    },
  },
});

// The property names in this.state that store the form input values.
// Useful for iterating on each form input property and their corresponding
// properties for other purposes.
const INPUT_PROPERTIES = [
  'username', 'email', 'phone', 'password', 'confirmPassword', 'favSport',
  'age', 'sportLevel', 'sportLearn', 'favTeam'
];

// The possible options for 'Highest level of sport play'
const SPORT_LEVELS = [
  'No History', 'Recreational', 'High School', 'University', 'Professional'
];

/**
 * The container for the sign up page components and process.
 */
class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      favSport: '',
      age: '',
      sportLevel: '',
      sportLearn: '',
      favTeam: '',
      // Helper text that could appear under the inputs
      usernameHelper: '',
      emailHelper: '',
      phoneHelper: 'Can only contain numbers. For example: 6130001234',
      passwordHelper: 'Must contain at least 8 characters',
      confirmPasswordHelper: '',
      favSportHelper: '',
      ageHelper: '',
      sportLevelHelper: '',
      sportLearnHelper: '',
      favTeamHelper: '',
      // Applies the error style to input fields with an error (true)
      usernameError: false,
      emailError: false,
      phoneError: false,
      passwordError: false,
      confirmPasswordError: false,
      favSportError: false,
      ageError: false,
      sportLevelError: false,
      sportLearnError: false,
      favTeamError: false,
      // Error text for the entire form
      formHelper: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Removes the helper text for each form input.
   */
  resetHelperText() {
    // The properties for helper text follow the naming convention:
    // <input property>Helper
    INPUT_PROPERTIES.forEach(property => {
      this.setState({[property + 'Helper']: ''});
    });
    // The form helper isn't part of the input properties
    this.setState({formHelper: ''});
  }

  /**
   * Removes the error state of each form input. Visually, they are no longer
   * highlighted with red.
   */
  resetErrors() {
    // Error property names follow the same naming convention:
    // <input property>Error
    INPUT_PROPERTIES.forEach(property => {
      this.setState({[property + 'Error']: false});
    });
  }

  /**
   * Displays an error message for each of the invalid fields.
   * @returns {boolean} true if there were any invalid fields; false otherwise
   */
  handleInvalidFields() {
    let hasInvalid = false;
    // Username cannot exist in the database
    isUsernameExists(this.state.username)
    .then(exists => {
      if (exists) {
        hasInvalid = true;
        this.setState({
          usernameError: true,
          usernameHelper: 'This username already exists.'
        });
      }
    });

    // Email cannot exist in the database; validity is handled by the server
    isEmailExists(this.state.email)
    .then(exists => {
      if (exists) {
        hasInvalid = true;
        this.setState({
          emailError: true,
          emailHelper: 'This email is taken.',
        });
      }
    });

    // Phone cannot exist in the database; can only contain numbers. Actual
    // validity handled by server.
    if (!(/^\d+$/).test(this.state.phone)) {
      hasInvalid = true;
      this.setState({
        phoneError: true,
        phoneHelper: 'Can only contain numbers. No spaces. For example: 6130001234'
      });
    } else {
      isPhoneExists(this.state.phone)
      .then(exists => {
        if (exists) {
          hasInvalid = true;
          this.setState({
            phoneError: true,
            phoneHelper: 'This phone number is taken.'
          });
        }
      });
    }

    // Password has to be at least 8 characters
    if (this.state.password.length < 8) {
      hasInvalid = true;
      this.setState({
        passwordError: true,
        confirmPasswordError: true,
        passwordHelper: 'Must contain at least 8 characters.'
      });
    // Confirm password must match password
    } else if (this.state.password !== this.state.confirmPassword) {
      hasInvalid = true;
      this.setState({
        passwordError: true,
        confirmPasswordError: true,
        confirmPasswordHelper: 'The passwords do not match.'
      });
    }
    // Age must be a number. This is handled already by it's component
    return hasInvalid;
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    // Prevent default behaviour of form submit (does a GET request with form
    // values in the request URL!)
    event.preventDefault();
    // Reset previous errors since it needs to be checked again
    this.resetHelperText();
    this.resetErrors();

    // Required fields must be filled in. This is actually built-in to the
    // form when using the required props in the input elements, so submit
    // only runs when all required fields are filled in.

    // Validate the required fields. If any are invalid, do not submit.
    if (this.handleInvalidFields()) {
      return;
    }

    // Send the sign up request to the server and wait for a response
    const state = this.state;
    signUp(
      state.username, state.password, state.email, state.phone, state.favSport,
      (state.age).toString(), state.sportLevel, state.sportLearn, state.favTeam
    )
    .then(response => {
      // If sign up successful, redirect user to log in
      if (response.success) {
        this.props.onSignup();
      // If sign up failed because invalid fields, prompt user to change it
      } else if (response.reason === 'invalid') {
        // For now, just prompt the user to check all. It would be better if
        // the server returned specific error codes.
        this.setState({
          usernameError: true,
          usernameHelper: 'Choose another username',
          emailError: true,
          emailHelper: 'Make sure you entered the right email',
          phoneError: true,
          phoneHelper: 'Must only contain numbers. No spaces. For example: 6130001234',
          formHelper: 'The username, email or phone number is invalid'
        });
      // If sign up failed because there was a network error, unexpected
      // error from database, or other, display an error text for now
      } else {
        this.setState({ formHelper: 'There was an error with the server. Please try again.'});
      }
    });
  }
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className='SignupPage'>
          <Grid container direction='column' justify='flex-start' alignItems='flex-start'>
            {/* Title */}
            <Grid item>
              <h1 className='SignupTitle'>Sign Up</h1>
            </Grid>

            {/* Navigation back to login */}
            <Grid item>
              <Button
                component={Link}
                onClick={this.props.onLoginRedirect}
              >
                or login with an existing account
              </Button>
            </Grid>

            {/* Form */}
            <Grid container item>
              <form className='SignupForm' onSubmit={this.handleSubmit}>
                {/* Username */}
                <Grid item>
                  <TextField 
                    label='Username'
                    name='username'
                    value={this.state.username}
                    helperText={this.state.usernameHelper}
                    error={this.state.usernameError}
                    onChange={this.handleInputChange}
                    required
                    autoFocus
                    variant='filled'
                    fullWidth
                  >
                  </TextField>
                </Grid>

                {/* Email */}
                <Grid item>
                  <TextField 
                    label='Email'
                    name='email'
                    value={this.state.email}
                    helperText={this.state.emailHelper}
                    error={this.state.emailError}
                    onChange={this.handleInputChange}
                    required
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
                    helperText={this.state.phoneHelper}
                    error={this.state.phoneError}
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
                    helperText={this.state.passwordHelper}
                    error={this.state.passwordError}
                    onChange={this.handleInputChange}
                    required
                    variant='filled'
                    fullWidth
                  >
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label='Confirm password'
                    type='password'
                    name='confirmPassword'
                    value={this.state.confirmPassword}
                    helperText={this.state.confirmPasswordHelper}
                    error={this.state.confirmPasswordError}
                    onChange={this.handleInputChange}
                    required
                    variant='filled'
                    fullWidth
                  >
                  </TextField>
                </Grid>

                {/* Favourite Sport */}
                <Grid item>
                  <TextField
                    label='Favourite sport'
                    name='favSport'
                    value={this.state.favSport}
                    helperText={this.state.favSportHelper}
                    error={this.state.favSportError}
                    onChange={this.handleInputChange}
                    required
                    variant='filled'
                    fullWidth
                  >
                  </TextField>
                </Grid>
                
                {/* Age */}
                <Grid item>
                  <TextField
                    type='number'
                    inputProps={{min: 1, max: 130}}
                    label='Age'
                    name='age'
                    value={this.state.age}
                    helperText={this.state.ageHelper}
                    error={this.state.ageError}
                    onChange={this.handleInputChange}
                    required
                    variant='filled'
                  >
                  </TextField>
                </Grid>
                
                {/* Highest level of sport play */}
                <Grid item>
                  <TextField
                    select
                    label='Highest level of sport play'
                    name='sportLevel'
                    value={this.state.sportLevel}
                    helperText={this.state.sportLevelHelper}
                    error={this.state.sportLevelError}
                    onChange={this.handleInputChange}
                    required
                    variant='filled'
                    fullWidth
                  >
                    {SPORT_LEVELS.map((item) => (
                      <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                
                {/* What sport do you want to know/learn about? */}
                <Grid item>
                  <TextField
                    label='What sport do you want to know/learn about?'
                    name='sportLearn'
                    value={this.state.sportLearn}
                    helperText={this.state.sportLearnHelper}
                    error={this.state.sportLearnError}
                    onChange={this.handleInputChange}
                    required
                    variant='filled'
                    fullWidth
                  >
                  </TextField>
                </Grid>
                
                {/* Favourite sports team */}
                <Grid item>
                  <TextField
                    label='Favourite sports team'
                    name='favTeam'
                    value={this.state.favTeam}
                    helperText={this.state.favTeamHelper}
                    error={this.state.favTeamError}
                    onChange={this.handleInputChange}
                    required
                    variant='filled'
                    fullWidth
                  >
                  </TextField>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    value="Submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </Grid> {/* Form container */}
            {/* TODO: Error text for the entire form. Change component later */}
            <Grid>
              <h2 className='SignupFormError'>{this.state.formHelper}</h2>
            </Grid>
          </Grid> {/* Page container */}
        </div>
      </ThemeProvider>
    );
  }
}

export default SignupPage;
