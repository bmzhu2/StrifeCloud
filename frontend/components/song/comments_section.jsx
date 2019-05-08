import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import CommentsIndex from './comments_index';
import BlankCommentsIndex from './blank_comments_index';

class CommentsSection extends React.Component {
  constructor(props) {
    super(props)

    this.handleProfilePicClick = this.handleProfilePicClick.bind(this);
  }

  handleProfilePicClick() {
    this.props.history.push(`/users/${this.props.uploader.id}`)
  }

  render() {
    let uploaderPic = <div className="blank-uploader-profile-picture"></div>;
    let uploaderName = "";
    let uploaderLink = "#";
    let description = ""
    let numComments = ""
    let plural;
    if (this.props.uploader) {
      if (this.props.uploader.profilePictureUrl && this.props.uploader.profilePictureUrl !== "") {

        uploaderPic = <img className="uploader-profile-picture" src={`${this.props.uploader.profilePictureUrl}`} ></img>;
      }
      uploaderName = this.props.uploader.username;
      uploaderLink = `/users/${this.props.uploader.id}`
      description = this.props.description

      numComments = Object.keys(this.props.comments).length;
      plural = numComments === 1 ? "" : "s"
    }

    let commentsCount = null;
    let commentsIndex = null;
    if (numComments === 0) {
      commentsIndex = <BlankCommentsIndex/>
    } else if (numComments > 0) {
      commentsCount = <div className="comment-count"><i className="fas fa-comment-alt"></i> {numComments} comment{plural}</div>
      commentsIndex = <CommentsIndex/>
    }
    

    return(
      <div className="song-comments-section">
        <div className="uploader-info">
          <div className="uploader-picture-frame" onClick={this.handleProfilePicClick}>{uploaderPic}</div>
          <Link to={uploaderLink} className="uploader-username">{uploaderName}</Link>
        </div>
        <div className="comments-column">
          <div className="song-description">{description}</div>
          {commentsCount}
          {commentsIndex}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.entities.comments
})

export default withRouter(connect(mapStateToProps, null)(CommentsSection));