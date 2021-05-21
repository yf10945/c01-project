import React, { Component } from "react";
import logo from "../resources/sportcredLogo2.png";
import "./LoginPage.css";
//import LoginCalls from "./LoginCalls";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { LoginError: false, Username: "", Password: "" };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLoginSubmit() {
    // var result = LoginCalls.loginAuthenticate(
    //   this.state.Username,
    //   this.state.password
    // );
    //on login error
    this.setState({ LoginError: true });
    //confirm login

    //handle route if good login
    this.props.onLoginSuccess();
    this.props.onTheZoneRedirect();
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
          hidden={true}
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
    <form className="LoginInput">
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
    <a className="LoginToSignup" href="#" onClick={props.onClick}>
      {props.message}
    </a>
  );
}

export default LoginPage;
