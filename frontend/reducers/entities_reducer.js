import usersReducer from './users_reducer';
import songsReducer from './songs_reducer';
import commentsReducer from './comments_reducer';
import searchedUsersReducer from './searched_users_reducer.js';

import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songsReducer,
  comments: commentsReducer,
  searchedUsers: searchedUsersReducer
});

export default entitiesReducer;