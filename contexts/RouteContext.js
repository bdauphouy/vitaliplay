import { createContext, useState } from 'react'
import { useRouter } from 'next/router'

export const RouteContext = createContext()

export const RouteContextProvider = ({ children }) => {
  const router = useRouter()
  const [page, setPage] = useState('')

  return (
    <RouteContext.Provider value={{ route: router.route, page, setPage }}>
      {children}
    </RouteContext.Provider>
  )
}
