import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Modal from './session/modal';
import NavigationBar from './navigation_bar';
import Splash from './splash/splash';
import Discover from './discover/discover';

const App = () => {
  return (
    <>
      <header>
        <Modal />
        <Route path="/:subpath" component={NavigationBar} />
      </header>

      <Switch>
        <AuthRoute exact path="/" component={Splash} />
        <Route path="/discover" component={Discover} />
      </Switch>

      {/* <MusicPlayer/> */}
    </>
  )
}

export default App;