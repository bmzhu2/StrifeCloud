import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_RECENTLY_PLAYED } from "../actions/user_actions";
import { RECEIVE_SONG, RECEIVE_SONGS } from '../actions/songs_actions';
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
    case RECEIVE_SONGS:
      if(action.songs.users) {
        Object.values(action.songs.users).forEach(user => {
          nextState[user.id] = user;
        });
      }
      return nextState;
    case RECEIVE_RECENTLY_PLAYED:
      Object.values(action.result.users).forEach(user => {
        nextState[user.id] = user;
      });
      return nextState;
    default:
      return state;
  }
}

export default userReducer;