import { createContext, useState } from 'react'

export const CustomContext = createContext()

export const CustomContextProvider = ({ children }) => {
  const [text, setText] = useState('Nice')

  return (
    <CustomContext.Provider value={{ text, setText }}>
      {children}
    </CustomContext.Provider>
  )
}
