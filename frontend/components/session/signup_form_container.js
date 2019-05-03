import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import { signup } from '../../actions/session_actions';
import { clearErrs, closeModal } from '../../actions/modal_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'signup',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrs())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));