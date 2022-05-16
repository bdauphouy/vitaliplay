import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import Image from 'next/image'
import AccountLayout from '@/components/layouts/AccountLayout'

const AccountDecorationLayout = ({ children }) => {
  return (
    <AccountLayout>
      <div>
        {children}
        <div className="absolute top-36 left-20 hidden lg:block">
          <Image src={orangeGreen} alt="orange-green" />
        </div>
        <div className="absolute top-48 right-20 hidden lg:block xl:right-48">
          <Image src={blueOrange} alt="blue-orange" />
        </div>
        <div className="absolute left-4 bottom-48 hidden lg:block xl:left-36 2xl:left-72">
          <Image src={greenBlue} alt="green-blue" />
        </div>
        <div className="absolute bottom-48 right-4 hidden lg:block xl:right-32">
          <Image src={yellowOrange} alt="yellow-orange" />
        </div>
      </div>
    </AccountLayout>
  )
}

export default AccountDecorationLayout
