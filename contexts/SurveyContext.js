import { createContext, useState } from 'react'

export const SurveyContext = createContext()

export const SurveyContextProvider = ({ children }) => {
  const [store, setStore] = useState({})

  return (
    <SurveyContext.Provider value={{ store, setStore }}>
      {children}
    </SurveyContext.Provider>
  )
}
