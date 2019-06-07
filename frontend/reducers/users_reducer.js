import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
import { RECEIVE_SONG } from '../actions/songs_actions';
import merge from 'lodash/merge';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = merge({}, state)

  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.user.user.id]: action.user.user })
    case RECEIVE_USERS:
      Object.values(action.users).forEach(user => {
        nextState[user.id] = user;
      });
      return nextState;
    case RECEIVE_CURRENT_USER:
      return merge({}, state, { [action.currentUser.user.id]: action.currentUser.user })
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