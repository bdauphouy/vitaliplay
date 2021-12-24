import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const router = useRouter()

  const [isAuth, setIsAuth] = useState(router.asPath.slice(2) === 'auth=true')

  const [cookies, setCookies] = useState([])

  useEffect(() => {
    if (document.cookie === '') {
      document.cookie = `auth=${prompt('auth') === 'true'}`
    }
    setCookies(
      document.cookie.split(';').map(cookie => {
        return {
          [cookie.split('=')[0]]: cookie.split('=')[1],
        }
      }),
    )
  }, [])

  useEffect(() => {
    setIsAuth(cookies[0]?.auth === 'true')
  }, [cookies])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
