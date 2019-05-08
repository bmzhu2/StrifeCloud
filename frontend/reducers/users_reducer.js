import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USER } from "../actions/user_actions";
import { RECEIVE_SONG } from '../actions/songs_actions';
import merge from 'lodash/merge';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = merge({}, state)

  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.id]: action.user })
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser })
    case RECEIVE_SONG:
      Object.values(action.song.users).forEach(user => {
        nextState[user.id] = user;
      });
      return nextState;
    default:
      return state;
  }
}

export default userReducer;