import React from "react";
import DropdownButton from "./DropdownButton";
import AccessProfile from '../general/AccessProfile.jsx';
import "./CurrentUser.css";

class CurrentUser extends React.Component{
  constructor(props) {
      super(props);
    }

   /* TODO : GET DATA FROM BACKEND API 
    componentDidMount() {
        fetch('http://localhost:3000/api/someapi')
            .then(res => res.json())
            .then(data => this.setState(
                { user:data })
            );
    }
  */

  render() {
    return (
      <div className="CurrentUserContainer">
        <DropdownButton name={this.props.currentUser}
          handleLogout={this.props.handleLogout}
          redirectToProfile={this.props.redirectToProfile}/>
        <AccessProfile
            username={this.props.currentUser} 
            handleViewProfile={this.props.handleViewProfile}
        />
       </div>
    )
  }
}

export default CurrentUser;