import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom'
import {howLongAgo} from '../../util/date_util';
import {deleteComment} from '../../actions/comment_actions';

class CommentsIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handlePictureLink = this.handlePictureLink.bind(this);
  }

  handlePictureLink() {
    this.props.history.push(`/users/${this.props.comment.user_id}`)
  }

  render() {
    const commenter = this.props.users[this.props.comment.user_id]
    let commenterName = <Link to={`/users/${this.props.comment.user_id}`} 
      className="commenter-username">{commenter.username}</Link>;
    let highlighted = "";
    let deleteButton = null;
    if(this.props.currentUser && this.props.currentUser.id === this.props.comment.user_id) {
      commenterName = <div className="commenter-username">You</div>
      highlighted = " highlighted";
      deleteButton =  <button className="delete-comment" 
                              onClick={() => this.props.deleteComment(this.props.comment)}>
                        <i className="fas fa-trash"></i>
                      </button>
    }
    let commenterPic = <div className="commenter-blank-profile-picture"></div>;

    if (commenter.profilePictureUrl && commenter.profilePictureUrl !== "") {
      commenterPic = <img className="commenter-profile-picture" 
        src={`${commenter.profilePictureUrl}`} ></img>;
    }

    return(
      <div className={`comments-index-item${highlighted}`}>
        <div className="comment-left">
          <div className="commenter-picture-frame" onClick={this.handlePictureLink}>
            {commenterPic}
          </div>
          <div className="comment-main">
            {commenterName}
            <div className="comment-body">{this.props.comment.body}</div>
          </div>
        </div>
        <div className="comment-right">
          <div className="comment-time-ago">{howLongAgo(this.props.comment.created_at)}</div>
          <div className="comment-buttons-area">
            {deleteButton}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteComment: comment => dispatch(deleteComment(comment))
})

export default withRouter(connect(null, mapDispatchToProps)(CommentsIndexItem));