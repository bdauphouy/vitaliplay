import Nav from './Nav'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { RouteContext } from '../contexts/RouteContext'
import Footer from './Footer'
import { LinksContext } from '../contexts/LinksContext'

const Layout = ({ children }) => {
  const { isAuth } = useContext(AuthContext)
  const { page } = useContext(RouteContext)
  const { getPath } = useContext(LinksContext)

  const router = useRouter()

  const [authNavLinks] = useState([
    'Accueil',
    'En direct',
    'Séances',
    'Conférences de santé',
    'Mon espace santé',
  ])

  const [notAuthNavLinks] = useState([
    'Accueil',
    'Notre solution',
    'Abonnement',
    'Contact',
  ])

  const [navLinks, setNavLinks] = useState(
    isAuth ? authNavLinks : notAuthNavLinks,
  )

  useEffect(() => {
    setNavLinks(isAuth ? authNavLinks : notAuthNavLinks)
  }, [isAuth, authNavLinks, notAuthNavLinks])

  return (
    <>
      <Head>
        <title>Vitaliplay {page && `- ${page}`}</title>
      </Head>
      <Nav navLinks={navLinks} isAuth={isAuth} />
      {children}
      <Footer navLinks={navLinks} />
    </>
  )
}

export default Layout
