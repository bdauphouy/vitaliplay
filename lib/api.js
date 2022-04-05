export const getStrapiURL = (path = '', type = 'data') => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:2020'}${
    type === 'data' ? '/api' : ''
  }${path}`
}

export const fetchAPI = async (path) => {
  const res = await fetch(`${getStrapiURL(path)}`)
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

  console.log(splitedCookies)

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

export const sendAvatar = async (file, refId) => {
  data = {
    files: file,
    refId,
    field: 'profile_picture',
    ref: 'plugin::users-permissions.user',
  }
  const formData = new FormData()

  for (const name in data) {
    formData.append(name, data[name])
  }

  const response = await fetch(getStrapiURL('/upload'), {
    method: 'POST',
    body: formData,
  })

  return response
}
