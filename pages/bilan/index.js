import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
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

const Checkup = () => {
  const { getPage, checkupPages } = useContext(LinksContext)

  const router = useRouter()

  useEffect(() => {
    let activeStep = window.localStorage.getItem(
      'vitaliplay.checkup.activeStep'
    )

    if (!activeStep) {
      window.localStorage.setItem('vitaliplay.checkup.activeStep', '1.0')
      activeStep = window.localStorage.getItem('vitaliplay.checkup.activeStep')
    }

    router.push(getPage(checkupPages, 'id', activeStep)?.path)
  }, [])

  return <></>
}

export default Checkup
