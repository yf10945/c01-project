import React, { Component } from "react";
import ProfileAbout from "./ProfileAbout";
import ProfileACS from "./ProfileACS";
import ProfilePicture from "./ProfilePicture";
import ProfileStatus from "./ProfileStatus";
import "./ProfilePage.css";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ProfilePage">
        <ProfilePicture />
        <ProfileAbout />
        <ProfileStatus />
        <ProfileACS ACS="800" ACSChange="-10" />
      </div>
    );
  }
}

export default ProfilePage;
