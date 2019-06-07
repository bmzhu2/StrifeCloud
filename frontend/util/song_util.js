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

export const search = query => (
  $.ajax({
    method: 'GET',
    url: '/api/songs/search',
    dataType: 'json',
    data: {
      query: `${query}`
    }
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

export const update = (song, id) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/songs/${id}`,
    data: song,
    contentType: false,
    processData: false
  })
}

export const remove = id => (
  $.ajax({
    method: 'DELETE',
    url: `/api/songs/${id}`
  })
)