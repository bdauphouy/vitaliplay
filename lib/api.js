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

export const getUserData = async (token) => {
  const res = await fetch(`${getStrapiURL('/users/me')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })

  const data = await res.json()

  return data
}

export const getUserProfilePicture = async (token) => {
  const res = await fetch(`${getStrapiURL('/users/me/profile-picture')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })

  const convertBlobToBase64 = (blob) => {
    const reader = new FileReader()
    return new Promise((resolve) => {
      reader.readAsDataURL(blob)
      reader.addEventListener('loadend', () => {
        const profilePicture = reader.result
        resolve(profilePicture)
      })
    })
  }

  if (res.status === 200) {
    const profilePictureBlob = await res.blob()

    const profilePicture = await convertBlobToBase64(profilePictureBlob)

    return {
      profilePicture,
    }
  } else {
    const { firstname, lastname } = await getUserData(token)

    return {
      profilePicture: `https://ui-avatars.com/api/?name=${firstname}+${lastname}&size=512`,
    }
  }
}

export const postProfilePicture = async (file, token) => {
  const formData = new FormData()
  formData.append('file', file)

  await fetch(getStrapiURL('/users/me/profile-picture'), {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    method: 'POST',
    body: formData,
  })
}

export const getUserSavedCards = async (token) => {
  const res = await fetch(`${getStrapiURL('/users/me/saved-cards')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
  const data = await res.json()
  return data.paymentMethods
}

export const fetchAPIWithToken = async (
  path,
  token,
  attributes = true,
  populate
) => {
  let url = `${getStrapiURL(path)}?`

  populate?.forEach((key) => {
    url += `[populate][${key}][populate]=*&`
  })

  const res = await fetch(url, {
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

export const addReminder = async (liveId, token) => {
  const res = await fetch(
    getStrapiURL(`/users/me/live-reminders?liveId=${liveId}`),
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  )

  const data = res.json()

  return data
}

export const getReminders = async (token) => {
  const res = await fetch(getStrapiURL(`/users/me/live-reminders`), {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

  const data = res.json()

  return data
}

export const deleteReminder = async (reminderId) => {
  const res = await fetch(
    getStrapiURL(`/users/me/live-reminders/${reminderId}`),
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  )

  const data = res.json()

  return data
}
