import React from 'react';
import Banner from './banner';
import HeroImage from './hero_image';

class Splash extends React.Component {

  render() {
    return(
      <div className="main-body">
        <Banner />
        <HeroImage />
      </div>
    )
  }
}

export default Splash;