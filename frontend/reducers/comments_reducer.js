import { RECEIVE_SONG } from "../actions/songs_actions";
import {RECEIVE_COMMENT, DELETE_COMMENT} from '../actions/comment_actions';
import merge from 'lodash/merge';

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = merge({}, state)
  switch (action.type) {
    case RECEIVE_COMMENT:
      nextState[action.comment.id] = action.comment;
      return nextState;
    case DELETE_COMMENT:
      delete nextState[action.commentId]
      return nextState;
    case RECEIVE_SONG: 
      const fromNullState = {}

      if(action.song.comments) {
        Object.values(action.song.comments).forEach(comment => {
          fromNullState[comment.id] = comment;
        });
      }
      return fromNullState;
    default:
      return state;
  }
}

export default commentsReducer;