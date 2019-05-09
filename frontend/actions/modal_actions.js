export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const UPDATE_SONG_MODAL = 'UPDATE_SONG_MODAL';

export const openModal = modal => ({
  type: OPEN_MODAL,
  modal
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})

export const updateSong = song => ({
  type: UPDATE_SONG_MODAL,
  song
})