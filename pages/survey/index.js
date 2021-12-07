import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { SurveyContext } from '@/contexts/SurveyContext'

const Survey = () => {
  const router = useRouter()

  const { prefix, activeStep, getPathById } = useContext(SurveyContext)

  useEffect(() => {
    console.log(activeStep)
    router.push(
      `${prefix}${getPathById(
        parseInt(window.localStorage.getItem('vitaliplay.survey.activeStep')),
      )}`,
    )
  }, [])

  return <></>
}

export default Survey
