import React from "react";
import CurrentUser from './CurrentUser';
import logo from "../../resources/sportcredLogo2.png";
import "./TopNavBar.css";

// Need to get back end data for currently logged in user including name and profile pic
class TopNavBar extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <nav className="TopNavBar"> 
        <div className="logoContainer">
          <img className="logo" src={logo} />
        </div>
        <button className="TheZoneButton" onClick={this.props.redirectToTheZone}>The Zone</button>
        <CurrentUser
          currentUser={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          redirectToProfile={this.props.redirectToProfile}
          handleViewProfile={this.props.handleViewProfile}
        />
      </nav>
    )
  }
}

export default TopNavBar;