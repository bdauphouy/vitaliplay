import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Root = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/site')
  }, [])

  return <></>
}

export default Root
