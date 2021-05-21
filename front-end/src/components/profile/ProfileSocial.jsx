import React, { Component } from 'react';
import './ProfileSocial.css';

const EDIT = 'Edit',
  SAVE = 'Save',
  CANCEL = 'Cancel';

class ProfileSocial extends Component {

  renderLink(i) {
    //edit mode
    if (this.props.mode === EDIT) {
      return (
        <SocialEditable
          key={i.toString()}
          id={i.toString()}
          link={this.props.links[i]}
          onChange={this.props.handleChange}
        />
      );
    }
    //link
    return (
      <SocialLink
        key={i.toString()}
        id={i.toString()}
        link={this.props.links[i]}
      />
    );
  }

  renderButton() {
    if (this.props.editable)
      return this.props.mode===EDIT ? (
        <SocialSaveCancel onSave={this.props.handleSave} onCancel={this.props.handleCancel}/>
      ) : (
        <SocialEdit onClick={this.props.handleEdit} />
      );
    return null;
  }

  render() {
    return (
      <div className="ProfileSocial">
        {this.renderLink(0)}
        {this.renderLink(1)}
        {this.renderLink(2)}
        {this.renderButton()}
      </div>
    );
  }
}

function HTTPSPrefix(link){
    //if http or https is in string
    if(/(http(s?)):\/\//i.test(link)){
        return link;   
    }
    return 'https://' + link;
}

function SocialLink(props) {
  return (
    <div>
      <a className="ProfileSocialClickable" target="_blank" href={HTTPSPrefix(props.link)}>
        {props.link}
      </a>
    </div>
  );
}

function SocialEditable(props) {
  return (
    <form className="ProfileSocialEditable" onSubmit={event => event.preventDefault()}>
      <input
        className="ProfileSocialEditableMessage"
        onChange={(e) => props.onChange(e, props.id)}
        defaultValue={props.link}
      />
    </form>
  );
}

function SocialSaveCancel(props) {
  return (
      <React.Fragment>
        <button className="ProfileSocialSave" onClick={props.onSave}>
            {SAVE}
        </button>
        <button className="ProfileSocialCancel" onClick={props.onCancel}>
            {CANCEL}
        </button>
    </React.Fragment>
  );
}

function SocialEdit(props) {
    return <button className="ProfileSocialEdit" onClick={props.onClick}>{EDIT}</button>;
}

export default ProfileSocial;
