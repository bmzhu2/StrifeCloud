import React from 'react';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploaderId: this.props.currentUser.id,
      title: "",
      picture: null, 
      song: null,
      description: "",
      uploading: false
    }

    this.handleSongFile = this.handleSongFile.bind(this);
    this.handlePictureFile = this.handlePictureFile.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (!this.state.title) {
      this.setState({noTitle: true})
      return
    }

    const formData = new FormData();
    formData.append('song[uploader_id]', this.state.uploaderId)
    formData.append('song[title]', this.state.title)
    if (this.state.picture) {
      formData.append('song[picture_file]', this.state.picture)
    }
    formData.append('song[song_file]', this.state.song)
    formData.append('song[description]', this.state.description)

    this.setState({uploading: true})

    this.props.upload(formData)
      .then(result => this.props.history.push(`/songs/${result.song.id}`), 
        err => this.setState({uploading: false}) );
  }

  handleSongFile(e) {
    const songFile = e.currentTarget.files[0]
    if(songFile && songFile.type.search("audio") !== -1) {
      this.setState({song: songFile});
      const songFileForm = document.getElementsByClassName("song-form")[0];
      songFileForm.classList.add("small");
    } else {
      this.showSongFileError()
    }
  }

  showSongFileError() {
    let error = document.getElementsByClassName("song-file-error")[0];
    error.classList.add("present");
    setTimeout(() => {
      error.classList.remove("present");
    }, 6000)
  }

  handlePictureFile(e) {
    const pictureFile = e.currentTarget.files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ picture: pictureFile, pictureUrl: fileReader.result });
    }
    if (pictureFile && pictureFile.type.search("image") !== -1) {
      fileReader.readAsDataURL(pictureFile);
      const pictureFileInput = document.getElementsByClassName("song-picture-section")[0];
      pictureFileInput.classList.add("selected");
    }
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
    const preview = this.state.pictureUrl ? <img src={this.state.pictureUrl} /> : <div className="blank-preview"></div>
    let titleError = null
    if (this.state.noTitle) {
      document.getElementsByClassName("title-label")[0].classList.add("title-error")
      titleError = <p className="missing-title">Enter a title.</p>
    }
    let submitActions = <div className="button-section"><div className="uploading">Uploading...</div></div>
    if (!this.state.uploading) {
      submitActions = (
        <div className="button-section">
          <button className="song-form-cancel" onClick={() => this.props.closeModal()}>Cancel</button>
          <button className="song-form-submit" onClick={this.handleSubmit}>Save</button>
        </div> 
      )
    }

    if (this.state.song) {
      songInfo = (
        <div className="song-info">
          <div className="file-name">{this.state.song.name}</div>
          <div className="input-section">
            <div className="song-picture-section">
              <div className="song-picture-preview">{preview}</div>
              <input
                type="file"
                className="picture-input"
                id="picture-input"
                accept=".jpg,.png,.bmp,.gif"
                onChange={this.handlePictureFile}></input>
              <label className="picture-input-button" htmlFor="picture-input">
                <i className="fas fa-camera"><p>Upload image</p></i>
                <p>Replace image</p>
              </label>
            </div>
              <div className="text-input-section">
                <label className="title-label">
                  <p>Title</p>
                  <input
                    type="text"
                    className="song-title"
                    value={this.state.title}
                    placeholder="Name your song"
                    onChange={this.updateTitle}></input>
                  {titleError}
                </label>
                <label className="description-label">
                  <p>Description</p>
                  <textarea
                    className="song-description"
                    value={this.state.description}
                    placeholder="Describe your song"
                    onChange={this.updateDescription}></textarea>
                </label>
              </div>
          </div>
          {submitActions}
        </div>
      )
    }

    return(
      <form className="song-form">
        <div className="song-file-error fadeIn">
          <div className="exclamation">
            <i className="fas fa-exclamation"></i>
          </div>
          <p>Your file's type is not supported</p>
        </div>
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