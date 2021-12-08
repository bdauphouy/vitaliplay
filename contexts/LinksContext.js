import { createContext, useState } from 'react'

export const LinksContext = createContext()

export const LinksContextProvider = ({ children }) => {
  const getPathByPage = page => {
    let path = null

    internalLinks.map(internalLinks => {
      if (internalLinks.page === page) {
        path = internalLinks.path
      }
    })

    return path
  }

  const getNavByPath = path => {
    let nav = false

    internalLinks.map(internalLinks => {
      if (internalLinks.path === path) {
        nav = internalLinks.nav
      }
    })

    return nav
  }

  const [internalLinks, setInternalLinks] = useState([
    { page: 'Accueil', path: '/', nav: true },
    { page: 'Notre solution', path: '/notre-solution', auth: false, nav: true },
    { page: 'Abonnement', path: '/abonnement', auth: false, nav: true },
    { page: 'Contact', path: '/contact', auth: false, nav: true },
    { page: 'En direct', path: '/en-direct', auth: true, nav: true },
    { page: 'Séances', path: '/seances', auth: true, nav: true },
    {
      page: 'Conférences de santé',
      path: '/conferences-de-sante',
      auth: true,
      nav: true,
    },
    {
      page: 'Mon espace santé',
      path: '/mon-espace-sante',
      auth: true,
      nav: true,
    },
    { page: 'Mentions légales', path: '/mentions-legales', nav: false },
    {
      page: "Conditions d'utilisation",
      path: '/conditions-d-utilisation',
      nav: false,
    },
    { page: 'Inscription', path: '/signup', nav: false },
    { page: 'Connexion', path: '/login', nav: false },
    { page: 'Invitation', path: '/invitation', nav: false },
    { page: 'Questionnaire', path: '/survey', nav: false },
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
        getPathByPage,
        getNavByPath,
        authNavLinks,
        notAuthNavLinks,
      }}>
      {children}
    </LinksContext.Provider>
  )
}
