import React from 'react';

const NavBar = ({openModal}) => {
  return(
    <nav className="home-nav">
      <button className="home-sign-in" onClick={() => openModal('login')}>Sign In</button>
      <button className="home-create-account" onClick={() => openModal('signup')}>Create account</button>
    </nav>
  )
}

export default NavBar;