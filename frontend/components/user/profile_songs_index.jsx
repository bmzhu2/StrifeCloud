import React from 'react';
import {connect} from 'react-redux';
import ProfileSongsIndexItem from './profile_songs_index_item';

class ProfileSongsIndex extends React.Component{

  render() {
    let songs = null;
    if(this.props.fetched) {
      songs = (
        <>
          {Object.values(this.props.songs).map(song => (
            <ProfileSongsIndexItem key={song.id} song={song} />
          ))}
        </>
      )
    }

    return(
      <div className="profile-songs-index">
        {songs}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUserId: state.session.currentUserId,
  songs: state.entities.songs
})

export default connect(mapStateToProps)(ProfileSongsIndex);