import Image from 'next/image'
import login from '@/public/login.jpeg'
import CloseNav from '@/components/utils/CloseNav'

const LoginLayout = ({ children }) => {
  return (
    <>
      <CloseNav />
      <div className="flex min-h-screen">
        <div className="relative min-h-screen xl:w-1/3">
          <Image
            src={login}
            alt="login"
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative flex min-h-screen w-full flex-col justify-center px-6 py-28 md:px-24 lg:mt-0 lg:py-0">
          {children}
        </div>
      </div>
    </>
  )
}

export default LoginLayout
