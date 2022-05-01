export const getStrapiURL = (path = '', type = 'data') => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:2020'}${
    type === 'data' ? '/api' : ''
  }${path}`
}

export const fetchAPI = async (path, populate) => {
  let url = `${getStrapiURL(path)}?`

  populate?.forEach((key) => {
    url += `[populate][${key}][populate]=*&`
  })

  const res = await fetch(url)
  const data = await res.json()
  return data?.data?.attributes
}

export const postAPI = async (path, body) => {
  const res = await fetch(getStrapiURL(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = res.json()
  return data
}

// token api
export const getToken = () => {
  const splitedCookies = document.cookie
    .split('; ')
    .find((cookie) => cookie.includes('jwt='))
    ?.replace('jwt=', '')

  if (splitedCookies) {
    return splitedCookies
  }
  return ''
}
export const fetchAPIWithToken = async (path, token, attributes = true) => {
  const res = await fetch(`${getStrapiURL(path)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const data = await res.json()
  return attributes ? data?.data?.attributes : data
}

export const postAPIWithToken = async (path, body, token) => {
  const res = await fetch(getStrapiURL(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  })
  const data = res.json()
  return data
}

export const sendAvatar = async (file, userId, token) => {
  const formData = new FormData()
  const data = {
    files: file,
    refId: userId,
    field: 'profil_picture',
    ref: 'plugin::users-permissions.user',
  }

  for (const name in data) {
    formData.append(name, data[name])
  }

  const response = await fetch(getStrapiURL('/upload'), {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: 'POST',
    body: formData,
  })

  return response
}

export const updateAPIWithToken = async (path, body, token) => {
  const res = await fetch(getStrapiURL(path), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  })
  const data = res.json()
  return data
}
