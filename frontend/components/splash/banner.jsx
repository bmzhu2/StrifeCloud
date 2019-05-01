import React from 'react';
import Logo from './logo';
import NavBarContainer from './nav_bar_container';

class Banner extends React.Component {
  
  render() {
    return (
      <section className="home-banner">
        <Logo />
        <NavBarContainer />
      </section>
    )
  }
}

export default Banner;