import * as SongAPIUtil from '../util/song_util';

export const PAUSE_SONG = "PAUSE_SONG";
export const UNPAUSE_SONG = "UNPAUSE_SONG";
export const RECEIVE_SONG = "RECEIVE_SONG";
export const RECEIVE_SONGS = "RECEIVE_SONGS";
export const UPDATE_SONG = "UPDATE_SONG";
export const REMOVE_SONG = "REMOVE_SONG";
export const RECEIVE_UPLOAD_ERRORS = "RECEIVE_UPLOAD_ERRORS";
export const CLEAR_UPLOAD_ERRORS = "CLEAR_UPLOAD_ERRORS";
export const RECEIVE_ROUTE_ERRORS = "RECEIVE_ROUTE_ERRORS";
export const CLEAR_ROUTE_ERRORS = "CLEAR_ROUTE_ERRORS";

const pauseSong = () => ({
  type: PAUSE_SONG
})

const unpauseSong = () => ({
  type: UNPAUSE_SONG
})

const receiveSong = song => ({
  type: RECEIVE_SONG,
  song
})

const receiveSongs = songs => ({
  type: RECEIVE_SONGS,
  songs
})

const updateSong = song => ({
  type: UPDATE_SONG,
  song
})

const removeSong = songId => ({
  type: REMOVE_SONG,
  songId
})

const receiveUploadErrors = errors => ({
  type: RECEIVE_UPLOAD_ERRORS,
  errors
});

const clearUploadErrors = () => ({
  type: CLEAR_UPLOAD_ERRORS,
});

const receiveRouteErrors = errors => ({
  type: RECEIVE_ROUTE_ERRORS,
  errors
})

const clearRouteErrs = () => ({
  type: CLEAR_ROUTE_ERRORS,
});

export const pause = () => dispatch => (
  dispatch(pauseSong())
)

export const unpause = () => dispatch => (
  dispatch(unpauseSong())
)

export const upload = song => dispatch => (
  SongAPIUtil.upload(song).then(song => dispatch(receiveSong(song)),
    err => dispatch(receiveUploadErrors(err.responseJSON)))
)

export const fetchSong = id => dispatch => (
  SongAPIUtil.fetch(id).then(song => dispatch(receiveSong(song)),
    err => dispatch(receiveRouteErrors(err.responseJSON)))
)

export const searchSongs = query => dispatch => (
  SongAPIUtil.search(query).then(songs => dispatch(receiveSongs(songs)),
    err => dispatch(receiveRouteErrors(err.responseJSON)))
)

export const update = ({song, id}) => dispatch => (
  SongAPIUtil.update(song, id).then(song => dispatch(updateSong(song)),
    err => dispatch(receiveUploadErrors(err.responseJSON)))
)

export const remove = id => dispatch => (
  SongAPIUtil.remove(id).then(id => dispatch(removeSong(id)),
  err => dispatch(receiveRouteErrors(err.responseJSON)))
) 

export const clearErrs = () => dispatch => (
  dispatch(clearUploadErrors())
)

export const clearRouteErrors = () => dispatch => (
  dispatch(clearRouteErrs())
)