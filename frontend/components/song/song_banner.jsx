import React from 'react';
import {Link} from 'react-router-dom';
import {howLongAgo} from '../../util/date_util';

class SongBanner extends React.Component {
  constructor(props) {
    super(props);

    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    if (this.props.currentSong && this.props.currentSong.id === this.props.song.id) {
      if(this.props.paused) {
        this.props.unpause()
      } else {
        this.props.pause()
      }
    } else {
      this.props.play(this.props.song);
    }
  }

  render() {
    const picture = (this.props.song.pictureFileUrl !== "") ? 
      <img className="song-picture" src={`${this.props.song.pictureFileUrl}`} />
      : <div className="blank-image"></div>

    let playButton = <button className="song-banner-play" onClick={this.handleButton}><i className="fas fa-play-circle"></i></button>
    if (!this.props.paused && this.props.song && this.props.currentSong && this.props.currentSong.id === this.props.song.id) {
      playButton = <button className="song-banner-play" onClick={this.handleButton}><i className="fas fa-pause-circle"></i></button>
    }
    return(
      <div className="song-banner">
        <div className="song-banner-main">
          {playButton}
          <div className="song-banner-info">
            <Link 
              to={`/users/${this.props.uploader.id}`} 
              className="song-banner-uploader">{this.props.uploader.username}</Link>
            <p className="song-banner-title">{this.props.song.title}</p>
          </div>
        </div>
        <div className="banner-right-side">
          <div className="banner-upload-time-ago">{howLongAgo(this.props.song.created_at)}</div>
          <div className="song-picture-frame">{picture}</div>
        </div>
      </div>
    )
  }
}

export default SongBanner;