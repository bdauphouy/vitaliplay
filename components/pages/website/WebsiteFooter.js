import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import {
  Apple,
  Android,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
} from '@/components/utils/Icons'
import Image from 'next/image'

const DownloadButton = ({ children }) => {
  return (
    <div className="flex justify-center items-center font-body text-black bg-light-100 border-solid border-1 border-gray-200 px-6 py-3 rounded-lg">
      {children}
    </div>
  )
}

const WebsiteFooter = ({ navLinks }) => {
  const { externalLinks, getPathByPage } = useContext(LinksContext)

  return (
    <>
      <footer className="hidden md:flex flex-col pt-36">
        <div className="relative px-24">
          <div className="bg-blue-50 rounded-lg px-9 py-14 space-y-4 flex flex-col items-center">
            <h3 className="font-head font-bold text-4xl text-center text-dark-900 max-w-sm mb-8">
              Pour être toujours plus près de vous
            </h3>
            <div className="flex gap-8">
              <DownloadButton>
                <div className="mr-3">
                  <Apple color="#141414" size={23} />
                </div>
                Disponible sur IOS
              </DownloadButton>
              <DownloadButton>
                <div className="mr-3">
                  <Android color="#26C196" size={23} />
                </div>
                Disponible sur Android
              </DownloadButton>
            </div>
          </div>
        </div>
        <div className="bg-blue-900 px-24 pb-7 pt-56 -mt-40">
          <div className="flex justify-between flex-wrap">
            <div className="self-start">
              <Link href={getPathByPage('Accueil')} passHref>
                <a>
                  <Image
                    src="/logo-footer.svg"
                    alt="vitaliplay"
                    width="212"
                    height="48"
                    className="cursor-pointer md:w-44 w-44 self-start"
                  />
                </a>
              </Link>
            </div>
            <ul className="pl-8 -mt-2">
              {navLinks.map((navLink, i) => {
                return (
                  <li key={i}>
                    <Link href={navLink.path}>
                      <a className="font-body font-semibold text-base py-2 inline-flex text-light-100">
                        {navLink.page}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
            <ul className="px-8 -mt-2">
              <li>
                <Link href={getPathByPage('Mentions légales')}>
                  <a className="font-body font-semibold text-base py-2 inline-flex text-light-100">
                    Mentions légales
                  </a>
                </Link>
              </li>
              <li>
                <Link href={getPathByPage("Conditions d'utilisation")}>
                  <a className="font-body font-semibold text-base py-2 text-light-100 inline-block">
                    Conditions d'utilisation
                  </a>
                </Link>
              </li>
            </ul>
            <div className="flex flex-col pr-36">
              <h3 className="font-body font-semibold text-base text-light-100">
                Nous retrouver :
              </h3>
              <ul className="mt-3 flex gap-4">
                <li>
                  <Link href={externalLinks.linkedin} passHref>
                    <div className="cursor-pointer">
                      <Linkedin color="#ECF4FE" />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={externalLinks.instagram} passHref>
                    <div className="cursor-pointer">
                      <Instagram color="#ECF4FE" />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={externalLinks.facebook} passHref>
                    <div className="cursor-pointer">
                      <Facebook color="#ECF4FE" />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={externalLinks.twitter} passHref>
                    <div className="cursor-pointer">
                      <Twitter color="#ECF4FE" />
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-solid border-t-1 border-light-40 flex justify-between">
            <h4 className="font-body font-semibold text-sm mt-4 text-light-100">
              Réalisé par{' '}
              <Link href={externalLinks.synerghetic} passHref>
                <span className="cursor-pointer">
                  <u>Synerg’hetic</u> 💜
                </span>
              </Link>
            </h4>
            <h4 className="font-body font-semibold text-sm mt-4 text-light-100">
              Vitaliplay &copy; 2021
            </h4>
          </div>
        </div>
      </footer>
      <footer className="md:hidden pt-20">
        <div className="relative px-6">
          <div className="bg-blue-50 rounded-lg px-9 py-6 space-y-4 flex flex-col items-center">
            <h3 className="font-head font-bold text-2xl text-center text-dark-900 max-w-xs mb-8">
              Pour être toujours plus près de vous
            </h3>
            <DownloadButton>
              <div className="mr-3">
                <Apple color="#141414" size={20} />
              </div>
              Disponible sur IOS
            </DownloadButton>
            <DownloadButton>
              <div className="mr-3">
                <Android color="#26C196" size={20} />
              </div>
              Disponible sur Android
            </DownloadButton>
          </div>
        </div>
        <div className="bg-blue-900 p-6 pt-48 -mt-32">
          <Link href={getPathByPage('Accueil')} passHref>
            <a>
              <Image
                src="/logo-footer.svg"
                alt="vitaliplay"
                width="212"
                height="48"
                className="cursor-pointer md:w-44 w-44"
              />
            </a>
          </Link>
          <ul className="w-full mt-8">
            {navLinks.map((navLink, i) => {
              return (
                <li key={i}>
                  <Link href={navLink.path}>
                    <a className="w-full font-body font-semibold text-base py-2 h-full inline-flex items-center text-light-100">
                      {navLink.page}
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
          <ul className="mt-8">
            <li>
              <Link href={getPathByPage('Mentions légales')}>
                <a className="font-body font-semibold text-base py-2 text-light-100">
                  Mentions légales
                </a>
              </Link>
            </li>
            <li>
              <Link href={getPathByPage("Conditions d'utilisation")}>
                <a className="font-body font-semibold text-base py-2 text-light-100 inline-block">
                  Conditions d'utilisation
                </a>
              </Link>
            </li>
          </ul>
          <h3 className="font-body font-semibold text-base py-2 mt-8 text-light-100">
            Nous retrouver :
          </h3>
          <ul className="mt-3 flex gap-4">
            <li>
              <Link href={externalLinks.linkedin} passHref>
                <div className="cursor-pointer">
                  <Linkedin color="#ECF4FE" />
                </div>
              </Link>
            </li>
            <li>
              <Link href={externalLinks.instagram} passHref>
                <div className="cursor-pointer">
                  <Instagram color="#ECF4FE" />
                </div>
              </Link>
            </li>
            <li>
              <Link href={externalLinks.facebook} passHref>
                <div className="cursor-pointer">
                  <Facebook color="#ECF4FE" />
                </div>
              </Link>
            </li>
            <li>
              <Link href={externalLinks.twitter} passHref>
                <div className="cursor-pointer">
                  <Twitter color="#ECF4FE" />
                </div>
              </Link>
            </li>
          </ul>
          <div className="border-solid border-t-1 border-light-40 flex justify-between mt-16">
            <h4 className="font-body font-semibold text-sm mt-4 text-light-100">
              Réalisé par{' '}
              <Link href={externalLinks.synerghetic} passHref>
                <span className="cursor-pointer">
                  <u>Synerg’hetic</u> 💜
                </span>
              </Link>
            </h4>
            <h4 className="font-body font-semibold text-sm mt-4 text-light-100">
              Vitaliplay &copy; 2021
            </h4>
          </div>
        </div>
      </footer>
    </>
  )
}

export default WebsiteFooter
