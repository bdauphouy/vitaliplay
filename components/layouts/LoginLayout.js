import Image from 'next/image'
import login from '@/public/login.jpeg'
import CloseNav from '@/components/utils/CloseNav'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchAPI } from '@/lib/api'
import { getStrapiMedia } from '@/lib/media'

const LoginLayout = ({ children }) => {
  const router = useRouter()

  const [image, setImage] = useState()
  const [blurImage, setBlurImage] = useState()

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetchAPI('/content/login', ['image'])

      setImage(res.image.data.attributes)
      setBlurImage(res.image.data.attributes.formats.thumbnail)
    }

    fetchImage()
  }, [])

  return (
    <>
      <CloseNav />
      <div className="flex min-h-screen">
        <div className="relative min-h-screen xl:w-1/3">
          {image && blurImage && (
            <Image
              src={getStrapiMedia(image)}
              blurDataURL={getStrapiMedia(blurImage)}
              alt="login"
              placeholder="blur"
              layout="fill"
              objectFit="cover"
            />
          )}
        </div>
        <div className="relative flex min-h-screen w-full flex-col justify-center px-6 py-28 md:px-24 lg:mt-0 lg:py-0">
          {children}
        </div>
      </div>
    </>
  )
}

export default LoginLayout
