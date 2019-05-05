import React from 'react'

class SongBanner extends React.Component {


  render() {
    return(
      <div className="song-banner">
        <div className="song-banner-main">
          <button className="song-banner-play">Play</button>
          <div className="song-banner-info">
            <p className="song-banner-uploader">{this.props.uploader.username}</p>
            <p className="song-banner-title">{this.props.song.title}</p>
          </div>
        </div>
        <img className="song-picture" src={`${this.props.song.pictureFileUrl}`} />
      </div>
    )
  }
}

export default SongBanner;