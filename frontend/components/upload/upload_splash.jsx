import React from 'react';
import {connect} from 'react-redux';
import {openModal} from '../../actions/modal_actions';

class UploadSplash extends React.Component {
  
  render() {
    return (
      <div>
        First upload to first album
        Share your tracks and access the tools you need to break through and build your legacy.
        <button className="upload-splash-button" onClick={this.props.openModal}>Upload your first track</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  openModal: (mode) => dispatch(openModal(mode))
})

export default connect(null, mapDispatchToProps)(UploadSplash);