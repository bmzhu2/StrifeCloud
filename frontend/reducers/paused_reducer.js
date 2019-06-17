import { PAUSE_SONG, UNPAUSE_SONG } from '../actions/songs_actions';
import { RECEIVE_CURRENT_SONG } from '../actions/user_actions';

export default function pausedReducer(state = true, action) {
  switch (action.type) {
    case RECEIVE_CURRENT_SONG:
      return false;
    case PAUSE_SONG:
      return true;
    case UNPAUSE_SONG:
      return false;
    default:
      return state;
  }
}