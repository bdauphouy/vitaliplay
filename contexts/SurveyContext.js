import { createContext, useState } from 'react'

export const SurveyContext = createContext()

export const SurveyContextProvider = ({ children }) => {
  const [store, setStore] = useState({})
  const [prefix] = useState('/survey')

  const [surveySteps] = useState([
    { id: 1, step: 'Inscription', path: '/signup' },
    { id: 2, step: 'Mensuration', path: '/measurements' },
    { id: 3, step: 'Fumeur', path: '/smoker' },
    { id: 4, step: 'Douleurs chroniques', path: '/pain' },
    { id: 5, step: 'Affection longue durée', path: '/affection' },
    { id: 6, step: 'Prothèse articulaire', path: '/prosthesis' },
    { id: 7, step: 'Succès', path: '/success', hidden: true },
  ])

  const getPathById = id => {
    let path = null

    surveySteps.map(surveyStep => {
      if (surveyStep.id === id) {
        path = surveyStep.path
      }
    })

    return path
  }

  const getPathByStep = step => {
    let path = null

    surveySteps.map(surveyStep => {
      if (surveyStep.step === step) {
        path = surveyStep.path
      }
    })

    return path
  }

  const getIdByStep = step => {
    let id = null

    surveySteps.map(surveyStep => {
      if (surveyStep.step === step) {
        id = surveyStep.id
      }
    })

    return id
  }

  const getIdByPath = path => {
    let id = null

    surveySteps.map(surveyStep => {
      if (surveyStep.path === path) {
        id = surveyStep.id
      }
    })

    return id
  }

  return (
    <SurveyContext.Provider
      value={{
        store,
        setStore,
        prefix,
        getPathById,
        getIdByStep,
        getIdByPath,
        getPathByStep,
        surveySteps,
      }}>
      {children}
    </SurveyContext.Provider>
  )
}
