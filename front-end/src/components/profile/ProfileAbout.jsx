import React, { Component } from 'react';
import './ProfileAbout.css';

const VIEW = 'View',
  EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

class ProfileAbout extends Component {

  renderView() {
    return (
      <React.Fragment>
        <ProfileAboutView message={this.props.message} />
        {this.props.editable && (
          <ProfileAboutEditButton name={EDIT} onClick={this.props.handleEdit} />
        )}
      </React.Fragment>
    );
  }

  renderEdit() {
    return (
      <ProfileAboutEditMode
        message={this.props.message}
        onSave={this.props.handleSave}
        onCancel={this.props.handleCancel}
        onChange={this.props.handleChange}
      />
    );
  }

  render() {
    return (
      <div className="ProfileAbout">
        <ProfileAboutHeader message={`About ${this.props.wantedUser}:`} />
        {this.props.mode === VIEW ? this.renderView() : this.renderEdit()}
      </div>
    );
  }
}

function ProfileAboutHeader(props) {
  return <label className="ProfileAboutHeader">{props.message}</label>;
}

function ProfileAboutView(props) {
  return <p className="ProfileAboutView">{props.message}</p>;
}
function ProfileAboutEditButton(props) {
  return (
    <button className="ProfileAboutEditButton" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function ProfileAboutEditMode(props) {
  return (
    <form className="ProfileAboutEditMode">
      <textarea
        className="ProfileAboutEditMessage"
        defaultValue={props.message}
        onChange={props.onChange}
      />
      <button type="button" className="ProfileAboutSave" onClick={props.onSave}>
        {SAVE}
      </button>
      <button
        type="button"
        className="ProfileAboutCancel"
        onClick={props.onCancel}
      >
        {CANCEL}
      </button>
    </form>
  );
}

export default ProfileAbout;
