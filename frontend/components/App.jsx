import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Modal from './session/modal';
import Splash from './splash/splash';

const App = () => (
  <>
    <Modal />
    <Switch>
      <Route exact path="/" component={Splash}/>
    </Switch>
  
    {/* <MusicPlayer/> */}
  </>

);

export default App;