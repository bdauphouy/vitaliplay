import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (document.cookie.includes('jwt')) {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    console.log(isAuth)
  }, [isAuth])

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
