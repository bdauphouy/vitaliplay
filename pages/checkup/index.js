import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { CheckupContext } from '@/contexts/CheckupContext'

const Checkup = () => {
  const { prefix, getPathByIds } = useContext(CheckupContext)

  const router = useRouter()

  useEffect(() => {
    let activeStep = window.localStorage.getItem(
      'vitaliplay.checkup.activeStep',
    )

    if (!activeStep) {
      window.localStorage.setItem('vitaliplay.checkup.activeStep', '1,0')
      activeStep = window.localStorage.getItem('vitaliplay.checkup.activeStep')
    }

    activeStep = activeStep.split(',').map(i => parseInt(i))

    router.push(`${prefix}${getPathByIds(activeStep)}`)
  }, [])

  return <></>
}

export default Checkup
