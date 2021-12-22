import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { SurveyContext } from '@/contexts/SurveyContext'

const Survey = () => {
  const router = useRouter()

  const { prefix, getPathById } = useContext(SurveyContext)

  useEffect(() => {
    let activeStep = window.localStorage.getItem('vitaliplay.survey.activeStep')

    if (!activeStep) {
      window.localStorage.setItem('vitaliplay.survey.activeStep', '1')
      activeStep = window.localStorage.getItem('vitaliplay.survey.activeStep')
    }

    router.push(`${prefix}${getPathById(parseInt(activeStep))}`)
  }, [])

  return <></>
}

export default Survey
