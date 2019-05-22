import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => {
  let log;
  if (process.env.NODE_ENV !== 'production') {
    log = logger;
  }
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, log)
  )
};

export default configureStore;