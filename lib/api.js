export const getStrapiURL = (path = '') => {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`
}

export const fetchAPI = async path => {
  const res = await fetch(getStrapiURL(path))
  const data = await res.json()
  return data
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
  return data?.attributes
}
