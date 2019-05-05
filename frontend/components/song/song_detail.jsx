import React from 'react';
import SongBanner from './song_banner';

class SongDetail extends React.Component {

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount(){
    this.props.clearRouteErrors();
  }

  componentDidMount(){
    this.props.fetchSong(this.props.match.params.id)
      .then(result => this.props.fetchUser(result.song.uploader_id));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      this.props.clearRouteErrors();
      this.props.fetchSong(nextProps.match.params.id)
        .then(result => this.props.fetchUser(result.song.uploader_id));
    }
  }

  handleDelete() {
    this.props.delete(this.props.match.params.id);
    this.render();
  }

  render() {
    let song = this.props.songs[this.props.match.params.id];
    let uploader;
    let editControls = null;
    if (song) {
      uploader = this.props.users[song.uploader_id];
      if (song.uploader_id === this.props.currentUserId) {
        editControls = (
          <div className="song-edit-controls">
            <button className="edit-song"><i className="fas fa-pencil-alt"></i>Edit</button>
            <button 
              className="delete-song"
              onClick={this.handleDelete}><i className="fas fa-trash"></i>Delete song</button>
          </div>
        )
      }
    }
    let notFound = null;
    if (this.props.notFound) {
      notFound = <div className="no-song">This song doesn't exist, or no longer exists.</div>
    }
    let banner = (<div></div>)
    if(song && uploader) {
      banner = <SongBanner song={song} uploader={uploader}/>
    }
    return (
      <div className="main-body">
        {banner}
        {editControls}
        {notFound}
      </div>
    )
  }
}

export default SongDetail;