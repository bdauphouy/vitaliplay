import { getStrapiURL } from './api'

export const getStrapiMedia = (media) => {
  if (!media) return '/'

  const imageUrl = media?.url.startsWith('/')
    ? getStrapiURL(media.url, 'media')
    : media?.url
  return imageUrl
}
