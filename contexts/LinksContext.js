import { createContext, useEffect, useState, useContext } from 'react'
import { AuthContext } from './AuthContext'

export const LinksContext = createContext()

export const LinksContextProvider = ({ children }) => {
  const SITE_PREFIX = ''
  const ACCOUNT_PREFIX = '/compte'
  const SURVEY_PREFIX = '/questionnaire'
  const CHECKUP_PREFIX = '/bilan'
  const CHECKOUT_PREFIX = '/paiement'

  const getPage = (pages, attribute, value) => {
    return pages.find((page) => page[attribute] === value)
  }

  const [sitePages] = useState([
    {
      pageName: 'Accueil',
      path: SITE_PREFIX || '/',
    },
    {
      pageName: 'Notre solution',
      path: `${SITE_PREFIX}/notre-solution`,
    },
    {
      pageName: 'Abonnements',
      path: `${SITE_PREFIX}/abonnements`,
    },
    {
      pageName: 'Contact',
      path: `${SITE_PREFIX}/contact`,
    },
  ])

  const [accountPages] = useState([
    {
      pageName: 'Accueil',
      path: ACCOUNT_PREFIX || '/',
    },
    {
      pageName: 'Le direct',
      path: `${ACCOUNT_PREFIX}/le-direct`,
    },
    {
      pageName: 'Séances',
      path: `${ACCOUNT_PREFIX}/seances`,
    },
    {
      pageName: 'Conférences de santé',
      path: `${ACCOUNT_PREFIX}/conferences-de-sante`,
    },
    {
      pageName: 'Mon espace santé',
      path: `${ACCOUNT_PREFIX}/mon-espace-sante`,
    },
    {
      pageName: 'Profil',
      path: `${ACCOUNT_PREFIX}/profil`,
    },
    {
      pageName: 'Ajouter un moyen de paiement',
      path: `${ACCOUNT_PREFIX}/ajouter-un-moyen-de-paiement`,
    },
  ])

  const [externalPages] = useState([
    {
      pageName: 'Twitter',
      path: 'https://twitter.com',
    },
    {
      pageName: 'Instagram',
      path: 'https://instagram.com',
    },
    {
      pageName: 'Facebook',
      path: 'https://facebook.com',
    },
    {
      pageName: 'Linkedin',
      path: 'https://linkedin.com',
    },
    {
      pageName: 'Synerghetic',
      path: 'https://synerghetic.net',
    },
  ])

  const [otherPages] = useState([
    {
      pageName: 'Invitation',
      path: '/invitation',
    },
    {
      pageName: 'Connexion',
      path: '/connexion',
    },
    {
      pageName: 'Inscription',
      path: '/inscription',
    },
    {
      pageName: 'Réinitialiser votre mot de passe',
      path: '/reinitialiser-mot-de-passe',
    },
    {
      pageName: 'Mentions légales',
      path: '/mentions-legales.pdf',
    },
    {
      pageName: 'Conditions générales de vente',
      path: '/cgv.pdf',
    },
    {
      pageName: 'Politique de protection des données',
      path: '/protection-donnees.pdf',
    },
  ])

  const [checkoutPages] = useState([
    {
      id: 0,
      pageName: 'Paiement',
      path: CHECKOUT_PREFIX || '/',
    },
    {
      id: 1,
      pageName: 'Compte',
      path: `${CHECKOUT_PREFIX}/compte`,
    },
    {
      id: 2,
      pageName: 'Informations',
      path: `${CHECKOUT_PREFIX}/informations`,
    },
    {
      id: 3,
      pageName: 'Procéder au paiement',
      path: `${CHECKOUT_PREFIX}/proceder-au-paiement`,
    },
    {
      id: 4,
      pageName: 'Confirmation',
      path: `${CHECKOUT_PREFIX}/confirmation`,
    },
    {
      id: 5,
      pageName: 'Succès',
      path: `${CHECKOUT_PREFIX}/succes`,
    },
  ])

  const [surveyPages] = useState([
    {
      id: 0,
      pageName: 'Questionnaire',
      path: SURVEY_PREFIX || '/',
    },
    {
      id: 1,
      pageName: 'Compléter mon profil',
      path: `${SURVEY_PREFIX}/completer-mon-profil`,
    },
    {
      id: 2,
      pageName: 'Mensurations',
      path: `${SURVEY_PREFIX}/mensurations`,
    },
    {
      id: 3,
      pageName: 'Fumeur',
      path: `${SURVEY_PREFIX}/fumeur`,
    },
    {
      id: 4,
      pageName: 'Douleurs',
      path: `${SURVEY_PREFIX}/douleurs`,
    },
    {
      id: 5,
      pageName: 'Affection',
      path: `${SURVEY_PREFIX}/affection`,
    },
    {
      id: 6,
      pageName: 'Prothèses',
      path: `${SURVEY_PREFIX}/protheses`,
    },
    {
      id: 7,
      pageName: 'Succès',
      path: `${SURVEY_PREFIX}/succes`,
    },
  ])

  const [checkupPages] = useState([
    {
      id: '0.0',
      pageName: 'Bilan',
      path: CHECKUP_PREFIX || '/',
    },
    {
      id: '1.0',
      pageName: 'Bilan physique',
      path: `${CHECKUP_PREFIX}/physique`,
    },
    {
      id: '1.1',
      pageName: 'Force',
      path: `${CHECKUP_PREFIX}/physique/force`,
    },
    {
      id: '1.2',
      pageName: 'Souplesse',
      path: `${CHECKUP_PREFIX}/physique/souplesse`,
    },
    {
      id: '1.3',
      pageName: 'Endurance',
      path: `${CHECKUP_PREFIX}/physique/endurance`,
    },
    {
      id: '1.4',
      pageName: 'Equilibre',
      path: `${CHECKUP_PREFIX}/physique/equilibre`,
    },
    {
      id: '2.0',
      pageName: 'Bilan Bien-être',
      path: `${CHECKUP_PREFIX}/bien-etre`,
    },
    {
      id: '2.1',
      pageName: 'Humeur',
      path: `${CHECKUP_PREFIX}/bien-etre/humeur`,
    },
    {
      id: '2.2',
      pageName: 'Tranquilité',
      path: `${CHECKUP_PREFIX}/bien-etre/tranquilite`,
    },
    {
      id: '2.3',
      pageName: 'Energie',
      path: `${CHECKUP_PREFIX}/bien-etre/energie`,
    },
    {
      id: '2.4',
      pageName: 'Réveil',
      path: `${CHECKUP_PREFIX}/bien-etre/reveil`,
    },
    {
      id: '2.5',
      pageName: 'Vie quotidienne',
      path: `${CHECKUP_PREFIX}/bien-etre/vie-quotidienne`,
    },
    {
      id: '3.0',
      pageName: 'Activité quotidienne',
      path: `${CHECKUP_PREFIX}/activite-quotidienne`,
    },
    {
      id: '3.1',
      pageName: 'Activité intense',
      path: `${CHECKUP_PREFIX}/activite-quotidienne/activite-intense`,
    },
    {
      id: '3.2',
      pageName: 'Activité modérée',
      path: `${CHECKUP_PREFIX}/activite-quotidienne/activite-moderee`,
    },
    {
      id: '4.0',
      pageName: 'Succès',
      path: `${CHECKUP_PREFIX}/succes`,
    },
  ])

  return (
    <LinksContext.Provider
      value={{
        getPage,
        sitePages,
        accountPages,
        otherPages,
        surveyPages,
        checkupPages,
        checkoutPages,
        externalPages,
        SITE_PREFIX,
        ACCOUNT_PREFIX,
        SURVEY_PREFIX,
        CHECKUP_PREFIX,
        CHECKOUT_PREFIX,
      }}
    >
      {children}
    </LinksContext.Provider>
  )
}
