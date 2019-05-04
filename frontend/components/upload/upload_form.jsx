import React from 'react';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploaderId: this.props.currentUser.id,
      title: "",
      picture: null, 
      song: null,
      description: ""
    }
    this.handleSongFile = this.handleSongFile.bind(this);
    this.handlePictureFile = this.handlePictureFile.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const formData = new FormData();
    formData.append('song[uploader_id]', this.state.uploaderId)
    formData.append('song[title]', this.state.title)
    formData.append('song[picture_file]', this.state.picture)
    formData.append('song[song_file]', this.state.song)
    formData.append('song[description]', this.state.description)

    this.props.upload(formData)
      .then(() => this.props.history.push('/discover'));
  }

  clearForm() {
    this.setState({
      uploaderId: this.props.currentUser.id,
      title: "",
      picture: null,
      song: null,
      description: ""
    })
    debugger;
  }

  handleSongFile(e) {
    let songFile = e.currentTarget.files[0]
    if(songFile && songFile.type.search("audio") !== -1) {
      this.setState({song: songFile})
    }

    let songFileForm = document.getElementsByClassName("song-form")[0]
    songFileForm.classList.add("small");
  }

  handlePictureFile(e) {
    let pictureFile = e.currentTarget.files[0]
    if (pictureFile && pictureFile.type.search("image") !== -1) {
      this.setState({ picture: pictureFile })
    }

    let pictureFileInput = document.getElementsByClassName("picture-input")[0]
    pictureFileInput.classList.add("selected");
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
    if (this.state.song) {
      songInfo = (
        <>
          <div className="song-picture-mini-form">
            <div className="song-picture-preview"></div>
            <input 
              type="file" 
              className="picture-input"
              id="picture-input"
              onChange={this.handlePictureFile}></input>
            <label htmlFor="picture-input"></label>
          </div>
          <input 
            type="text" 
            className="song-title"
            value={this.state.title}
            placeholder="Name your song"
            onChange={this.updateTitle}></input>
          <textarea 
            className="song-description"
            value={this.state.description}
            placeholder="Describe your song"
            onChange={this.updateDescription}></textarea>
          <button className="song-form-cancel" onClick={this.clearForm}>Cancel</button>
          <button className="song-form-submit" onClick={this.handleSubmit}>Save</button>
        </>
      )
    }

    return(
      <form className="song-form">
        <div className="song-input-box">
          <input type="file" className="song-input" id="song-input" onChange={this.handleSongFile}></input>
          <label className="song-input-button" htmlFor="song-input">choose file to upload</label>
          <p>Provide FLAC, WAV, ALAC or AIFF for best audio quality.</p>
        </div>

        {songInfo}
      </form>
    )
  }
}

export default UploadForm;