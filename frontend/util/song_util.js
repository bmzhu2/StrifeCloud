export const play = id => (
  $.ajax({
    method: 'GET',
    url: `/api/songs/${id}`
  })
)

export const fetch = id => (
  $.ajax({
    method: 'GET',
    url: `/api/songs/${id}`
  })
)

export const upload = song => (
  $.ajax({
    method: 'POST',
    url: '/api/songs',
    data: song,
    contentType: false,
    processData: false
  })
)

export const update = song => (
  $.ajax({
    method: 'PATCH',
    url: `/api/songs/${song.id}`,
    data: {song}
  })
)

export const remove = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/songs/${id}`,
  })
)