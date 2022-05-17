import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SurveyLayout from '@/components/layouts/SurveyLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useContext } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'
import { SurveyContext } from '@/contexts/SurveyContext'
import { fetchAPIWithToken } from '@/lib/api'

export const getServerSideProps = async ({ req, query }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const paid = await fetchAPIWithToken(
    '/users/me/subscription',
    req.cookies.jwt,
    false
  )

  if (!(paid.status === 'finalized' || paid.status === 'paid')) {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

const SurveySuccess = () => {
  const { getPage, accountPages } = useContext(LinksContext)

  const { survey } = useContext(SurveyContext)

  const buttonSize = useButtonSize()
  const congratsSize = useCongratsSize()

  return (
    <div className="flex h-full flex-col items-center justify-center xl:pl-24">
      <div className="mb-6 lg:mb-10">
        <Congrats size={congratsSize} />
      </div>
      <Title center={true} type="3">
        Félicitation, profitez dès à présent de Vitaliplay
      </Title>
      <div className="mt-4">
        <Subtitle center={true} type="2">
          {survey.questionnaire_success}
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPage(accountPages, 'pageName', 'Accueil').path} passHref>
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

SurveySuccess.Layout = SurveyLayout

export default SurveySuccess
