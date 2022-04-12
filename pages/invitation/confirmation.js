import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'
import useConfetti from '@/hooks/useConfetti'

export const getStaticProps = async () => {
  const invitation = await fetchAPI('/inscription-connexion')

  return { props: { invitation }, revalidate: 10 }
}

const InvitationConfirm = ({ invitation }) => {
  const congratsSize = useCongratsSize()

  const { getPage, surveyPages } = useContext(LinksContext)

  const confetti = useConfetti()
  const buttonSize = useButtonSize()

  useEffect(() => {
    confetti()
  }, [confetti])

  return (
    <div className="absolute left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center px-6 md:px-24 lg:max-w-3xl">
      <div className="mb-6 lg:mb-10">
        <Congrats size={congratsSize} />
      </div>
      <Title center={true} type="3">
        Bienvenue parmis nous !
      </Title>
      <div className="mt-4">
        <Subtitle center={true} type="2">
          {invitation.inscription_wellcome}
        </Subtitle>
      </div>
      <div className="mt-8 lg:mt-12">
        <Link href={getPage(surveyPages, 'pageName', 'Questionnaire').path}>
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
