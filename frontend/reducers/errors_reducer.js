import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import uploadErrorsReducer from './upload_errors_reducer';
import songRouteErrorsReducer from './song_route_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  upload: uploadErrorsReducer,
  songRoute: songRouteErrorsReducer
});

export default errorsReducer;