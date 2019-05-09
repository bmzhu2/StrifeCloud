import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {updateUser} from '../../actions/user_actions';

class UserProfileBanner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upload: false
    }

    this.handlePictureFile = this.handlePictureFile.bind(this);
  }

  handlePictureFile(e) {
    const pictureFile = e.currentTarget.files[0]

    if (pictureFile && pictureFile.type.search("image") !== -1) {
      const formData = new FormData();
      formData.append('user[profile_picture]', pictureFile)
      this.props.updateUser({user: formData, id: this.props.currentUserId})
        .then(() => this.setState({upload: !this.state.upload}))
    }
  }

  render() {
    let profilePic = <div className="blank-banner-profile-picture"></div>
    let username = null;
    if(this.props.users && this.props.users[this.props.match.params.id]) {
      const user = this.props.users[this.props.match.params.id];
      if(user.profilePictureUrl) {
        profilePic = <img src={`${user.profilePictureUrl}`} className="user-banner-profile-picture"></img>
      }
      username = user.username;
    }

    let updatePicInput = null;
    let updatePicButton = null;
    if (this.props.currentUserId && this.props.currentUserId == this.props.match.params.id) {
      updatePicInput = (
        <input
          type="file"
          className="picture-input"
          id="picture-input"
          accept=".jpg,.png,.bmp,.gif"
          onChange={this.handlePictureFile}></input>
      )
      updatePicButton = (
        <label className="picture-input-button" htmlFor="picture-input">
          <i className="fas fa-camera"><p>Upload image</p></i>
          <p>Replace image</p>
        </label>
      )
    }

    return (
      <div className="user-profile-banner">
        <div className="profile-picture-section">
          <div className="user-profile-picture-frame">
            {profilePic}
          </div>
          {updatePicInput}
          {updatePicButton}
        </div>
        <Link to="#" className="user-profile-banner-name">{username}</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.entities.users,
  currentUserId: state.session.currentUserId
})

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfileBanner))
