import React, { Component } from 'react';
import './ProfileACS.css';

class ProfileACS extends Component {

    renderError(){
        return <ProfileACSLabel message={'Error getting ACS'} />;
    }

    renderNormal(){
        return(<React.Fragment>
            <ProfileACSLabel message={'Your ACS is ' + this.props.ACS} />
            <br />
            <ProfileACSLabel message={'Tier: ' + ACSTier(this.props.ACS)} />
            {/* <br />//remove for now
            <ProfileACSLabel message={this.props.ACSChange + ' ACS score today'} />
            */}
            </React.Fragment>);
    }

  render() {
    return (
      <div className="ProfileACS">
        {this.props.ACSError ? this.renderError():this.renderNormal()}
      </div>
    );
  }
}

function ACSTier(ACS) {
  //high to low, same length arrays
  let minACS = [900, 600, 300, 100];
  let tier = ['Expert Analyst', 'Pro Analyst', 'Analyst', 'Fanalyst'];
  var i;
  for (i = 0; i < minACS.length; i++) {
    if (ACS >= minACS[i]) {
      return tier[i];
    }
  }
  return 'Untiered';
}

function ProfileACSLabel(props) {
  return <label className="ProfileACSLabel">{props.message}</label>;
}

export default ProfileACS;
