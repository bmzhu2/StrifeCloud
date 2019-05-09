import React from 'react';
import Banner from './banner';
import HeroImage from './hero_image';
import SongSamples from './song_samples';

class Splash extends React.Component {

  render() {
    return(
      <div className="main-body splash">
        <Banner />
        <HeroImage />
        <SongSamples />
      </div>
    )
  }
}

export default Splash;