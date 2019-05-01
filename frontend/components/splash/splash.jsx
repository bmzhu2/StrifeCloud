import React from 'react';
import Banner from './banner';
import HeroImage from './hero_image';

class Splash extends React.Component {

  render() {
    return(
      <main>
        <Banner />
        <HeroImage />
      </main>
    )
  }
}

export default Splash;