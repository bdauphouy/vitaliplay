import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
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

const Survey = () => {
  const router = useRouter()

  const { getPage, surveyPages } = useContext(LinksContext)

  useEffect(() => {
    let activeStep = window.localStorage.getItem('vitaliplay.survey.activeStep')

    if (!activeStep) {
      window.localStorage.setItem('vitaliplay.survey.activeStep', '1')
      activeStep = window.localStorage.getItem('vitaliplay.survey.activeStep')
    }

    if (!window.localStorage.getItem('vitaliplay.survey.store')) {
      window.localStorage.setItem('vitaliplay.survey.store', JSON.stringify({}))
    }

    router.push(getPage(surveyPages, 'id', parseInt(activeStep)).path)
  }, [])

  return <></>
}

export default Survey
