import Link from 'next/link'
import { useContext, useState, useEffect } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
} from '@/components/utils/Icons'
import Image from 'next/image'
import { useMediaQuery } from '@mui/material'

const AccountFooter = () => {
  const { externalLinks, getPathByPage, getRewriteByPage } =
    useContext(LinksContext)

  const [socialNetworkSize, setSocialNetworkSize] = useState()

  const isSmallScreen = useMediaQuery('(min-width: 640px)')

  useEffect(() => {
    setSocialNetworkSize(isSmallScreen ? 32 : 24)
  }, [isSmallScreen])

  return (
    <footer className="flex-wrap gap-x-8 md:px-24 px-6 flex items-center justify-between border-t-1 border-solid border-dark-50">
      <Link
        href={
          getRewriteByPage('Accueil')
            ? getRewriteByPage('Accueil')
            : getPathByPage('Accueil')
        }
        passHref>
        <div className="cursor-pointer md:w-36 w-28 relative h-20">
          <Image
            src="/logo.svg"
            alt="vitaliplay"
            layout="fill"
            className="cursor-pointer"
          />
        </div>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link href={externalLinks.linkedin} passHref>
            <div className="cursor-pointer">
              <Linkedin color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
        <li>
          <Link href={externalLinks.instagram} passHref>
            <div className="cursor-pointer">
              <Instagram color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
        <li>
          <Link href={externalLinks.facebook} passHref>
            <div className="cursor-pointer">
              <Facebook color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
        <li>
          <Link href={externalLinks.twitter} passHref>
            <div className="cursor-pointer">
              <Twitter color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
      </ul>
      <p className="hidden sm:block text-sm font-bold font-body text-dark-300">
        Vitaliplay &copy; 2021
      </p>
    </footer>
  )
}

export default AccountFooter
