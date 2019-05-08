import usersReducer from './users_reducer';
import songsReducer from './songs_reducer';
import commentsReducer from './comments_reducer';

import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songsReducer,
  comments: commentsReducer
});

export default entitiesReducer;