import usersReducer from './users_reducer';
import songsReducer from './songs_reducer';

import { combineReducers } from 'redux';

const entitiesReducer = combineReducers({
  users: usersReducer,
  songs: songsReducer
});

export default entitiesReducer;