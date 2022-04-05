import { fetchAPIWithToken, getToken } from '@/lib/api'
import { createContext, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { LinksContext } from './LinksContext'

export const SurveyContext = createContext()

export const SurveyContextProvider = ({ children }) => {
  const [survey, setSurvey] = useState({})

  const router = useRouter()

  const { getPage, otherPages } = useContext(LinksContext)

  useEffect(() => {
    const fetchCheckup = async () => {
      const data = await fetchAPIWithToken('/questionnaire', getToken())

      if (!data) {
        router.push(getPage(otherPages, 'pageName', 'Connexion').path)
        return
      }

      console.log(data)

      setSurvey(data)
    }

    fetchCheckup()
  }, [])

  return (
    <SurveyContext.Provider value={{ survey, setSurvey }}>
      {children}
    </SurveyContext.Provider>
  )
}
