import { LinksContext } from '@/contexts/LinksContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useEffect } from 'react'

const ProfileHealthInformation = () => {
  const router = useRouter()

  const { getRewriteByPage } = useContext(LinksContext)

  useEffect(() => {
    router.push(getRewriteByPage('Mon espace santé'))
  }, [])

  return <></>
}

export default ProfileHealthInformation
