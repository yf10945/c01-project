import React, { Component } from "react";
import "./ProfileACS.css";

class ProfileACS extends Component {
  constructor(props) {
    super(props);
    //get ACS and such from props
    console.log(props.ACS);
    this.state = { ACS: props.ACS, ACSChange: props.ACSChange };
  }

  render() {
    return (
      <div className="ProfileACS">
        <ProfileACSLabel message={"Your ACS is " + this.state.ACS} />
        <br />
        <ProfileACSLabel message={"Tier: " + ACSTier(this.state.ACS)} />
        <br />
        <ProfileACSLabel message={this.state.ACSChange + " ACS score today"} />
      </div>
    );
  }
}

function ACSTier(ACS) {
  //high to low, same length arrays
  let minACS = [900, 600, 300, 100];
  let tier = ["Expert Analyst", "Pro Analyst", "Analyst", "Fanalyst"];
  var i;
  for (i = 0; i < minACS.length; i++) {
    if (ACS >= minACS[i]) {
      return tier[i];
    }
  }
  return "Untiered";
}

function ProfileACSLabel(props) {
  return <label className="ProfileACSLabel">{props.message}</label>;
}

export default ProfileACS;
