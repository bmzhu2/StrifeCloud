import React from 'react';
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { openModal, updateSong } from '../../actions/modal_actions';
import { remove, pause, unpause } from '../../actions/songs_actions';
import { play } from '../../actions/user_actions';
import { howLongAgo } from '../../util/date_util';

class SongResult extends React.Component {
  constructor(props) {
    super(props)

    this.state = ({
      duration: ""
    })

    
    this.audio = new Audio(this.props.song.songFileUrl);
    this.audio.addEventListener('loadedmetadata', () => {
      this.setState({ duration: this.audio.duration })
    })
    
    this.handlePictureLink = this.handlePictureLink.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentWillUnmount() {
    this.audio.removeEventListener('loadedmetadata', () => {
      this.setState({ duration: this.audio.duration })
    })
  }

  handlePlay() {
    if (this.props.currentSong && this.props.currentSong.id === this.props.song.id) {
      if (this.props.paused) {
        this.props.unpause()
      } else {
        this.props.pause()
      }
    } else {
      let userId = null;
      if (this.props.currentUser) {
        userId = this.props.currentUser.id
      }
      this.props.play(this.props.song), userId;
    }
  }

  handlePictureLink() {
    this.props.history.push(`/songs/${this.props.song.id}`);
  }

  handleDelete() {
    this.props.remove(this.props.song.id);
  }

  render() {
    let songPic = <div className="song-item-blank-picture"></div>
    if (this.props.song.pictureFileUrl) {
      songPic = <img src={this.props.song.pictureFileUrl}
        className="song-item-picture" onClick={this.handlePictureLink}></img>
    } else if (this.props.song.pictureFileUrl === "") {
      songPic = <div className="song-item-blank-picture" onClick={this.handlePictureLink}></div>
    }

    let time = ""
    if (this.state.duration) {
      let minutes = Math.floor(this.state.duration / 60).toString()
      let seconds = Math.floor(this.state.duration % 60)

      seconds = seconds < 10 ? `0${seconds}` : seconds.toString();

      time = `${minutes}:${seconds}`;
    }

    let playButton = <button className="user-profile-song-play" onClick={this.handlePlay}><i className="fas fa-play-circle"></i></button>
    if (!this.props.paused && this.props.song && this.props.currentSong && this.props.currentSong.id === this.props.song.id) {
      playButton = <button className="user-profile-song-play" onClick={this.handlePlay}><i className="fas fa-pause-circle"></i></button>
    }

    let songEditControls = <div className="empty-song-edit-controls"></div>

    if (this.props.currentUser && this.props.currentUser.id === this.props.uploader.id) {
      songEditControls = (<div className="song-item-controls">
        <button
          className="edit-song"
          onClick={() => this.props.updateSong(this.props.song)}>
          <i className="fas fa-pencil-alt"></i>Edit</button>
        <button
          className="delete-song"
          onClick={this.handleDelete}><i className="fas fa-trash"></i>Delete song</button>
      </div>)
    }

    return (
      <div className="profile-songs-index-item">
        <div className="song-item-picture-frame">
          {songPic}
        </div>
        <div className="song-item-right">
          <div className="song-item-top">
            {playButton}
            <div className="song-item-info">
              <div className="song-item-uploader-and-time">
                <Link to={`/users/${this.props.uploader.id}`} className="song-item-uploader">{this.props.uploader.username}</Link>
                <p className="song-item-upload-time">{howLongAgo(this.props.song.created_at)}</p>
              </div>
              <Link to={`/songs/${this.props.song.id}`} className="song-item-title">{this.props.song.title}</Link>
            </div>
          </div>
          <div className="song-item-waveform">
            <div className="song-item-duration">{time}</div>
          </div>
          {songEditControls}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  paused: state.ui.paused,
  currentUser: state.session.currentUser,
  currentSong: state.session.currentSong
})

const mapDispatchToProps = dispatch => ({
  updateSong: song => dispatch(updateSong(song)),
  openModal: mode => dispatch(openModal(mode)),
  remove: id => dispatch(remove(id)),
  play: (song, userId) => dispatch(play(song, userId)),
  pause: () => dispatch(pause()),
  unpause: () => dispatch(unpause())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongResult));