import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import CheckupLayout from '@/components/layouts/CheckupLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'
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
  const [successData, setSuccessData] = useState('')

  const { getPage, accountPages } = useContext(LinksContext)
  const { checkup } = useContext(CheckupContext)

  useEffect(() => {
    setSuccessData(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkup.score'))
    )
  }, [])

  const resetLocalStorage = () => {
    window.localStorage.removeItem('vitaliplay.checkup.score')
    window.localStorage.removeItem('vitaliplay.checkup.store')
    window.localStorage.removeItem('vitaliplay.checkup.activeStep')
  }

  const congratsSize = useCongratsSize()

  const buttonSize = useButtonSize()

  return (
    <div className="flex h-full flex-col items-center justify-center xl:pl-24">
      <div className="mb-6 lg:mb-10">
        <Congrats size={congratsSize} />
      </div>
      <Title center={true} type="3">
        {checkup.checkupSucceedTitle?.replace(
          '{{score}}',
          successData.globalScore
        )}
      </Title>
      <div className="mt-4">
        <Subtitle center={true} type="2">
          {checkup.checkupSucceedDescription}
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link
          href={`/compte/mon-espace-sante/bilans/${successData.id}`}
          passHref
        >
          <a onClick={() => resetLocalStorage()}>
            <Cta size={buttonSize} type="primary">
              Voir mon bilan
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

SurveySuccess.Layout = CheckupLayout

export default SurveySuccess
