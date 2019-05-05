export const fetch = id => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  })
)