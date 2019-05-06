import React from 'react'

class Progress extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      progress: 0,
    }

    this.updateProgress = this.updateProgress.bind(this);
    this.interval = null;
  }

  updateProgress() {
    this.setState({
      progress: `${this.props.song.currentTime / this.props.song.duration}`
    })
  }

  render() {
    if(this.state.progress && this.props.song.currentTime === this.props.song.duration) {
      this.props.song.load();
      this.props.song.pause();
      this.setState({
        progress: 0
      })
      this.props.pause();
    }

    let elapsedTime = "0:00";
    let remainingTime = "-0:00";
    if(this.props.song) {
      const currentTime = Math.floor(this.props.song.currentTime);
      remainingTime = Math.floor(this.props.song.duration) - currentTime;
      let currentMinutes = Math.floor(currentTime / 60);
      if(this.props.song.duration / 60 > 10 && currentMinutes < 10) {
        currentMinutes = `0${currentMinutes}`;
      } else {
        currentMinutes = `${currentMinutes}`;
      }
      let currentSeconds = currentTime % 60;
      currentSeconds < 10 ? currentSeconds = `0${currentSeconds}` : currentSeconds = `${currentSeconds}`
      elapsedTime = `${currentMinutes}:${currentSeconds}`;
      let remainingMinutes = Math.floor(remainingTime / 60);
      if (this.props.song.duration / 60 > 10 && remainingMinutes < 10) {
        remainingMinutes = `0${remainingMinutes}`;
      } else {
        remainingMinutes = `${remainingMinutes}`;
      }
      let remainingSeconds = remainingTime % 60;
      remainingSeconds < 10 ? remainingSeconds = `0${remainingSeconds}` : remainingSeconds = `${remainingSeconds}`
      this.props.song.duration ? remainingTime = `-${remainingMinutes}:${remainingSeconds}` : remainingTime = "-0:00";

      if(!this.props.song.paused && !this.interval) {
        this.interval = setInterval(() => {
          this.updateProgress()
        }, 250)
      } else if (this.props.song.paused && this.interval) {
        clearInterval(this.interval)
        this.interval = null;
      }
    }
    return (
      <div className="progress">
        <div className="elapsed-time">{elapsedTime}</div>
        <div className="play-bar">
          <div className="full-line"></div>
          <div className="current-line" style={{width: (500 * this.state.progress) + 'px'}}></div>
          <div className="circle" style={{left: (58 + (500 * this.state.progress)) + 'px'}}></div>
        </div>
        <div className="remaining-time">{remainingTime}</div>
      </div>
    )
  }
}

export default Progress