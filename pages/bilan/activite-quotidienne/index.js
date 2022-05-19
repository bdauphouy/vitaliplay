import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'
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

  if (paid.status !== 'paid') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

const DailyActivity = () => {
  const { getPage, checkupPages } = useContext(LinksContext)
  const { checkup } = useContext(CheckupContext)

  return (
    <div>
      <Title type="3">{checkup.checkupSteps?.[2].checkupStepName}</Title>
      <div className="mt-4">
        <Subtitle type="2">
          {checkup.checkupSteps?.[2].checkupStepDescription}
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link
          href={getPage(checkupPages, 'pageName', 'Activité intense').path}
          passHref
        >
          <a>
            <Cta size="xl">Continuer</Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

DailyActivity.Layout = CheckupLayout

export default DailyActivity
