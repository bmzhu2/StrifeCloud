import {connect} from 'react-redux';
import NavBar from './nav_bar';
import {openModal} from '../../actions/modal_actions';

const mapDispatchToProps = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
})

export default connect(null, mapDispatchToProps)(NavBar);