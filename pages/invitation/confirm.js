import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'

const InvitationConfirm = () => {
  const buttonSize = useButtonSize()

  const { getPathByPage } = useContext(LinksContext)

  return (
    <div className="flex flex-col items-center lg:w-4/5">
      <Title center={true}>Bienvenue parmis nous !</Title>
      <div className="mt-4">
        <Subtitle center={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPathByPage('Questionnaire')}>
          <a>
            <Cta size={buttonSize} type="primary">
              Compléter mon profil
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

InvitationConfirm.Layout = LoginLayout

export default InvitationConfirm
