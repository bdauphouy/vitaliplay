import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'

const SignupConfirm = () => {
  const { getPathByPage } = useContext(LinksContext)

  const router = useRouter()

  const buttonSize = useButtonSize()

  return (
    <div className="flex flex-col items-center lg:w-4/5">
      <Title center={true}>
        Félicitations, vous êtes bien inscrit sur Vitaliplay
      </Title>
      <div className="mt-4">
        <Subtitle center={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="flex mt-12 gap-6 flex-wrap justify-center">
        <Cta size={buttonSize} type="primary">
          S'abonner à Vitaliplay
        </Cta>
        <div onClick={() => router.push(getPathByPage('Invitation'))}>
          <Cta size={buttonSize} type="secondary">
            J'ai un code d'invitation
          </Cta>
        </div>
      </div>
    </div>
  )
}

SignupConfirm.Layout = LoginLayout

export default SignupConfirm
