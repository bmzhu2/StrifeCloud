import { UPDATE_SONG_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default function updateReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_SONG_MODAL:
      return action.song;
    case CLOSE_MODAL:
      return {}
    default:
      return state;
  }
}