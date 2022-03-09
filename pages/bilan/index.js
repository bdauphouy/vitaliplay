import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { LinksContext } from '@/contexts/LinksContext'

const Checkup = () => {
  const { getPage, checkupPages } = useContext(LinksContext)

  const router = useRouter()

  useEffect(() => {
    let activeStep = window.localStorage.getItem(
      'vitaliplay.checkup.activeStep'
    )

    if (!activeStep) {
      window.localStorage.setItem('vitaliplay.checkup.activeStep', '1.0')
      activeStep = window.localStorage.getItem('vitaliplay.checkup.activeStep')
    }

    router.push(getPage(checkupPages, 'id', activeStep)?.path)
  }, [])

  return <></>
}

export default Checkup
