import React from 'react';
import "./DebateAgree.css";
import { getPost, updateVote } from '../../api/DebateCalls';

class DebateAgree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agreeHidden: false,
      likes: this.props.likes,
      agreePercentage: 0
    };
    this.handleAgreeSubmit = this.handleAgreeSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideAgree = this.hideAgree.bind(this);
    this.showAgree = this.showAgree.bind(this);
  }

  componentDidMount() {
    this.setState({
      likes: this.props.likes,
      username: this.props.username
    })
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
    updateVote(parseInt(this.state.agreePercentage,10), this.state.username).then((response) => {
      if (response.ok) {
        getPost(this.props.username).then(result => {
          this.setState({
            likes: Math.ceil(result.score)
          })
        })
        this.props.hideError();
      } else {
        this.props.displayErrorMessage(response);
			}
    })
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const isHidden = this.state.agreeHidden;
    let agree = null;
    if (!isHidden) {
      agree =
        (<div className = "agreeContainer">
          <div className="percentageDisplay">
            <button className="smlButton" onClick={this.hideAgree}>-</button>
            <h2 className="percentageText">{this.state.likes}%</h2>
          </div>
        {this.props.currentUser !== this.props.username ?
          <div className="agree">
            <div>
                <div>
                  <span>{this.state.agreePercentage}</span>
                </div>
                <input
                  name="agreePercentage"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={this.state.agreePercentage}
                  onChange={this.handleChange}
                >
                </input>
              </div>
              <button onClick={this.handleAgreeSubmit}>Agree</button>
          </div>
          : null}
        </div>);
    } else {
      agree = (<button className="smlButton" onClick={this.showAgree}>+</button>);
    }
    return (<div>
      {agree} </div>
    )
  }
}

export default DebateAgree;


