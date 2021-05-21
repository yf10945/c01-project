import React, { Component } from "react";

const VIEW = "View",
  EDIT = "Edit",
  SAVE = "Save",
  CANCEL = "Cancel";

class ProfileStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Status Message",
      editMessage: "Status Message",
      mode: VIEW,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit() {
    console.log("Profile Status edit");
    this.setState({ mode: EDIT });
  }

  handleSave() {
    console.log("Profile Status save");
    //change message in database

    //if successful, change message in state
    this.setState({ message: this.state.editMessage });

    this.setState({ mode: VIEW });
  }

  handleCancel() {
    console.log("Profile Status cancel");

    //reset editMessage
    this.setState({ editMessage: this.state.message });

    this.setState({ mode: VIEW });
  }

  handleChange(e) {
    this.setState({ editMessage: e.target.value });
  }

  renderView() {
    return (
      <React.Fragment>
        <ProfileStatusView message={this.state.message} />
        <ProfileStatusEditButton name="Edit" onClick={this.handleEdit} />
      </React.Fragment>
    );
  }

  renderEdit() {
    return (
      <ProfileStatusEditMode
        message={this.state.message}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    return (
      <div className="ProfileStatus">
        {this.state.mode === VIEW ? this.renderView() : this.renderEdit()}
      </div>
    );
  }
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
      <br />
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
