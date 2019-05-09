import React from 'react';
import {connect} from 'react-redux';
import {openModal} from '../../actions/modal_actions';

class UploadSplash extends React.Component {
  
  render() {
    return (
      <div>
        <div className="upload-splash-hero-image">
          <h1 className="upload-splash-header">Make your first upload today</h1>
          <h2 className="upload-splash-body">Share your songs and build your memetic legacy</h2>
          <button className="upload-splash-button" onClick={() => this.props.openModal("signup")}>Upload your first track</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  openModal: (mode) => dispatch(openModal(mode))
})

export default connect(null, mapDispatchToProps)(UploadSplash);