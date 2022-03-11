import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

const ProfileLogout = () => {
  const router = useRouter()

  const { setIsAuth } = useContext(AuthContext)

  useEffect(() => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.replace('/')
    setIsAuth(false)
  }, [])

  return (
    <div className="p-6 font-body text-base text-dark-900">Déconnexion...</div>
  )
}

export default ProfileLogout
