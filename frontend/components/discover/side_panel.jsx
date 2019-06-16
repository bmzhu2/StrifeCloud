import React from 'react';
import RecentlyPlayed from './recently_played';

class SidePanel extends React.Component {

  render() {
    return(
      <div className="side-panel">
        <RecentlyPlayed />
        <section className="links">
          <a href="https://github.com/bmzhu2/StrifeCloud" className="icon fab fa-github"></a>
          <a href="https://www.linkedin.com/in/brianmzhu/" className="icon fab fa-linkedin"></a>
          <a href="http://www.brianmzhu.com" className="icon fas fa-user"></a>
        </section>
      </div>
    )
  }
}

export default SidePanel;