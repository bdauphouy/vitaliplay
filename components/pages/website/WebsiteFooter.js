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
    <div className="flex w-full items-center justify-center rounded-lg border-1 border-solid border-gray-200 bg-light-100 px-6 py-3 font-body text-md font-bold text-black md:w-auto md:text-lg">
      {children}
    </div>
  )
}

const WebsiteFooter = ({ navLinks }) => {
  const { externalLinks, getPathByPage } = useContext(LinksContext)

  return (
    <>
      <footer className="hidden flex-col pt-36 md:flex">
        <div className="relative px-24">
          <div className="mx-auto flex max-w-screen-3xl flex-col items-center space-y-4 rounded-lg bg-blue-50 px-9 py-14">
            <h3 className="mb-8 max-w-sm text-center font-head text-4xl font-bold text-dark-900">
              Pour être toujours au plus près de vous
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
        <div className="-mt-40 bg-blue-900 px-24 pb-7 pt-56">
          <div className="mx-auto flex max-w-screen-3xl flex-wrap justify-between">
            <div className="self-start">
              <Link href={getPathByPage('Accueil')} passHref>
                <a>
                  <Image
                    src="/logo-footer.svg"
                    alt="vitaliplay"
                    width="212"
                    height="48"
                    className="w-44 cursor-pointer self-start md:w-44"
                  />
                </a>
              </Link>
            </div>
            <ul className="-mt-2 pl-8">
              {navLinks.map((navLink, i) => {
                if (
                  ![
                    'Connexion',
                    'Mentions légales',
                    "Conditions d'utilisation",
                  ].includes(navLink.page)
                ) {
                  return (
                    <li key={i}>
                      <Link href={navLink.path}>
                        <a className="inline-flex py-2 font-body text-base font-semibold text-light-100">
                          {navLink.page}
                        </a>
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
            <ul className="-mt-2 px-8">
              <li>
                <Link href={getPathByPage('Mentions légales')}>
                  <a className="inline-flex py-2 font-body text-base font-semibold text-light-100">
                    Mentions légales
                  </a>
                </Link>
              </li>
              <li>
                <Link href={getPathByPage("Conditions d'utilisation")}>
                  <a className="inline-block py-2 font-body text-base font-semibold text-light-100">
                    Conditions d'utilisation
                  </a>
                </Link>
              </li>
            </ul>
            <div className="flex flex-col pr-36">
              <h3 className="font-body text-base font-semibold text-light-100">
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
          <div className="mx-auto mt-16 flex max-w-screen-3xl justify-between border-t-1 border-solid border-light-40">
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Réalisé par{' '}
              <Link href={externalLinks.synerghetic} passHref>
                <span className="cursor-pointer">
                  <u>Synerg’hetic</u> 💜
                </span>
              </Link>
            </h4>
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Vitaliplay &copy; 2021
            </h4>
          </div>
        </div>
      </footer>
      <footer className="pt-20 md:hidden">
        <div className="relative max-w-screen-3xl px-6">
          <div className="flex flex-col items-center space-y-4 rounded-lg bg-blue-50 px-9 py-6">
            <h3 className="mb-8 max-w-xs text-center font-head text-xl font-bold text-dark-900">
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
        <div className="-mt-32 bg-blue-900 p-6 pt-48">
          <Link href={getPathByPage('Accueil')} passHref>
            <a>
              <Image
                src="/logo-footer.svg"
                alt="vitaliplay"
                width="212"
                height="48"
                className="w-44 cursor-pointer md:w-44"
              />
            </a>
          </Link>
          <ul className="mt-8 w-full">
            {navLinks.map((navLink, i) => {
              if (navLink.page !== 'Connexion') {
                return (
                  <li key={i}>
                    <Link href={navLink.path}>
                      <a
                        className={`${
                          navLink.page === 'Mentions légales' ? 'mt-8' : ''
                        } inline-flex h-full w-full items-center py-2 font-body text-base font-semibold text-light-100`}
                      >
                        {navLink.page}
                      </a>
                    </Link>
                  </li>
                )
              }
            })}
          </ul>
          <h3 className="mt-8 py-2 font-body text-base font-semibold text-light-100">
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
          <div className="mt-16 flex justify-between border-t-1 border-solid border-light-40">
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Réalisé par{' '}
              <Link href={externalLinks.synerghetic} passHref>
                <span className="cursor-pointer">
                  <u>Synerg’hetic</u> 💜
                </span>
              </Link>
            </h4>
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Vitaliplay &copy; 2021
            </h4>
          </div>
        </div>
      </footer>
    </>
  )
}

export default WebsiteFooter
