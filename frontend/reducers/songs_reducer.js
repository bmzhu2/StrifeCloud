import { RECEIVE_SONG, RECEIVE_SONGS, UPDATE_SONG, REMOVE_SONG } from "../actions/songs_actions";
import merge from 'lodash/merge';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch (action.type) {
    case RECEIVE_SONG:
      return merge({}, state, { [action.song.id]: action.song });
    case RECEIVE_SONGS:
      Object.values(action.songs).forEach(song => {
        nextState[song.id] = song;
      });
      return nextState;
    case UPDATE_SONG:
      nextState = merge({}, state);
      nextState[action.song.id] = action.song;
      return nextState
    case REMOVE_SONG:
      nextState = merge({}, state);
      delete nextState[action.songId]
      return nextState;
    default:
      return state;
  }
}

export default songsReducer;