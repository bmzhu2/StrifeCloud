import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class UserResult extends React.Component {
  constructor(props) {
    super(props)

    this.handleProfilePicClick = this.handleProfilePicClick.bind(this);
  }

  handleProfilePicClick() {
    this.props.history.push(`/users/${this.props.user.id}`)
  }

  render() {
    let userPic = <div className="blank-user-profile-picture"></div>;

    if (this.props.user.profilePictureUrl && this.props.user.profilePictureUrl !== "") {
      userPic = <img className="user-profile-picture" src={`${this.props.user.profilePictureUrl}`} ></img>;
    }

    return (
      <div className="user-result">
        <div className="user-picture-frame" onClick={this.handleProfilePicClick}>{userPic}</div>
        <div className="user-info">
          <Link to={`/users/${this.props.user.id}`} className="user-username">{this.props.user.username}</Link>
          <Link to={`/users/${this.props.user.id}`} className="user-song-count">
            <i className="fas fa-music"></i>{this.props.user.numSongs}
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(UserResult)