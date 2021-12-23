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

  const getRewriteByPage = page => {
    let rewrite = null

    internalLinks.map(internalLinks => {
      if (internalLinks.page === page) {
        rewrite = internalLinks.rewrite
      }
    })

    return rewrite
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
    { page: 'Accueil', path: '/website', rewrite: '/', nav: true },
    {
      page: 'Notre solution',
      path: '/website/notre-solution',
      rewrite: '/notre-solution',
      auth: false,
      nav: true,
    },
    {
      page: 'Abonnement',
      path: '/website/abonnement',
      rewrite: '/abonnement',
      auth: false,
      nav: true,
    },
    {
      page: 'Contact',
      path: '/website/contact',
      rewrite: '/contact',
      auth: false,
      nav: true,
    },
    { page: 'En direct', path: '/account/en-direct', auth: true, nav: true },
    { page: 'Séances', path: '/account/seances', auth: true, nav: true },
    {
      page: 'Conférences de santé',
      path: '/account/conferences-de-sante',
      auth: true,
      nav: true,
    },
    {
      page: 'Mon espace santé',
      path: '/account/mon-espace-sante',
      auth: true,
      nav: true,
    },
    { page: 'Mentions légales', path: '/mentions-legales', nav: false },
    {
      page: "Conditions d'utilisation",
      path: '/website/conditions-d-utilisation',
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
        getRewriteByPage,
        getNavByPath,
        authNavLinks,
        notAuthNavLinks,
      }}>
      {children}
    </LinksContext.Provider>
  )
}
