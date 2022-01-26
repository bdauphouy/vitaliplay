export const getStrapiURL = (path = '', type = 'data') => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:2020'}${
    type === 'data' ? '/api' : ''
  }${path}`
}

export const fetchAPI = async (path) => {
  const res = await fetch(`${getStrapiURL(path)}?populate=*`)
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
  const data = await res.json()
  return data?.attributes
}
