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
export const getToken = ()=>{
    if(document?.cookie.includes("jwt=")){
        return document.cookie.replace("jwt=","")
    }
    return ""
}
export const fetchAPIWithToken = async (path, token) => {
  const res = await fetch(`${getStrapiURL(path)}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token
    },
})
const data = await res.json()
return data
}

export const postAPIWithToken = async (path, body, token) => {
    const res = await fetch(getStrapiURL(path), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token
    },
    body: JSON.stringify(body),
  })
  const data = res.json()
  return data
}
