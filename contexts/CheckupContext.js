import { fetchAPIWithToken, getToken } from '@/lib/api'
import { createContext, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { LinksContext } from './LinksContext'

export const CheckupContext = createContext()

export const CheckupContextProvider = ({ children }) => {
  const [checkup, setCheckup] = useState({})

  const router = useRouter()

  const { getPage, otherPages } = useContext(LinksContext)

  useEffect(() => {
    const fetchCheckup = async () => {
      const data = await fetchAPIWithToken('/bilan', getToken())

      if (!data) {
        router.push(getPage(otherPages, 'pageName', 'Connexion').path)
        return
      }

      setCheckup(data)
    }

    fetchCheckup()
  }, [])

  return (
    <CheckupContext.Provider value={{ checkup }}>
      {children}
    </CheckupContext.Provider>
  )
}
