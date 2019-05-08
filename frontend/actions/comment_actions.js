import * as CommentAPIUtil from '../util/comment_util'

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

const receiveComment = comment => ({
  type: RECEIVE_COMMENT,
  comment
});

const removeComment = commentId => ({
  type: DELETE_COMMENT,
  commentId
})

export const addComment = comment => dispatch => (
  CommentAPIUtil.addComment(comment).then(comment => dispatch(receiveComment(comment)))
)

export const deleteComment = comment => dispatch => (
  CommentAPIUtil.deleteComment(comment).then(commentId => dispatch(removeComment(commentId)))
)