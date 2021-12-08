import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CheckupContext } from '@/contexts/CheckupContext'

const Checkup = () => {
  const { prefix } = useContext(CheckupContext)

  const router = useRouter()

  useEffect(() => {
    router.push(`${prefix}/physical`)
  }, [])

  return <></>
}

export default Checkup
