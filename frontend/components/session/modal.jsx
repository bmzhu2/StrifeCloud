import React from 'react';
import { login, clearErrs } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';

class Modal extends React.Component {

  constructor(props) {
    super(props)

    this.closeAndClear = this.closeAndClear.bind(this);
    this.switchForms = this.switchForms.bind(this);
  }

  switchForms() {
    switch (this.props.modal) {
      case "login":
        this.props.openModal("signup");       
        break;
      case "signup":
        this.props.openModal("login");
        break;
      default:
        break;
    }

    this.props.clearErrors();
  }

  closeAndClear() {
    this.props.closeModal();
    this.props.clearErrors();
  }

  render() { 
    if (!this.props.modal) {
      return null;
    }
    let form;
    let otherFormDescription;
    let otherFormButton;
    switch (this.props.modal) {
      case 'login':
        form = <LoginFormContainer />;
        otherFormDescription = <p>Don't have an account?</p>
        otherFormButton = <button className="other-form" 
          onClick={this.switchForms}>
        Click to create an account.</button>;
        break;
      case 'signup':
        form = <SignupFormContainer />;
        otherFormDescription = <p>Have an account already?</p>
        otherFormButton = <button className="other-form" 
          onClick={this.switchForms}>
        Click to sign in.</button>;
        break;
      default:
        return null;
    }
    return (
      <div className="modal-background fadeIn" onClick={this.closeAndClear}>
        <button className="modal-close-button fadeIn"><i className="fas fa-times"></i></button>
        <div className="modal-child slideInDown" onClick={e => e.stopPropagation()}>
          <div className="modal-box">
            {form}
            <div className="other-buttons">
              {otherFormDescription}
              {otherFormButton}
              <p>or test the site with a demo account:</p>
              <button 
                className="demo-user"
                onClick={() => this.props.login({user: {email: "aerith@strifecloud.com", password: "password"}})
                  .then(() => this.closeAndClear())}>Demo User</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.ui.modal
})

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  closeModal: () => dispatch(closeModal()),
  openModal: mode => dispatch(openModal(mode)),
  clearErrors: () => dispatch(clearErrs())
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);