import { RECEIVE_SONG, RECEIVE_SONGS, UPDATE_SONG, REMOVE_SONG } from "../actions/songs_actions";
import {RECEIVE_USER, RECEIVE_RECENTLY_PLAYED} from '../actions/user_actions';
import merge from 'lodash/merge';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = {};
  switch (action.type) {
    case RECEIVE_SONG:
      return merge({}, state, { [action.song.song.id]: action.song.song });
    case RECEIVE_SONGS:
      if(action.songs.songs) {
        Object.values(action.songs.songs).forEach(song => {
          nextState[song.id] = song;
        });
      }
      return nextState;
    case UPDATE_SONG:
      nextState = merge({}, state);
      nextState[action.song.song.id] = action.song.song;
      return nextState
    case REMOVE_SONG:
      nextState = merge({}, state);
      delete nextState[action.songId]
      return nextState;
    case RECEIVE_USER:
      if(action.user.songs) {
        Object.values(action.user.songs).forEach(song => {
          nextState[song.id] = song
        })
      }
      return nextState;
    case RECEIVE_RECENTLY_PLAYED:
      nextState = merge({}, state);
      Object.values(action.result.songs).forEach(song => {
        nextState[song.id] = song;
      })
      return nextState;
    default:
      return state;
  }
}

export default songsReducer;