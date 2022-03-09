import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'

const Survey = () => {
  const router = useRouter()

  const { getPage, surveyPages } = useContext(LinksContext)

  useEffect(() => {
    let activeStep = window.localStorage.getItem('vitaliplay.survey.activeStep')

    if (!activeStep) {
      window.localStorage.setItem('vitaliplay.survey.activeStep', '1')
      activeStep = window.localStorage.getItem('vitaliplay.survey.activeStep')
    }

    if (!window.localStorage.getItem('vitaliplay.survey.store')) {
      window.localStorage.setItem('vitaliplay.survey.store', JSON.stringify({}))
    }

    router.push(getPage(surveyPages, 'id', parseInt(activeStep)).path)
  }, [])

  return <></>
}

export default Survey
