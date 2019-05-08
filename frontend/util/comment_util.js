export const addComment = comment => {
  return $.ajax({
    method: 'POST',
    url: `/api/songs/${comment.comment.song_id}/comments`,
    data: comment
  })
}

export const deleteComment = comment => (
  $.ajax({
    method: 'DELETE',
    url: `/api/songs/${comment.song_id}/comments/${comment.id}`
  })
)