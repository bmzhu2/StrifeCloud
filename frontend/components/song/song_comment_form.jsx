import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {openModal} from '../../actions/modal_actions';
import {addComment} from '../../actions/comment_actions';

class SongCommentForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      song_id: this.props.match.params.id,
      user_id: this.props.currentUserId,
      body: ""
    }

    this.handleKey = this.handleKey.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  handleKey(e) {
    if(e.keyCode !== 13) {
      return
    }
    if (!this.props.currentUserId) {
      this.props.openModal("signup");
      return;
    }
    if (!this.state.body === "") {
      return;
    }

    const comment = Object.assign({}, { comment: this.state });

    this.props.addComment(comment)
    .then(() => this.setState({
      body: ""
    }));
  }

  updateBody(e) {
    this.setState({
      body: e.target.value
    })
  }

  render() {
    let profilePic = <div className="blank-user-picture-thumbnail"></div>;
    if(this.props.currentUserId) {
      const source = this.props.users[this.props.currentUserId].profilePictureUrl
      if (source) {
        profilePic = <img src={source} className="user-picture-thumbnail"></img>
      }
    }
    return(
      <div className="song-comment-form">
        <div className="user-picture-thumbnail-frame">{profilePic}</div>
        <div className="comment-container">
          <input type="text" className="comment-input" placeholder="Write a comment"
            value={this.state.body} onChange={this.updateBody} onKeyDown={this.handleKey}></input>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUserId: state.session.currentUserId,
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(addComment(comment)),
  openModal: mode => dispatch(openModal(mode))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongCommentForm));