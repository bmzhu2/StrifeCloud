import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SongDetail from './song_detail'
import {fetchSong, remove} from '../../actions/songs_actions';
import {fetchUser} from '../../actions/user_actions';

const mapStateToProps = state => ({
  users: state.entities.users,
  songs: state.entities.songs,
  currentUserId: state.session.currentUserId
})

const mapDispatchToProps = dispatch => ({
  fetchSong: id => dispatch(fetchSong(id)),
  fetchUser: id => dispatch(fetchUser(id)),
  delete: id => dispatch(remove(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SongDetail));