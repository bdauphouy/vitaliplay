import CheckupLayout from '@/components/layouts/CheckupLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { CheckupContext } from '@/contexts/CheckupContext'

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

const Physical = () => {
  const { getPage, checkupPages } = useContext(LinksContext)

  const { checkup } = useContext(CheckupContext)

  return (
    <div>
      <Title type="3">{checkup.checkupSteps?.[0].checkupStepName}</Title>
      <div className="mt-4">
        <Subtitle type="2">
          {checkup.checkupSteps?.[0].checkupStepDescription}
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPage(checkupPages, 'pageName', 'Force').path} passHref>
          <a>
            <Cta size="xl">Continuer</Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

Physical.Layout = CheckupLayout

export default Physical
