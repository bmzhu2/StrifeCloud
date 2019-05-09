import * as UserAPIUtil from '../util/user_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_FETCH_ERRORS = 'RECEIVE_FETCH_ERRORS';

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
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