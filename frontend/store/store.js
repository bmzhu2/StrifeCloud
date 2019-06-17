import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => {
  let middleware = [thunk];
  // if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
  // }
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
};

export default configureStore;