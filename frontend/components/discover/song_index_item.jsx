import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {fetchSong, pause, unpause} from '../../actions/songs_actions';
import { play } from '../../actions/user_actions';

class SongIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.fetched = false;
    this.handleImageLink = this.handleImageLink.bind(this)
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    this.props.fetchSong(this.props.songId)
    this.fetched = true;
  }

  handleImageLink() {
    this.props.history.push(`/songs/${this.props.songId}`);
  }

  handlePlay(e) {
    e.stopPropagation();
    if (!this.fetched || !Object.keys(this.props.songs).includes(this.props.songId.toString())) {
      return;
    }
    if (this.props.currentSong && this.props.currentSong.id === this.props.songId) {
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
      this.props.play(this.props.songs[this.props.songId], userId);
    }
  }
  

  render() {
    let playButton = <button className="play" onClick={this.handlePlay}><i className="fas fa-play-circle"></i></button>;
    if (this.fetched && !this.props.paused && this.props.currentSong && this.props.currentSong.id === this.props.songId) {
      playButton = <button className="play nowPlaying" onClick={this.handlePlay}><i className="fas fa-pause-circle"></i></button>
    }

    let title = "";
    let titleLink = "#";
    let uploader = "";
    let uploaderLink = "#";
    let picture = <div className="blank-image">{playButton}</div>;
    if(this.fetched && Object.keys(this.props.songs).includes(this.props.songId.toString())) {
      const song = this.props.songs[this.props.songId];
      
      if (song.pictureFileUrl !== "") {
        picture = <div className="song-item-image" onClick={this.handleImageLink}>
          <img className="song-picture" src={`${song.pictureFileUrl}`} />
          {playButton}
        </div>
      }

      title = song.title;
      titleLink = `/songs/${song.id}`;
      if(Object.keys(this.props.users).includes(song.uploader_id.toString())) {
        uploader = this.props.users[song.uploader_id].username;
      }
      uploaderLink = `/users/${song.uploader_id}`;
    }
    let splash=" discover"
    if (this.props.splash) {
      splash=" splash"
    }
    return(
      <div className={`song-index-item${splash}`}>
        {picture}
        <Link to={`${titleLink}`} className="song-item-title">{title}</Link>
        <Link to={`${uploaderLink}`} className="song-item-uploader">{uploader}</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.entities.songs,
  users: state.entities.users,
  currentSong: state.session.currentSong,
  currentUser: state.session.currentUser,
  paused: state.ui.paused
})

const mapDispatchToProps = dispatch => ({
  fetchSong: id => dispatch(fetchSong(id)),
  play: (song, userId) => dispatch(play(song, userId)),
  pause: () => dispatch(pause()),
  unpause: () => dispatch(unpause())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongIndexItem));