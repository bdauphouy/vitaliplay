import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
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

const ProfileLogout = () => {
  const router = useRouter()

  const { setIsAuth } = useContext(AuthContext)

  useEffect(() => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.replace('/')
    setIsAuth(false)
    window.localStorage.clear()
  }, [])

  return (
    <div className="p-6 font-body text-base text-dark-900">Déconnexion...</div>
  )
}

export default ProfileLogout
