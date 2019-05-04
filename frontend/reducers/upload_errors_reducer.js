import { RECEIVE_UPLOAD_ERRORS, CLEAR_UPLOAD_ERRORS } from '../actions/songs_actions';

const uploadErrorsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_UPLOAD_ERRORS:
      return Object.assign({}, { errors: action.errors });
    case CLEAR_UPLOAD_ERRORS:
      return { errors: null };
    default:
      return state;
  }
}

export default uploadErrorsReducer;