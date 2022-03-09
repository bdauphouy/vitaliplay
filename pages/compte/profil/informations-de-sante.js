import { LinksContext } from '@/contexts/LinksContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useEffect } from 'react'

const ProfileHealthInformation = () => {
  const router = useRouter()

  const { getPage, accountPages } = useContext(LinksContext)

  useEffect(() => {
    router.push(getPage(accountPages, 'pageName', 'Mon espace santé').path)
  }, [])

  return <></>
}

export default ProfileHealthInformation
