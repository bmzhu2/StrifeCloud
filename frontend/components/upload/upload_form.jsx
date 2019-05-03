import React from 'react';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      picture: null, 
      file: null,
      description: ""
    }
    this.handleSongFile = this.handleSongFile.bind(this);
    this.handlePictureFile = this.handlePictureFile.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // const user = Object.assign({}, { user: this.state });
    // this.props.processForm(user)
    //   .then(() => this.closeAndClear())
    //   .then(() => this.props.history.push('/discover'));
    // }
  }

  handleCancel() {
    this.setState = {
      title: "",
      picture: null,
      file: null,
      description: ""
    }
  }

  handleSongFile(e) {
    let songFile = e.currentTarget.files[0]
    if(songFile.type.search("audio") !== -1) {
      this.setState({file: songFile})
    }

    let songFileForm = document.getElementsByClassName("song-form")[0]
    songFileForm.classList.add("small");
  }

  handlePictureFile(e) {
    let pictureFile = e.currentTarget.files[0]
    debugger;
    // if (pictureFile.type.search("image") !== -1) {
    //   this.setState({ file: pictureFile })
    // }

    let pictureFileInput = document.getElementsByClassName("picture-input")[0]
    songFileForm.classList.add("selected");
  }

  updateTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  updateDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  render() {
    let songInfo = null;
    if (this.state.songFile) {
      songInfo = (
        <>
          <div class="song-picture-mini-form">
            <div class="song-picture-preview"></div>
            <input type="file" className="picture-input" onChange={this.handlePictureFile}></input>
          </div>
          <input type="text" className="song-title"></input>
          <textarea className="song-description"></textarea>
          <button class="song-form-cancel" onClick={this.handleCancel}>Cancel</button>
          <button class="song-form-submit" onClick={this.handleSubmit}>Save</button>
        </>
      )
    }
    return(
      <form className="song-form">
        <input type="file" className="song-input" onChange={this.handleSongFile}></input>

        {songInfo}
      </form>
    )
  }
}

export default UploadForm;