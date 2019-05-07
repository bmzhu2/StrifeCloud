import React from 'react';
import SongIndexItem from './song_index_item';

class CategoryIndexItem extends React.Component {


  render() {
    return(
      <div className="category-index-item">
        <h2 className="category-name">{this.props.category}</h2>
        <h3 className="category-description">{this.props.description}</h3>
        <div className="song-index">
          <SongIndexItem songId={24}/>
          <SongIndexItem songId={24}/>
          <SongIndexItem songId={24}/>
          <SongIndexItem songId={24}/>
        </div>
      </div>
    )
  }
}

export default CategoryIndexItem;