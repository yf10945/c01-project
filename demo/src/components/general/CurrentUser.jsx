import React from "react";
import DropdownButton from "./DropdownButton";
import "./CurrentUser.css";

class CurrentUser extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
          user: {}
      }
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
        <DropdownButton name={this.state.user.name}
          handleLogout={this.props.handleLogout}
          redirectToProfile={this.props.redirectToProfile}/>
        <img className="profilePic" src={this.state.user.picture} />
       </div>
    )
  }
}

export default CurrentUser;