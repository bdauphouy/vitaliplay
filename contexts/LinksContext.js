import { createContext, useState } from 'react'

export const LinksContext = createContext()

export const LinksContextProvider = ({ children }) => {
  const getPath = page => {
    let path = null

    internalLinks.map(internalLinks => {
      if (internalLinks.page === page) {
        path = internalLinks.path
      }
    })

    return path
  }

  const [internalLinks, setInternalLinks] = useState([
    { page: 'Accueil', path: '/' },
    { page: 'Notre solution', path: '/notre-solution', auth: false },
    { page: 'Abonnement', path: '/abonnement', auth: false },
    { page: 'Contact', path: '/contact', auth: false },
    { page: 'En direct', path: '/en-direct', auth: true },
    { page: 'Séances', path: '/seances', auth: true },
    {
      page: 'Conférences de santé',
      path: '/conferences-de-sante',
      auth: true,
    },
    {
      page: 'Mon espace santé',
      path: '/mon-espace-sante',
      auth: true,
    },
    { page: 'Mentions légales', path: '/mentions-legales', nav: false },
    {
      page: "Conditions d'utilisation",
      path: '/conditions-d-utilisation',
      nav: false,
    },
  ])

  const [externalLinks, setExternalLinks] = useState({
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/',
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    synerghetic: 'https://synerghetic.net',
  })

  const [authNavLinks] = useState(
    internalLinks.filter(internalLink => {
      return internalLink.auth !== false && internalLink.nav !== false
    }),
  )

  const [notAuthNavLinks] = useState(
    internalLinks.filter(internalLink => {
      return internalLink.auth !== true && internalLink.nav !== false
    }),
  )

  return (
    <LinksContext.Provider
      value={{
        internalLinks,
        setInternalLinks,
        externalLinks,
        setExternalLinks,
        getPath,
        authNavLinks,
        notAuthNavLinks,
      }}>
      {children}
    </LinksContext.Provider>
  )
}
