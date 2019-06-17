import React from 'react';
import LibraryIndex from './library_index';

class Library extends React.Component {

  render() {
    return(
      <div className="main-body">
        <div className="library-page">
          <LibraryIndex category="Recently played"/>
          <LibraryIndex category="Likes" construction={true} />
          <LibraryIndex category="Playlists" construction={true} />
        </div>
      </div>
    )
  }
}

export default Library;