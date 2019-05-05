import React from 'react';
import {Link} from 'react-router-dom';

class SongBanner extends React.Component {

  render() {
    const picture = (this.props.song.pictureFileUrl !== "") ? 
      <img className="song-picture" src={`${this.props.song.pictureFileUrl}`} />
      : <div className="blank-image"></div>

    return(
      <div className="song-banner">
        <div className="song-banner-main">
          <button className="song-banner-play"><i className="fas fa-play-circle"></i></button>
          <div className="song-banner-info">
            <Link 
              to={`/users/${this.props.uploader.id}`} 
              className="song-banner-uploader">{this.props.uploader.username}</Link>
            <p className="song-banner-title">{this.props.song.title}</p>
          </div>
        </div>
        {picture}
      </div>
    )
  }
}

export default SongBanner;