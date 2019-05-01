// import { RECEIVE_CURRENT_SONG } from "../actions/songs_actions";
import merge from 'lodash/merge';

const songsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    // case RECEIVE_SONG:
    //   return merge({}, state, { [action.song.id]: action.song });
    // case RECEIVE_SONGS:
    //   const nextState = {};
    //   Object.values(action.songs).forEach(song => {
    //     nextState[song.id] = song;
    //   });
    //   return nextState;
    default:
      return state;
  }
}

export default songsReducer;