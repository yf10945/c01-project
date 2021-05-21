import React, { Component } from 'react';
import './ProfileRadar.css';

const FOLY = 'Follow: ✓';
const FOLN = 'Follow: x';

class ProfileRadar extends Component {

  render() {
    return (
      <div className="ProfileRadar">
        {!this.props.editable && (
          <FollowButton
            handleClick={this.props.handleFollow}
            followMessage={this.props.CurrentIsFollowing ? FOLY:FOLN}
          />
        )}
        <header className="ProfileRadarHeader">{`${this.props.wantedUser} is following:`}</header>
        <nav>
          <ul className="ProfileRadarList">
            {ListFollowed(this.props.WantedFollowList, this.props.handleViewProfile)}
          </ul>
        </nav>
      </div>
    );
  }
}

function ProfileItem(props) {
  return (
    <li className="ProfileRadarItem">
      <button
        className="ProfileRadarItemButton"
        onClick={(e) => props.handleClick(props.username)}
      >
        {props.username}, ACS:{props.ACS}
      </button>
    </li>
  );
}

function ListFollowed(list, redirect) {
  return list.map((user) => (
    <ProfileItem
      key={user.username}
      id={user.username}
      username={user.username}
      ACS={user.ACS}
      handleClick={redirect}
    />
  ));
}

function FollowButton(props) {
  return (
    <button className="ProfileRadarFollowButton" onClick={props.handleClick}>
      {props.followMessage}
    </button>
  );
}

export default ProfileRadar;
