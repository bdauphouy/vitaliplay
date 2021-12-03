import Image from 'next/image'
import login from '@/public/login.jpeg'

const LoginLayout = ({ children }) => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="h-screen xl:w-2/5 relative">
          <Image
            src={login}
            alt="login"
            placeholder="blur"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col justify-center h-full px-6 md:px-24 mt-32 pb-20 lg:pb-0 xl:pr-60">
          {children}
        </div>
      </div>
    </>
  )
}

export default LoginLayout
