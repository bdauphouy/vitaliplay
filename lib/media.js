import { getStrapiURL } from './api'

export const getStrapiMedia = media => {
  const imageUrl = media.url.startsWith('/')
    ? getStrapiURL(media.url)
    : media.url
  return imageUrl
}
