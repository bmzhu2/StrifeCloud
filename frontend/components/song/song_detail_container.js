import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SongDetail from './song_detail'
import {fetchSong, remove, clearRouteErrors, play, pause, unpause} from '../../actions/songs_actions';
import {fetchUser} from '../../actions/user_actions';
import {openModal} from '../../actions/modal_actions';

const mapStateToProps = state => ({
  users: state.entities.users,
  songs: state.entities.songs,
  currentUserId: state.session.currentUserId,
  currentSong: state.session.currentSong,
  paused: state.ui.paused,
  notFound: state.errors.songRoute.errors
})

const mapDispatchToProps = dispatch => ({
  fetchSong: id => dispatch(fetchSong(id)),
  fetchUser: id => dispatch(fetchUser(id)),
  delete: id => dispatch(remove(id)),
  clearRouteErrors: () => dispatch(clearRouteErrors()),
  play: song => dispatch(play(song)),
  pause: () => dispatch(pause()),
  unpause: () => dispatch(unpause()),
  openModal: mode => dispatch(openModal(mode))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongDetail));