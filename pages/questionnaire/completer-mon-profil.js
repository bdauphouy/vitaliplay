import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import SurveyLayout from '@/components/layouts/SurveyLayout'
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

  if (paid.status !== 'finalized') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

const SurveySignup = () => {
  const buttonSize = useButtonSize()

  const { survey } = useContext(SurveyContext)

  const { getPage, surveyPages } = useContext(LinksContext)

  return (
    <div>
      <Title type="3">{survey.completeProfileTitle}</Title>
      <div className="mt-4">
        <Subtitle type="2">{survey.completeProfileDescription}</Subtitle>
      </div>
      <div className="mt-10 flex flex-wrap items-start gap-4 lg:gap-6">
        <Link
          href={getPage(surveyPages, 'pageName', 'Mensurations').path}
          passHref
        >
          <a>
            <Cta type="primary" size={buttonSize}>
              Compléter mon profil
            </Cta>
          </a>
        </Link>
        <Cta type="secondary" size={buttonSize}>
          Passer
        </Cta>
      </div>
    </div>
  )
}

SurveySignup.Layout = SurveyLayout

export default SurveySignup
