import React from 'react';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import TheZonePage from './components/TheZonePage';
import TriviaPage from './components/TriviaPage';
import DebatePage from './components/DebatePage';
import PicksAndPredictionsPage from './components/PicksAndPredictionsPage';
import OpenCourtPage from './components/OpenCourtPage';
import TopNavBar from './components/general/TopNavBar';
import ProfilePage from './components/profile/ProfilePage';

//Main page that display different pages depending on current state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      currentPage: 'Login',
      currentUser: 'hello',
      profileView: '',
    };
    this.loginSuccess = this.loginSuccess.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
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
    this.handleViewProfile = this.handleViewProfile.bind(this);
  }

  loginSuccess(username) {
    this.setState({
      auth: true,
      currentUser: username,
    });
  }

  redirectToLogin() {
    this.setState({
      currentPage: 'Login',
    });
  }

  redirectToSignup() {
    this.setState({
      currentPage: 'Signup',
    });
  }

  handleLogout() {
    this.setState({
      currentPage: 'Login',
      auth: false,
    });
  }

  redirectToTheZone() {
    this.setState({
      currentPage: 'TheZone',
    });
  }

  redirectToProfile() {
    this.setState({
      currentPage: 'Profile',
      profileView: this.state.currentUser,
    });
  }

  redirectToTrivia() {
    this.setState({
      currentPage: 'Trivia',
    });
  }

  redirectToDebate() {
    this.setState({
      currentPage: 'Debate',
    });
  }

  redirectToPicksAndPredictions() {
    this.setState({
      currentPage: 'PicksAndPredictions',
    });
  }

  redirectToOpenCourt() {
    this.setState({
      currentPage: 'OpenCourt',
    });
  }

  handleViewProfile(username) {
    //view any specified profile
    this.setState({
      currentPage: 'Profile',
      profileView: username,
    });
  }

  singleTopNavBar(){
    return <TopNavBar
        currentUser={this.state.currentUser}
        handleLogout={this.handleLogout}
        redirectToTheZone={this.redirectToTheZone}
        redirectToProfile={this.redirectToProfile}
        handleViewProfile={this.handleViewProfile}
    />
  }

  render() {
    let page = null;

    if (!this.state.auth) {
      // logic to determine which page
      if (this.state.currentPage === 'Signup') {
        page = (
          <SignupPage
            onSignup={this.redirectToLogin}
            onLoginRedirect={this.redirectToLogin}
          />
        );
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
      if (this.state.currentPage === 'TheZone') {
        page = (
          <div>
            {this.singleTopNavBar()}
            <TheZonePage
              currentUser={this.state.currentUser}
              redirectToDebate={this.redirectToDebate}
              redirectToPicksAndPredictions={this.redirectToPicksAndPredictions}
              redirectToTrivia={this.redirectToTrivia}
              handleViewProfile={this.handleViewProfile}
            />
          </div>
        );
      } else if (this.state.currentPage === 'OpenCourt') {
        page = (
          <div>
            {this.singleTopNavBar()}
            <OpenCourtPage />
          </div>
        );
      } else if (this.state.currentPage === 'Trivia') {
        page = (
          <div>
            {this.singleTopNavBar()}
            <TriviaPage />
          </div>
        );
      } else if (this.state.currentPage === 'PicksAndPredictions') {
        page = (
          <div>
            {this.singleTopNavBar()}
            <PicksAndPredictionsPage />
          </div>
        );
      } else if (this.state.currentPage === 'Debate') {
        page = (
          <div>
            {this.singleTopNavBar()}
            <DebatePage
              currentUser={this.state.currentUser} />
          </div>
        );
      } else if (this.state.currentPage === 'Profile') {
        page = (
          <div>
            {this.singleTopNavBar()}
            <ProfilePage
              currentUser={this.state.currentUser}
              wantedUser={this.state.profileView}
              editable={this.state.currentUser === this.state.profileView}
              handleViewProfile={this.handleViewProfile}
            />
          </div>
        );
      }
    }

    return <div>{page}</div>;
  }
}

export default App;
