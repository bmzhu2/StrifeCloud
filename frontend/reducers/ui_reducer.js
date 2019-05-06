import { combineReducers } from 'redux';
import modal from './modal_reducer';
import paused from './paused_reducer';

export default combineReducers({
  modal,
  paused
});