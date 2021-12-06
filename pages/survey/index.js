import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Survey = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/survey/signup')
  }, [])

  return <></>
}

export default Survey
