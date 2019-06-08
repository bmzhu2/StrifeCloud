import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_CURRENT_SONG, REMOVE_SONG } from '../actions/songs_actions';

const _nullSession = {
  currentUser: null,
  currentSong: null
}

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      nextState.currentUser = action.currentUser.user;
      return nextState;
    case LOGOUT_CURRENT_USER:
      nextState.currentUser = null;
      return nextState;
    case RECEIVE_CURRENT_SONG:
      nextState.currentSong = action.currentSong;
      return nextState;
    case REMOVE_SONG:
      if(nextState.currentSong.id === action.songId) {
        nextState.currentSong = null;
      }
      return nextState;
    default:
      return state;
  }
}

export default sessionReducer;