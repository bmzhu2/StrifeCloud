import React from 'react';
import SongBanner from './song_banner';

class SongDetail extends React.Component {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount(){
    this.props.fetchSong(this.props.match.params.id)
      .then(result => this.props.fetchUser(result.song.uploader_id));
  }

  handleDelete() {
    this.props.delete(this.props.match.params.id);
  }

  render() {
    let song = this.props.songs[this.props.match.params.id];
    let uploader;
    let editControls = <div></div>
    if (song) {
      uploader = this.props.users[song.uploader_id];
      if (song.uploader_id === this.props.currentUserId) {
        editControls = (
          <div className="song-edit-controls">
            <button className="edit-song">Edit</button>
            <button 
              className="delete-song"
              onClick={this.handleDelete}>Delete</button>
          </div>
        )
      }
    }
    let banner = (<div></div>)
    if(song && uploader) {
      banner = <SongBanner song={song} uploader={uploader}/>
    }
    return (
      <div className="main-body">
        {banner}
        {editControls}
      </div>
    )
  }
}

export default SongDetail;