import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'

const SignupConfirm = () => {
  const { getPathByPage } = useContext(LinksContext)

  const router = useRouter()

  const buttonSize = useButtonSize()

  return (
    <div className="flex flex-col items-center w-full px-6 md:px-24 lg:max-w-3xl absolute left-1/2 transform -translate-x-1/2">
      <Title center={true} type="3">
        Félicitations, vous êtes bien inscrit sur Vitaliplay
      </Title>
      <div className="mt-4">
        <Subtitle center={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="flex mt-12 gap-6 flex-wrap justify-center">
        <Link href={getPathByPage('Abonnements')} passHref>
          <a>
            <Cta size={buttonSize} type="primary">
              S'abonner à Vitaliplay
            </Cta>
          </a>
        </Link>
        <Link href={getPathByPage('Invitation')} passHref>
          <a>
            <Cta size={buttonSize} type="secondary">
              J'ai un code d'invitation
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

SignupConfirm.Layout = LoginLayout

export default SignupConfirm
