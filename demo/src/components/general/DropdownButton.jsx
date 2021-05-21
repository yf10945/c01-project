import React from "react";
import "./DropdownButton.css";

class DropdownButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  _handleClick(e) {
    e.preventDefault();
    this.setState({
      isVisible: !this.state.isVisible
    });
  }
  
  renderDropdown(){
    return(
      <ul className="dropdownList">
        <li className="dropdownItem">
          <a href="#" onClick={this.props.redirectToProfile}>Profile</a>
        </li>
        <li className="dropdownItem">
          <a href="#" onClick={this.props.handleLogout}>Logout</a>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className="dropdown">
        <button className="CurrentUser" onClick={(e) => this._handleClick(e)}>{this.props.name}
        </button>
        { this.state.isVisible ? this.renderDropdown() : null }
      </div>
    );
  }
}

export default DropdownButton;