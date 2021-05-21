import React from "react";
import CurrentUser from './CurrentUser';
import "./TopNavBar.css";

// Need to get back end data for currently logged in user including name and profile pic
class TopNavBar extends React.Component{
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <nav className="TopNavBar"> 
        <img className="logo" src={"../../resources/sportcredLogo.png"}/>
        <button className="TheZoneButton" onClick={this.props.redirectToTheZone}>The Zone</button>
        <CurrentUser
          handleLogout={this.props.handleLogout}
          redirectToProfile={this.props.redirectToProfile}
        />
      </nav>
    )
  }
}

export default TopNavBar;