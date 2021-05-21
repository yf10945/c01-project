import React from 'react';
import "./TheZoneAgree.css";
import { getPost, updateVote, updateVoteComment } from '../../api/TheZoneCalls';

class TheZoneAgree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agreeHidden: false,
      selectedOption: "Agree"
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.handleAgreeSubmit = this.handleAgreeSubmit.bind(this);
    this.hideAgree = this.hideAgree.bind(this);
    this.showAgree = this.showAgree.bind(this);
  }

  componentDidMount() {
    if (this.props.mode === "post") {
      getPost(this.props.postid).then(result => {
        this.setState({
          likes: result.agree - result.disagree
        })
      })
    } else if (this.props.mode === "comment") {
      this.setState({
        likes: this.props.like
      })
		}
  }
  hideAgree() {
    this.setState({
      agreeHidden: true
    })
  }

  showAgree() {
    this.setState({
      agreeHidden: false
    })
  }

  handleAgreeSubmit() {
    if (this.props.mode === "post") {
      // if response 200 update current vote 
      if (this.state.selectedOption === "Agree") {
        updateVote(1, this.props.postid).then((response) => {
          if (response.ok) {
            getPost(this.props.postid).then(result => {
              this.setState({
                likes: result.agree - result.disagree
              })
            })
          }
        })
      } else if (this.state.selectedOption === "Disagree") {
        updateVote(-1, this.props.postid).then((response) => {
          if (response.ok) {
            getPost(this.props.postid).then(result => {
              this.setState({
                likes: result.agree - result.disagree
              })
            })
          }
        })
      }
    } else if (this.props.mode === "comment") {
      if (this.state.selectedOption === "Disagree") {
        updateVoteComment(-1, this.props.postid, this.props.commentid)
          .then(response => response.json())
          .then( data => {
            this.setState({
              likes: data.totalVotes
            })});
      } else if (this.state.selectedOption === "Agree") {
        updateVoteComment(1, this.props.postid, this.props.commentid)
          .then(response => response.json())
          .then(data => {
            this.setState({
              likes: data.totalVotes
            })
          });
      }
		}
  }


  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  render() {
    const isHidden = this.state.agreeHidden;
    let agree = null;
    if (!isHidden) {
      agree =
        (<div className = "agreeContainer">
          <div className="percentageDisplay">
            <button className="smlButton" onClick={this.hideAgree}>-</button>
            <h2 className="percentageText">{this.state.likes}</h2>
          </div>
          <div className="agree">
            <input
              className="agreeOptions"
              type="radio"
              value="Agree"
              checked={this.state.selectedOption === "Agree"}
              onChange={this.onValueChange}
            />
            <label className="agreeText"> Agree </label>
            <input
              className="agreeOptions"
              type="radio"
              value="Disagree"
              checked={this.state.selectedOption === "Disagree"}
              onChange={this.onValueChange}
            />
            <label className="agreeText"> Disagree </label>
            <button
              className="agreeButton"
              onClick={this.handleAgreeSubmit}
            >Submit</button>
          </div>
        </div>);
    } else {
      agree = (<button className="smlButton" onClick={this.showAgree}>+</button>);
    }
    return (<div>
      {agree} </div>
    )
  }
}

export default TheZoneAgree;


