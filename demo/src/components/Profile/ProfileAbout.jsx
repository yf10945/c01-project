import React, { Component } from "react";
import "./ProfileAbout.css";

const VIEW = "View",
  EDIT = "Edit",
  SAVE = "Save",
  CANCEL = "Cancel";

class ProfileAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "About Message",
      editMessage: "About Message",
      mode: VIEW,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit() {
    console.log("Profile About edit");
    this.setState({ mode: EDIT });
  }

  handleSave() {
    console.log("Profile About save");
    //change message in database

    //if successful, change message in state
    this.setState({ message: this.state.editMessage });

    this.setState({ mode: VIEW });
  }

  handleCancel() {
    console.log("Profile About cancel");

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
        <ProfileAboutView message={this.state.message} />
        <ProfileAboutEditButton name="Edit" onClick={this.handleEdit} />
      </React.Fragment>
    );
  }

  renderEdit() {
    return (
      <ProfileAboutEditMode
        message={this.state.message}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onChange={this.handleChange}
      />
    );
  }

  render() {
    return (
      <div className="ProfileAbout">
        <ProfileAboutHeader message="About:" />
        {this.state.mode === VIEW ? this.renderView() : this.renderEdit()}
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
      <br />
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
