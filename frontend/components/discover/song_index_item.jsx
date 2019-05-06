import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class SongIndexItem extends React.Component {

  render() {
    return(
      <div className="song-index-item">
        <div className="song-item-image"></div>
        <div className="song-item-title">Best Rap Right Now</div>
        <div className="song-item-uploader"> Hustle </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  songs: state.entities.songs,
  users: state.entities.users
})

const mapDispatchToProps = dispatch => ({
  fetchSong: dispatch(fetchSong())
})

export default SongIndexItem;