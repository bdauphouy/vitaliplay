import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Cta from '../utils/Cta'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'

const ErrorNav = () => {
  const { sitePages, getPage } = useContext(LinksContext)

  const router = useRouter()

  const buttonSize = useButtonSize(['l', 'm'], 768)

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center justify-between bg-light-100 px-6 shadow-level1 md:px-24">
      <Link href={getPage(sitePages, 'pageName', 'Accueil').path} passHref>
        <div className="relative w-34 cursor-pointer self-stretch md:w-44">
          <Image
            src="/logo.svg"
            alt="vitaliplay"
            layout="fill"
            className="cursor-pointer"
          />
        </div>
      </Link>
      <div className="hidden xsm:block" onClick={() => router.push('/')}>
        <Cta size={buttonSize}>Retour à l'accueil</Cta>
      </div>
    </nav>
  )
}

const ErrorPageLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Vitaliplay - Erreur</title>
      </Head>
      <ErrorNav />
      {children}
    </>
  )
}

export default ErrorPageLayout
