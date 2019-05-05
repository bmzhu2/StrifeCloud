import { RECEIVE_ROUTE_ERRORS, CLEAR_ROUTE_ERRORS } from '../actions/songs_actions';

const songRouteErrorsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ROUTE_ERRORS:
      return Object.assign({}, { errors: action.errors });
    case CLEAR_ROUTE_ERRORS:
      return { errors: null };
    default:
      return state;
  }
}

export default songRouteErrorsReducer;