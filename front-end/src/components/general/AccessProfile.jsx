import React, { Component } from 'react';
import {getUserPicture} from '../../api/ProfileCalls';
import './AccessProfile.css';

/*
props should have username
props should also have handleClick, which is App.handleViewProfile
App.handleViewProfile(username) call should redirect app to profile page

Important:
in App.jsx, in your component add prop handleViewProfile
    <TopNavBar
              ...
              handleViewProfile={this.handleViewProfile}
    />
Example use:
import AccessProfile from '../general/AccessProfile.jsx';
<AccessProfile username={username} handleViewProfile={this.props.handleViewProfile}/>
*/
class AccessProfile extends Component {
    constructor(props){
        super(props);
        this.state = {picture:""};
    }

    componentDidMount(){
        getUserPicture(this.props.username).then((res)=>{
            if(!res.success){//throw if not successful
                throw new Error(`error getting picture of ${this.props.username}`);
            }
            this.setState({picture:res.picture});
        }).catch((error)=>{
            console.log(error);
        });
    }

    render() { 
        return <img className="AccessProfile"
                src={this.state.picture}
                alt={`${this.props.username}'s pic`}
                onClick={()=>{this.props.handleViewProfile(this.props.username)}}
                />;
    }
}
 
export default AccessProfile;