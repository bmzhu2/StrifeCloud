import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import { pause, unpause } from '../../actions/songs_actions';
import { play } from '../../actions/user_actions';

class RecentlyPlayedItem extends React.Component {
  constructor(props) {
    super(props)

    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(e) {
    e.stopPropagation();

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
      this.props.play(this.props.song, userId);
    }
  }

  render() {
    let playButton = <button className="play" onClick={this.handlePlay}><i className="fas fa-play-circle"></i></button>;
    if (!this.props.paused && this.props.currentSong && this.props.currentSong.id === this.props.song.id) {
      playButton = <button className="play nowPlaying" onClick={this.handlePlay}><i className="fas fa-pause-circle"></i></button>
    }

    let title = this.props.song.title;
    let titleLink = `/songs/${this.props.song.id}`;
    let uploader = this.props.uploader.username;
    let uploaderLink = `/users/${this.props.song.uploader_id}`;
    let picture = <div className="discover-recent-blank-image">{playButton}</div>;

    if (this.props.song.pictureFileUrl !== "") {
      picture = <div className="discover-recent-frame">
        <img className="discover-recent-picture" src={`${this.props.song.pictureFileUrl}`} />
        {playButton}
      </div>
    }

    return (
      <div className="discover-recent-item">
        {picture}
        <div className="discover-recent-links">
          <Link to={`${uploaderLink}`} className="discover-recent-uploader">{uploader}</Link>
          <Link to={`${titleLink}`} className="discover-recent-title">{title}</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentSong: state.session.currentSong,
  currentUser: state.session.currentUser,
  paused: state.ui.paused
})

const mapDispatchToProps = dispatch => ({
  play: (song, userId) => dispatch(play(song, userId)),
  pause: () => dispatch(pause()),
  unpause: () => dispatch(unpause())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayedItem));