import React, { Component } from 'react';
import './ProfilePicture.css';

const EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

class ProfilePicture extends Component {
  
  renderEditables() {
    return this.props.mode === EDIT ? (
      <ProfilePictureSubmit
        name="Profile Picture Submit"
        value={this.props.picture}
        onSave={this.props.handleSave}
        onCancel={this.props.handleCancel}
        onChange={this.props.handleChange}
      />
    ) : (
      <ProfilePictureEdit name="Edit" onClick={this.props.handleEdit} />
    );
  }

  render() {
    return (
      <div className="ProfilePicture">
        <ProfilePictureDisplay src={this.props.picture} />
        {this.props.editable && this.renderEditables()}
      </div>
    );
  }
}

function ProfilePictureDisplay(props) {
  return (
    <img
      className="ProfilePictureDisplay"
      src={props.src}
      alt="Profile img from User"
    />
  );
}
function ProfilePictureEdit(props) {
  return (
    <button className="ProfilePictureEdit" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function ProfilePictureSubmit(props) {
  return (
    <form className="ProfilePictureSubmit">
      <input
        className="ProfilePictureSubmitBox"
        type="text"
        name={props.name}
        defaultValue={props.value}
        onChange={props.onChange}
      />
      <div className="ProfilePictureButtonContainer">
        <button
          type="button"
          className="ProfilePictureCancel"
          onClick={props.onCancel}
        >
          {CANCEL}
        </button>
        <button
          type="button"
          className="ProfilePictureSave"
          onClick={props.onSave}
        >
          {SAVE}
        </button>
      </div>
    </form>
  );
}
export default ProfilePicture;
