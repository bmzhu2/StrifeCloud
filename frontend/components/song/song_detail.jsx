import React from 'react';
import SongBanner from './song_banner';

class SongDetail extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.fetchSong(this.props.match.params.id)
      .then(result => this.props.fetchUser(result.song.uploader_id));
  }

  render() {
    let song = this.props.songs[this.props.match.params.id];
    let uploader;
    if (song) {
      uploader = this.props.users[song.uploader_id];
    }
    let banner = (<div></div>)
    if(song && uploader) {
      banner = <SongBanner song={song} uploader={uploader}/>
    }
    return (
      <div className="main-body">
        {banner}
        <div className="song-edit-controls">
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    )
  }
}

export default SongDetail;