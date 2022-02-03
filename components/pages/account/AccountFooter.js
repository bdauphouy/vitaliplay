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
    <footer className="flex flex-wrap items-center justify-between gap-x-8 border-t-1 border-solid border-dark-50 px-6 md:px-24">
      <Link
        href={
          getRewriteByPage('Accueil')
            ? getRewriteByPage('Accueil')
            : getPathByPage('Accueil')
        }
        passHref
      >
        <div className="relative h-20 w-28 cursor-pointer md:w-36">
          <Image
            src="/logo.svg"
            alt="vitaliplay"
            layout="fill"
            className="cursor-pointer"
          />
        </div>
      </Link>
      <ul className="flex gap-4">
        <li className="transition-[margin-top] duration-300 hover:-mt-1">
          <Link href={externalLinks.linkedin} passHref>
            <div className="cursor-pointer">
              <Linkedin color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
        <li className="transition-[margin-top] duration-300 hover:-mt-1">
          <Link href={externalLinks.instagram} passHref>
            <div className="cursor-pointer">
              <Instagram color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
        <li className="transition-[margin-top] duration-300 hover:-mt-1">
          <Link href={externalLinks.facebook} passHref>
            <div className="cursor-pointer">
              <Facebook color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
        <li className="transition-[margin-top] duration-300 hover:-mt-1">
          <Link href={externalLinks.twitter} passHref>
            <div className="cursor-pointer">
              <Twitter color="#1778F2" size={socialNetworkSize} />
            </div>
          </Link>
        </li>
      </ul>
      <p className="hidden font-body text-sm font-bold text-dark-300 sm:block">
        Vitaliplay &copy; 2021
      </p>
    </footer>
  )
}

export default AccountFooter
