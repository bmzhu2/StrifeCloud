import React from 'react';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import UpdateForm from './update_form';

class UpdateModal extends React.Component {
  render() {
    if(!this.props.modal) {
      return null;
    }
    let song = {};
    if(this.props.song) {
      song = this.props.song
    }
    let form = this.props.modal === 'update' ? <UpdateForm song={song}/> : null
  
    return (
      <div className="modal-background fadeIn" onClick={this.props.closeModal}>
        <button className="modal-close-button fadeIn"><i className="fas fa-times"></i></button>
        <div className="update-modal-child slideInDown" onClick={e => e.stopPropagation()}>
          <div className="update-modal-box">
            {form}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.ui.modal,
  song: state.ui.update
})

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  openModal: mode => dispatch(openModal(mode)),
  clearErrors: () => dispatch(clearErrs())
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateModal);