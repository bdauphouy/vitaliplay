import { fetchAPIWithToken, postAPIWithToken, getToken } from '@/lib/api'
import { createContext, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { LinksContext } from './LinksContext'
import { AuthContext } from './AuthContext'

export const CheckoutContext = createContext()

export const CheckoutContextProvider = ({ children }) => {
  const [checkout, setCheckout] = useState({})

  const router = useRouter()

  const { getPage, otherPages } = useContext(LinksContext)
  const { isAuth } = useContext(AuthContext)

  console.log(isAuth)

  useEffect(() => {
    // if (!isAuth) {
    //   router.push(getPage(otherPages, 'pageName', 'Connexion').path)
    // }
  }, [])

  useEffect(() => {
    const checkoutData = window.localStorage.getItem(
      'vitaliplay.checkout.checkoutData'
    )

    if (!checkoutData) {
      window.localStorage.setItem(
        'vitaliplay.checkout.checkoutData',
        JSON.stringify(checkout)
      )
    }
  }, [checkout])

  return (
    <CheckoutContext.Provider value={{ checkout, setCheckout }}>
      {children}
    </CheckoutContext.Provider>
  )
}
