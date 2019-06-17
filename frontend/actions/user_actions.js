import * as UserAPIUtil from '../util/user_util';

export const RECEIVE_CURRENT_SONG = "RECEIVE_CURRENT_SONG";
export const RECEIVE_RECENTLY_PLAYED = "RECEIVE_RECENTLY_PLAYED";
export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_FETCH_ERRORS = 'RECEIVE_FETCH_ERRORS';

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})

const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
})

const receiveCurrentSong = result => ({
  type: RECEIVE_CURRENT_SONG,
  result
});

const receiveRecentlyPlayed = result => ({
  type: RECEIVE_RECENTLY_PLAYED,
  result
})

const receiveErrors = errors => ({
  type: RECEIVE_FETCH_ERRORS,
  errors
});

export const fetchUser = id => dispatch => (
  UserAPIUtil.fetch(id).then(user => dispatch(receiveUser(user)),
    err => dispatch(receiveErrors(err.responseJSON)))
)

export const updateUser = ({user, id}) => dispatch => (
  UserAPIUtil.updateUser(user, id).then(user => dispatch(receiveUser(user)),
    err => dispatch(receiveErrors(err.responseJSON)))
)

export const searchUsers = query => dispatch => (
  UserAPIUtil.search(query).then(users => dispatch(receiveUsers(users)),
    err => dispatch(receiveRouteErrors(err.responseJSON)))
)

export const play = (song, userId) => dispatch => (
  UserAPIUtil.play(song.id, userId).then(result => dispatch(receiveCurrentSong(result)))
)

export const recents = userId => dispatch => (
  UserAPIUtil.recents(userId).then(result => dispatch(receiveRecentlyPlayed(result)))
)