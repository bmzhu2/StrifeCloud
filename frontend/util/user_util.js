export const fetch = id => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${id}`
  })
)

export const updateUser = (user, id) => (
  $.ajax({
    method: 'PATCH',
    url: `/api/users/${id}`,
    data: user,
    contentType: false,
    processData: false
  })
)

export const search = query => (
  $.ajax({
    method: 'GET',
    url: '/api/users/search',
    dataType: 'json',
    data: {
      query: `${query}`
    }
  })
)

export const recents = userId => (
  $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/play`
  })
)

export const play = (songId, userId) => (
  $.ajax({
    method: 'POST',
    url: `/api/users/${userId}/play/${songId}`
  })
)