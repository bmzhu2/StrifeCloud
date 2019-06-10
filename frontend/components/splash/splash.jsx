import React from 'react';
import Banner from './banner';
import HeroImage from './hero_image';
import SearchBar from './search_bar';
import SongSamples from './song_samples';

class Splash extends React.Component {

  render() {
    return(
      <div className="main-body splash">
        <Banner />
        <HeroImage />
        <SearchBar />
        <SongSamples />
      </div>
    )
  }
}

export default Splash;