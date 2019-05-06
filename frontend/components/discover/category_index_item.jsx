import React from 'react';
import SongIndexItem from './song_index_item';

class CategoryIndexItem extends React.Component {


  render() {
    return(
      <div className="category-index-item">
        <h2 className="category-name">The Launch</h2>
        <h3 className="category-description"> Music to start the week </h3>
        <div className="song-index">
          <SongIndexItem songIds={[1,2,3,4]}/>
          <SongIndexItem songIds={[1,2,3,4]}/>
          <SongIndexItem songIds={[1,2,3,4]}/>
          <SongIndexItem songIds={[1,2,3,4]}/>
        </div>
      </div>
    )
  }
}

export default CategoryIndexItem;