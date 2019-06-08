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
      currentUser: this.props.currentUser,
      body: ""
    }

    this.handleKey = this.handleKey.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  handleKey(e) {
    if(e.keyCode !== 13) {
      return
    }

    if (!this.props.currentUser) {
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

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && prevProps.currentUser.id !== this.props.currentUser.id) {
      this.setState({
        currentUser: this.props.currentUser
      })
    }
  }

  render() {
    let profilePic = <div className="blank-user-picture-thumbnail"></div>;
    if(this.props.currentUser) {
      const source = this.props.currentUser.profilePictureUrl
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
  currentUser: state.session.currentUser,
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  addComment: comment => dispatch(addComment(comment)),
  openModal: mode => dispatch(openModal(mode))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongCommentForm));