import React from "react";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import TheZonePage from "./components/TheZonePage";
import TriviaPage from "./components/TriviaPage";
import DebatePage from "./components/DebatePage";
import PicksAndPredictionsPage from "./components/PicksAndPredictionsPage";
import OpenCourtPage from "./components/OpenCourtPage";
import TopNavBar from "./components/general/TopNavBar";
import ProfilePage from "./components/Profile/ProfilePage";

//Main page that display different pages depending on current state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      currentPage: "Login",
      currentUser: "hello",
    };
    this.loginSuccess = this.loginSuccess.bind(this);
    this.redirectToSignup = this.redirectToSignup.bind(this);
    this.redirectToTheZone = this.redirectToTheZone.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.redirectToProfile = this.redirectToProfile.bind(this);
    this.redirectToTrivia = this.redirectToTrivia.bind(this);
    this.redirectToDebate = this.redirectToDebate.bind(this);
    this.redirectToOpenCourt = this.redirectToPicksAndPredictions.bind(this);
    this.redirectToPicksAndPredictions = this.redirectToPicksAndPredictions.bind(
      this
    );
  }

  loginSuccess(username) {
    this.setState({
      auth: true,
      currentUser: username,
    });
  }
  redirectToSignup() {
    this.setState({
      currentPage: "Signup",
    });
  }

  handleLogout() {
    this.setState({
      currentPage: "Login",
      auth: false,
    });
  }

  redirectToTheZone() {
    this.setState({
      currentPage: "TheZone",
    });
  }

  redirectToProfile() {
    this.setState({
      currentPage: "Profile",
    });
  }

  redirectToTrivia() {
    this.setState({
      currentPage: "Trivia",
    });
  }

  redirectToDebate() {
    this.setState({
      currentPage: "Debate",
    });
  }

  redirectToPicksAndPredictions() {
    this.setState({
      currentPage: "PicksAndPredictions",
    });
  }

  redirectToOpenCourt() {
    this.setState({
      currentPage: "OpenCourt",
    });
  }

  render() {
    let page = null;

    if (!this.state.auth) {
      // logic to determine which page
      if (this.state.currentPage === "Signup") {
        page = <SignupPage />;
      } else {
        page = (
          <LoginPage
            onSignupRedirect={this.redirectToSignup}
            onLoginSuccess={this.loginSuccess}
            onTheZoneRedirect={this.redirectToTheZone}
          />
        );
      }
    } else {
      if (this.state.currentPage === "TheZone") {
        page = (
          <div>
            <TopNavBar
              handleLogout={this.handleLogout}
              redirectToTheZone={this.redirectToTheZone}
              redirectToProfile={this.redirectToProfile}
            />
            <TheZonePage
              redirectToDebate={this.redirectToDebate}
              redirectToOpenCourt={this.redirectToOpenCourt}
              redirectToPicksAndPredictions={this.redirectToPicksAndPredictions}
              redirectToTrivia={this.redirectToTrivia}
            />
          </div>
        );
      } else if (this.state.currentPage === "OpenCourt") {
        page = (
          <div>
            <TopNavBar
              handleLogout={this.handleLogout}
              redirectToProfile={this.redirectToProfile}
            />
            <OpenCourtPage />
          </div>
        );
      } else if (this.state.currentPage === "Trivia") {
        page = (
          <div>
            <TopNavBar
              handleLogout={this.handleLogout}
              redirectToProfile={this.redirectToProfile}
            />
            <TriviaPage />
          </div>
        );
      } else if (this.state.currentPage === "PicksAndPredictions") {
        page = (
          <div>
            <TopNavBar
              handleLogout={this.handleLogout}
              redirectToProfile={this.redirectToProfile}
            />
            <PicksAndPredictionsPage />
          </div>
        );
      } else if (this.state.currentPage === "Debate") {
        page = (
          <div>
            <TopNavBar
              handleLogout={this.handleLogout}
              redirectToProfile={this.redirectToProfile}
            />
            <DebatePage />
          </div>
        );
      } else if (this.state.currentPage === "Profile") {
        page = <ProfilePage ACS="800" ACSChange="-10" />;
      }
    }

    return <div>{page}</div>;
  }
}

export default App;
