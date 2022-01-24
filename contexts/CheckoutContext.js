import { createContext, useState } from 'react'

export const CheckoutContext = createContext()

export const CheckoutContextProvider = ({ children }) => {
  const [prefix] = useState('/checkout')

  const [checkoutSteps] = useState([
    {
      id: 1,
      step: 'Première étape',
      path: '/start',
    },
    {
      id: 2,
      step: 'Informations',
      path: '/info',
    },
    {
      id: 3,
      step: 'Paiement',
      path: '/paiement',
    },
    {
      id: 4,
      step: 'Confirmation',
      path: '/confirm',
    },
    {
      id: 5,
      step: 'Succès',
      path: '/success',
    },
  ])

  const getPathByStep = step => {
    let path = null
    checkoutSteps.map(checkoutStep => {
      if (checkoutStep.step === step) {
        path = checkoutStep.path
      }
    })

    return path
  }

  const getPathById = id => {
    let path = null
    checkoutSteps.map(checkoutStep => {
      if (checkoutStep.id === id) {
        path = checkoutStep.path
      }
    })

    return path
  }

  const getIdByPath = path => {
    let id = null
    checkoutSteps.map(checkoutStep => {
      if (checkoutStep.path === path) {
        id = checkoutStep.id
      }
    })

    return id
  }

  return (
    <CheckoutContext.Provider
      value={{
        prefix,
        checkoutSteps,
        getIdByPath,
        getPathById,
        getPathByStep,
      }}>
      {children}
    </CheckoutContext.Provider>
  )
}
