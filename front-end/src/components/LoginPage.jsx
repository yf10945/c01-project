import React, { Component } from 'react';
import logo from '../resources/sportcredLogo2.png';
import './LoginPage.css';
import { login } from '../api/LoginCalls.js';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { LoginError: false, Username: '', Password: '' };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLoginSubmit() {
    login(this.state.Username, this.state.Password)
      .then((response) => {
        if (response.ok) {
          //confirm login
          //handle route if good login
          this.props.onLoginSuccess(this.state.Username);
          this.props.onTheZoneRedirect();
        } else {
          //on login error ~400
          this.setState({ LoginError: true });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log('Error with login response');
        this.setState({ LoginError: true });
      });
  }

  render() {
    return (
      <div className="LoginPage">
        <img className="SportcredLogo" src={logo} alt="Sportcred Logo" />
        <LoginInput
          type="text"
          name="Username"
          value={this.state.Username}
          onChange={this.handleChange}
        />
        <LoginInput
          type="password"
          name="Password"
          value={this.state.Password}
          onChange={this.handleChange}
        />
        {this.state.LoginError && (
          <LoginInputError message="Error Logging In" />
        )}
        <br />
        <LoginSubmit onClick={this.handleLoginSubmit} name="Login" />
        <br />
        <LoginToSignup
          message="Or make a new account here"
          onClick={this.props.onSignupRedirect}
        />
      </div>
    );
  }
}

function LoginInput(props) {
  return (
    <form className="LoginInput" onSubmit={event=>event.preventDefault()}>
      <label className="LoginInputLabel">{props.name}</label>
      <input
        className="LoginInputBox"
        type={props.type}
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
      />
    </form>
  );
}

function LoginInputError(props) {
  return <label className="LoginInputError">{props.message}</label>;
}

function LoginSubmit(props) {
  return (
    <button className="LoginSubmit" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function LoginToSignup(props) {
  return (
    <button className="LoginToSignup" onClick={props.onClick}>
      {props.message}
    </button>
  );
}

export default LoginPage;
