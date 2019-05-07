import React from 'react';
import SongIndexItem from './song_index_item';

class CategoryIndexItem extends React.Component {


  render() {
    return(
      <div className="category-index-item">
        <h2 className="category-name">{this.props.category}</h2>
        <h3 className="category-description">{this.props.description}</h3>
        <div className="song-index">
          <SongIndexItem songId={this.props.songs[0]}/>
          <SongIndexItem songId={this.props.songs[1]}/>
          <SongIndexItem songId={this.props.songs[2]}/>
          <SongIndexItem songId={this.props.songs[3]}/>
        </div>
      </div>
    )
  }
}

export default CategoryIndexItem;