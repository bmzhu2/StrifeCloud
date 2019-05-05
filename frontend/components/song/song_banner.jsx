import React from 'react';
import {Link} from 'react-router-dom';

class SongBanner extends React.Component {


  render() {
    return(
      <div className="song-banner">
        <div className="song-banner-main">
          <button className="song-banner-play"><i class="fas fa-play-circle"></i></button>
          <div className="song-banner-info">
            <Link 
              to={`/users/${this.props.uploader.id}`} 
              className="song-banner-uploader">{this.props.uploader.username}</Link>
            <p className="song-banner-title">{this.props.song.title}</p>
          </div>
        </div>
        <img className="song-picture" src={`${this.props.song.pictureFileUrl}`} />
      </div>
    )
  }
}

export default SongBanner;