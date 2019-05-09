import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { update } from '../../actions/songs_actions';
import { closeModal } from '../../actions/modal_actions';

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.song) {
      this.song = this.props.song
    } else {
      this.song = this.props.songs[this.props.match.params.id]
    }

    this.state = {
      title: this.song.title,
      description: this.song.description,
      updating: false
    }

    debugger;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePictureFile = this.handlePictureFile.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  handleSubmit() {
    if (!this.state.title) {
      this.setState({ noTitle: true })
      return
    }

    const formData = new FormData();
    formData.append('song[title]', this.state.title)
    if (this.state.picture) {
      formData.append('song[picture_file]', this.state.picture)
    }
    formData.append('song[description]', this.state.description)

    this.setState({ uploading: true })

    this.props.update({song: formData, id: this.song.id})
      .then(result => this.props.closeModal(),
        err => this.setState({ uploading: false }));
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
    let preview = <div className="blank-preview"></div>;
    if (this.state.pictureUrl) {
      preview = <img src={this.state.pictureUrl} />
    } else if (this.song.pictureFileUrl) {
      preview = <img src={this.song.pictureFileUrl} />
    }
    let titleError = null
    if (this.state.noTitle) {
      document.getElementsByClassName("title-label")[0].classList.add("title-error")
      titleError = <p className="missing-title">Enter a title.</p>
    }
    let submitActions = <div className="button-section"><div className="uploading">Uploading...</div></div>
    if (!this.state.updating) {
      submitActions = (
        <div className="button-section">
          <button className="song-form-cancel" onClick={this.props.closeModal}>Cancel</button>
          <button className="song-form-submit" onClick={this.handleSubmit}>Save</button>
        </div>
      )
    }

    return(
      <div className="song-info">
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
}

const mapStateToProps = state => ({
  songs: state.entities.songs
})

const mapDispatchToProps = dispatch => ({
  update: song => dispatch(update(song)),
  closeModal: () => dispatch(closeModal())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateForm));


