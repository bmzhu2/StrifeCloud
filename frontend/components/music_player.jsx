import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {pause, unpause} from '../actions/songs_actions';
import Progress from './music_player_parts/progress';
import Volume from './music_player_parts/volume';

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      song: null,
      loop: false
    }

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleLoop = this.toggleLoop.bind(this);
  }

  componentDidUpdate(prevProps){
    if (this.props.song && this.props.song !== prevProps.song) {
      if(this.state.song) {
        this.state.song.pause();
      }
      this.setState({
        song: new Audio(this.props.song.songFileUrl),
      }, () => {
        this.state.song.play();
          this.props.unpause();
      });
    }
  }

  togglePlay() {
    if(!this.state.song){
      return;
    }

    if(this.props.paused) {
      this.props.unpause();
    } else {
      this.props.pause();
    }
  }

  toggleLoop() {
    this.setState({loop: !this.state.loop})
  }

  render() {
    let songRoute = "#";
    let userRoute = "#";
    let progress = <Progress />;
    let volume = <Volume />;
    let songThumbnail = null;
    let uploaderName = null;
    let songTitle = null;
    if(this.props.song) {
      progress = <Progress song={this.state.song} pause={this.props.pause} loop={this.state.loop}/>
      volume = <Volume song={this.state.song}/>
      songRoute = `/songs/${this.props.song.id}`
      userRoute = `/users/${this.props.song.uploader_id}`
      songThumbnail = this.props.song.pictureFileUrl !== "" ? 
        <img className="song-thumbnail" src={`${this.props.song.pictureFileUrl}`} />
        : <div className="blank-thumbnail"></div>;
      uploaderName = this.props.users[this.props.song.uploader_id].username;
      songTitle = this.props.song.title;

      if (this.state.song) {
        this.props.paused ? this.state.song.pause() : this.state.song.play()
      }
    }

    let playButton = this.props.paused ?
      <button className="icon play" onClick={this.togglePlay}>Play</button>
    : <button className="icon pause" onClick={this.togglePlay}>Pause</button>

    let loopButton = this.state.loop ?
      <button className="icon loop" onClick={this.toggleLoop}>Loop</button>
    : <button className="icon no-loop" onClick={this.toggleLoop}>No Loop</button>
    
    return(
      <section className="music-player">
        <div className="play-controls">
          <button className="icon prev">Previous</button>
          {playButton}
          <button className="icon next">Next</button>
          {loopButton}
        </div>
        {progress}
        {volume}
        <div className="player-song-info">
          <Link to={songRoute} className="thumbnail">{songThumbnail}</Link>
          <div className="player-text-info">
            <Link to={userRoute} className="player-uploader-name">{uploaderName}</Link>
            <Link to={songRoute} className="player-track-title">{songTitle}</Link>
          </div>
        </div>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  song: state.session.currentSong,
  users: state.entities.users,
  paused: state.ui.paused
})

const mapDispatchToProps = dispatch => ({
  pause: () => dispatch(pause()),
  unpause: () => dispatch(unpause())
})

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer)