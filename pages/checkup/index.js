import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CheckupContext } from '@/contexts/CheckupContext'

const Checkup = () => {
  const { prefix, getPathByIds } = useContext(CheckupContext)

  const router = useRouter()

  useEffect(() => {
    const activeStep = window.localStorage
      .getItem('vitaliplay.checkup.activeStep')
      .split(',')
      .map(i => Number(i))
    router.push(`${prefix}${getPathByIds(activeStep)}`)
  }, [])

  return <></>
}

export default Checkup
