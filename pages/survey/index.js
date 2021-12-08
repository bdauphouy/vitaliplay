import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { SurveyContext } from '@/contexts/SurveyContext'

const Survey = () => {
  const router = useRouter()

  const { prefix, getPathById } = useContext(SurveyContext)

  useEffect(() => {
    router.push(
      `${prefix}${getPathById(
        parseInt(window.localStorage.getItem('vitaliplay.survey.activeStep')),
      )}`,
    )
  }, [])

  return <></>
}

export default Survey
