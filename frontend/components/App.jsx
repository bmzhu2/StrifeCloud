import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SessionModal from './session/modal';
import NavigationBar from './navigation_bar';
import MusicPlayer from './music_player';
import Splash from './splash/splash';
import Discover from './discover/discover';
import Upload from './upload/upload';
import ErrorPage from './error_page';
import SongDetailContainer from './song/song_detail_container';
import UserProfile from './user/user_profile';

const App = () => {
  return (
    <>
      <header>
        <SessionModal />
        <Route path="/:subpath" component={NavigationBar} />
      </header>

      <Switch>
        <AuthRoute exact path="/" component={Splash} />
        <Route path="/discover" component={Discover} />
        <Route path="/upload" component={Upload} />
        <Route path="/songs/:id" component={SongDetailContainer} />
        <Route path="/users/:id" component={UserProfile} />
        <Route path="/" component={ErrorPage}/>
      </Switch>

      <footer>
        <MusicPlayer />
      </footer>

      {/* <MusicPlayer/> */}
    </>
  )
}

export default App;