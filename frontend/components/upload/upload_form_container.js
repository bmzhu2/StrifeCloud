import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import UploadForm from './upload_form';
import {upload} from '../../actions/songs_actions';

const mapStateToProps = state => ({
  currentUser: state.entities.users[state.session.currentUserId]
})

const mapDispatchToProps = dispatch => ({
  upload: song => dispatch(upload(song))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UploadForm));
