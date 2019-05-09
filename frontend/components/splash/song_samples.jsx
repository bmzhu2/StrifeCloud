import React from 'react';
import {withRouter} from 'react-router-dom';
import SongIndexItem from '../discover/song_index_item';

class SongSamples extends React.Component {
  constructor(props) {
    super(props);

    this.toDiscover = this.toDiscover.bind(this);
  }

  toDiscover() {
    this.props.history.push("/discover/")
  }

  render() {
    return (
      <div className="splash-song-samples">
        <h1 className="splash-song-samples-header">Hear what's trending for free in the StrifeCloud community</h1>
        <div className="splash-songs-index">
          {[30,8,16,24,12,4,1,10,29,35,13,7].map(id => (
            <SongIndexItem key={id} splash="splash" songId={id}/>
          ))}
        </div>
        <button className="splash-discover-button" onClick={this.toDiscover}>Explore trending songs</button>
      </div>
    )
  }
}

export default withRouter(SongSamples);