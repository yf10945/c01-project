import React, { Component } from 'react';
import './AccessProfileText.css';

//similar to AccessProfile, but text version
class AccessProfileText extends Component {
    render() { 
        return <span className="AccessProfileText"
                onClick={()=>{this.props.handleViewProfile(this.props.username)}}
                >
                {this.props.username}
                </span>;
    }
}
 
export default AccessProfileText;