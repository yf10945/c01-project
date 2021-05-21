import React, { Component } from 'react';
import './ProfileStatus.css';

const VIEW = 'View',
  EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

class ProfileStatus extends Component {

  renderView() {
    return (
      <React.Fragment>
        <ProfileStatusView message={this.props.message} />
        {this.props.editable && (
          <ProfileStatusEditButton name={EDIT} onClick={this.props.handleEdit} />
        )}
      </React.Fragment>
    );
  }

  renderEdit() {
    return (
      <ProfileStatusEditMode
        message={this.props.message}
        onSave={this.props.handleSave}
        onCancel={this.props.handleCancel}
        onChange={this.props.handleChange}
      />
    );
  }

  render() {
    return (
      <div className="ProfileStatus">
        <ProfileStatusHeader message="Status:" />
        {this.props.mode === VIEW ? this.renderView() : this.renderEdit()}
      </div>
    );
  }
}

function ProfileStatusHeader(props) {
  return <label className="ProfileStatusHeader">{props.message}</label>;
}

function ProfileStatusView(props) {
  return <p className="ProfileStatusView">{props.message}</p>;
}
function ProfileStatusEditButton(props) {
  return (
    <button className="ProfileStatusEditButton" onClick={props.onClick}>
      {props.name}
    </button>
  );
}

function ProfileStatusEditMode(props) {
  return (
    <form className="ProfileStatusEditMode">
      <textarea
        className="ProfileStatusEditMessage"
        defaultValue={props.message}
        onChange={props.onChange}
      />
      <button
        type="button"
        className="ProfileStatusSave"
        onClick={props.onSave}
      >
        {SAVE}
      </button>
      <button
        type="button"
        className="ProfileStatusCancel"
        onClick={props.onCancel}
      >
        {CANCEL}
      </button>
    </form>
  );
}

export default ProfileStatus;
