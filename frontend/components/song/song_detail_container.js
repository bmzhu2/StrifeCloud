import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SongDetail from './song_detail'
import {fetchSong, remove, clearRouteErrors} from '../../actions/songs_actions';
import {fetchUser} from '../../actions/user_actions';

const mapStateToProps = state => ({
  users: state.entities.users,
  songs: state.entities.songs,
  currentUserId: state.session.currentUserId,
  notFound: state.errors.songRoute.errors
})

const mapDispatchToProps = dispatch => ({
  fetchSong: id => dispatch(fetchSong(id)),
  fetchUser: id => dispatch(fetchUser(id)),
  delete: id => dispatch(remove(id)),
  clearRouteErrors: () => dispatch(clearRouteErrors())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongDetail));