import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { useContext } from 'react'

const LoginConfirm = () => {
  const buttonSize = useButtonSize()

  const { getPathByPage } = useContext(LinksContext)

  return (
    <div className="flex flex-col items-center lg:w-4/5">
      <Title center={true}>Bon retour parmis nous !</Title>
      <div className="mt-4">
        <Subtitle center={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPathByPage('Accueil')} passHref>
          <a>
            <Cta size={buttonSize} type="primary">
              Accéder à Vitaliplay
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

LoginConfirm.Layout = LoginLayout

export default LoginConfirm
