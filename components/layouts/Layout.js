import Nav from '@/components/utils/Nav'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import Head from 'next/head'
import WebsiteFooter from '@/components/pages/website/WebsiteFooter'
import { LinksContext } from '@/contexts/LinksContext'
import { useRouter } from 'next/router'
import CloseNav from '@/components/utils/CloseNav'
import AccountFooter from '@/components/pages/account/AccountFooter'
import { useMediaQuery } from '@mui/material'

const Layout = ({ children }) => {
  const { isAuth } = useContext(AuthContext)
  const { getPathByPage, getNavByPath, authNavLinks, notAuthNavLinks } =
    useContext(LinksContext)

  const [navLinks, setNavLinks] = useState(
    isAuth ? authNavLinks : notAuthNavLinks
  )

  const router = useRouter()

  useEffect(() => {
    setNavLinks(isAuth ? authNavLinks : notAuthNavLinks)
  }, [isAuth, authNavLinks, notAuthNavLinks])

  return (
    <>
      <Head>
        <title>Vitaliplay</title>
      </Head>
      {getNavByPath(router.route) || router.route.includes('/account') ? (
        <>
          <Nav navLinks={navLinks} isAuth={isAuth} />
          {children}
          {isAuth ? <AccountFooter /> : <WebsiteFooter navLinks={navLinks} />}
        </>
      ) : (
        <>
          <CloseNav />
          {children}
        </>
      )}
    </>
  )
}

export default Layout
