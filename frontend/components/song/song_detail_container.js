import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SongDetail from './song_detail'
import {fetchSong, remove, clearRouteErrors, pause, unpause} from '../../actions/songs_actions';
import { play } from '../../actions/user_actions';
import {openModal} from '../../actions/modal_actions';

const mapStateToProps = state => ({
  users: state.entities.users,
  songs: state.entities.songs,
  comments: state.entities.comments,
  currentUser: state.session.currentUser,
  currentSong: state.session.currentSong,
  paused: state.ui.paused,
  notFound: state.errors.songRoute.errors
})

const mapDispatchToProps = dispatch => ({
  fetchSong: id => dispatch(fetchSong(id)),
  delete: id => dispatch(remove(id)),
  clearRouteErrors: () => dispatch(clearRouteErrors()),
  play: (song, userId) => dispatch(play(song, userId)),
  pause: () => dispatch(pause()),
  unpause: () => dispatch(unpause()),
  openModal: mode => dispatch(openModal(mode))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongDetail));