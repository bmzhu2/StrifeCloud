import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {openModal, updateSong} from '../../actions/modal_actions';
import {remove, play, pause, unpause} from '../../actions/songs_actions';

class ProfileSongsIndexItem extends React.Component {
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

  handlePlay() {
    debugger;
    if (this.props.currentSong && this.props.currentSong.id === this.props.song.id) {
      if (this.props.paused) {
        this.props.unpause()
      } else {
        this.props.pause()
      }
    } else {
      this.props.play(this.props.song);
    }
  }

  handlePictureLink() {
    this.props.history.push(`/songs/${this.props.song.id}`);
  }

  handleDelete() {
    this.props.remove(this.props.song.id);
  }

  render() {
    const uploader = this.props.users[this.props.match.params.id];
    let songPic = <div className="song-item-blank-picture"></div>
    if (this.props.song.pictureFileUrl) {
      songPic = <img src={this.props.song.pictureFileUrl} className="song-item-picture"></img>
    }

    let time = ""
    if(this.state.duration) {
      let minutes = Math.floor(this.state.duration / 60).toString()
      let seconds = Math.floor(this.state.duration % 60)

      seconds = seconds < 10 ? `0${seconds}` : seconds.toString();

      time = `${minutes}:${seconds}`;
    }
    debugger;

    let playButton = <button className="user-profile-song-play" onClick={this.handlePlay}><i className="fas fa-play-circle"></i></button>
    if (!this.props.paused && this.props.song && this.props.currentSong && this.props.currentSong.id === this.props.song.id) {
      playButton = <button className="user-profile-song-play" onClick={this.handlePlay}><i className="fas fa-pause-circle"></i></button>
    }

    return(
      <div className="profile-songs-index-item">
        <div className="song-item-picture-frame">
          {songPic}
        </div>
        <div className="song-item-right">
          <div className="song-item-top">
              {playButton}
            <div className="song-item-info">
              <div className="song-item-uploader-and-time">
                <Link to={`${uploader.id}`} className="song-item-uploader">{uploader.username}</Link>
                <p className="song-item-upload-time">{this.props.song.description}</p>
              </div>
              <Link to={`/songs/${this.props.song.id}`} className="song-item-title">{this.props.song.title}</Link>
            </div>
          </div>
            <div className="song-item-waveform">
              <div className="song-item-duration">{time}</div>
            </div>
          <div className="song-item-controls">
            <button
              className="edit-song"
              onClick={() => this.props.updateSong(this.props.song)}>
                <i className="fas fa-pencil-alt"></i>Edit</button>
            <button
              className="delete-song"
              onClick={this.handleDelete}><i className="fas fa-trash"></i>Delete song</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.entities.users,
  paused: state.ui.paused,
  currentSong: state.session.currentSong
})

const mapDispatchToProps = dispatch => ({
  updateSong: song => dispatch(updateSong(song)),
  openModal: mode => dispatch(openModal(mode)),
  remove: id => dispatch(remove(id)),
  play: song => dispatch(play(song)),
  pause: () => dispatch(pause()),
  unpause: () => dispatch(unpause())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileSongsIndexItem));