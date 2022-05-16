import { LinksContext } from '@/contexts/LinksContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useEffect } from 'react'
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

const ProfileHealthInformation = () => {
  const router = useRouter()

  const { getPage, accountPages } = useContext(LinksContext)

  useEffect(() => {
    router.push(getPage(accountPages, 'pageName', 'Mon espace santé').path)
  }, [])

  return <></>
}

export default ProfileHealthInformation
