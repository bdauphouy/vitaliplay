import Image from 'next/image'
import login from '@/public/login.jpeg'

const LoginLayout = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="min-h-screen xl:w-1/3 relative">
          <Image
            src={login}
            alt="login"
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-full flex flex-col min-h-screen justify-center px-6 md:px-24 py-28 lg:py-0 lg:mt-0">
          {children}
        </div>
      </div>
    </>
  )
}

export default LoginLayout
