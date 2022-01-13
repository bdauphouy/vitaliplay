import { createContext, useEffect, useState, useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export const LinksContext = createContext()

export const LinksContextProvider = ({ children }) => {
  const { isAuth } = useContext(AuthContext)

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
      page: 'Abonnements',
      path: '/website/abonnements',
      rewrite: '/abonnements',
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
    {
      page: 'En direct',
      path: '/account/en-direct',
      rewrite: '/en-direct',
      auth: true,
      nav: true,
    },
    {
      page: 'Séances',
      path: '/account/seances',
      rewrite: '/seances',
      auth: true,
      nav: true,
    },
    {
      page: 'Bilan',
      path: '/account/checkup',
      rewrite: '/checkup',
      auth: true,
      nav: false,
    },
    {
      page: 'Nouveaux entraînements',
      path: '/account/seances/nouveaux-entrainements',
      rewrite: '/seances/nouveaux-entrainements',
      auth: true,
      nav: false,
    },
    {
      page: 'Conférences de santé',
      path: '/account/conferences-de-sante',
      rewrite: '/conferences-de-sante',
      auth: true,
      nav: true,
    },
    {
      page: 'Mon espace santé',
      path: '/account/mon-espace-sante',
      rewrite: '/mon-espace-sante',
      auth: true,
      nav: true,
    },
    {
      page: 'Bilans',
      path: '/account/mon-espace-sante/bilans',
      rewrite: '/mon-espace-sante/bilans',
      auth: true,
      nav: false,
    },
    {
      page: 'Profil',
      path: '/account/profil',
      rewrite: '/profil',
      auth: true,
      nav: false,
    },
    {
      page: 'Informations de santé',
      path: '/account/profil/informations-de-sante',
      rewrite: '/profil/informations-de-sante',
      auth: true,
      nav: false,
    },
    {
      page: 'Informations personnelles',
      path: '/account/profil/informations-personnelles',
      rewrite: '/profil/informations-personnelles',
      auth: true,
      nav: false,
    },
    {
      page: 'Mot de passe',
      path: '/account/profil/mot-de-passe',
      rewrite: '/profil/mot-de-passe',
      auth: true,
      nav: false,
    },
    {
      page: 'Historique',
      path: '/account/profil/historique',
      rewrite: '/profil/historique',
      auth: true,
      nav: false,
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

  useEffect(() => {
    setInternalLinks([
      ...internalLinks,
      (internalLinks[0].path = isAuth ? '/account' : '/website'),
    ])
  }, [isAuth])

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
