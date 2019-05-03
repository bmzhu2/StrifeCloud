import React from 'react';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';

function Modal({ modal, closeModal, openModal, login}) {
  if (!modal) {
    return null;
  }
  let form;
  let otherFormDescription;
  let otherFormButton;
  switch (modal) {
    case 'login':
      form = <LoginFormContainer />;
      otherFormDescription = <p>Don't have an account?</p>
      otherFormButton = <button className="other-form" onClick={() => openModal("signup")}>
      Click to create an account.</button>;
      break;
    case 'signup':
      form = <SignupFormContainer />;
      otherFormDescription = <p>Have an account already?</p>
      otherFormButton = <button className="other-form" onClick={() => openModal("login")}>
      Click to sign in.</button>;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        <div className="modal-box">
          {form}
          <div className="other-buttons">
            {otherFormDescription}
            {otherFormButton}
            <p>or test the site with a demo account:</p>
            <button 
              className="demo-user"
              onClick={() => login({user: {email: "springfield@springfield.com", password: "springfield"}})
                .then(() => closeModal())}>Demo User</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  modal: state.ui.modal
})

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  closeModal: () => dispatch(closeModal()),
  openModal: mode => dispatch(openModal(mode))
})


export default connect(mapStateToProps, mapDispatchToProps)(Modal);