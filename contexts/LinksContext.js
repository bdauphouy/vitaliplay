import { createContext, useState } from 'react'

export const LinksContext = createContext()

export const LinksContextProvider = ({ children }) => {
  const getPath = page => {
    let path = null

    Object.values(internalLinks).map(internalLink => {
      if (internalLink.page === page) {
        path = internalLink.path
      }
    })

    return path
  }

  const [internalLinks, setInternalLinks] = useState({
    home: { page: 'Accueil', path: '/' },
    ourSolution: { page: 'Notre solution', path: '/notre-solution' },
    subscription: { page: 'Abonnement', path: '/abonnement' },
    contact: { page: 'Contact', path: '/contact' },
    onLive: { page: 'En direct', path: '/en-direct' },
    sessions: { page: 'Séances', path: '/seances' },
    healthConferences: {
      page: 'Conférences de santé',
      path: '/conferences-de-sante',
    },
    myHealthSpace: { page: 'Mon espace santé', path: '/mon-espace-sante' },
    legalNotice: { page: 'Mentions légales', path: '/mentions-legales' },
    termsOfUse: {
      page: "Conditions d'utilisation",
      path: '/conditions-d-utilisation',
    },
  })

  const [externalLinks, setExternalLinks] = useState({
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    synerghetic: 'https://synerghetic.net',
  })

  return (
    <LinksContext.Provider
      value={{
        internalLinks,
        setInternalLinks,
        externalLinks,
        setExternalLinks,
        getPath,
      }}>
      {children}
    </LinksContext.Provider>
  )
}
