import Link from 'next/link'
import { useContext, useEffect } from 'react'
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
import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'

const DownloadButton = ({ children }) => {
  return (
    <div className="flex w-full cursor-pointer items-center justify-center rounded-lg border-1 border-solid border-gray-200 bg-light-100 px-6 py-3 font-body text-md font-bold text-black transition-[background-color] duration-300 hover:bg-gray-100 md:w-auto md:text-lg">
      {children}
    </div>
  )
}

const WebsiteFooter = () => {
  const { externalPages, sitePages, otherPages, getPage } =
    useContext(LinksContext)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      window.deferredPrompt = e
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () =>
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      )
  }, [])

  const handleClick = () => {
    if (deferredPrompt !== null) {
      deferredPrompt.prompt()
    }
  }

  return (
    <>
      <footer className="hidden flex-col pt-36 md:flex">
        <div className="relative px-24">
          <div className="relative mx-auto flex max-w-screen-3xl flex-col items-center space-y-12 overflow-hidden rounded-lg bg-blue-50 px-9 py-14 pt-0">
            <div className="absolute left-20 -top-4 hidden lg:block">
              <Image src={orangeGreen} alt="orange-green" />
            </div>
            <div className="absolute right-10 -top-16 hidden lg:block">
              <Image src={blueOrange} alt="blue-orange" />
            </div>
            <div className="absolute -bottom-4 left-40 hidden scale-150 transform lg:block">
              <Image src={greenBlue} alt="green-blue" />
            </div>
            <div className="absolute right-20 -bottom-10 hidden scale-150 transform lg:block">
              <Image src={yellowOrange} alt="yellow-orange" />
            </div>
            <h3 className="max-w-sm text-center font-head text-4xl font-bold text-dark-900">
              Pour être toujours au plus près de vous
            </h3>
            <div className="flex gap-8" onClick={handleClick}>
              <DownloadButton>
                <div className="relative mr-3 flex">
                  <Apple color="#141414" size={23} />
                  <Android color="#26C196" size={23} />
                </div>
                Téléchargez l'application sur votre mobile
              </DownloadButton>
            </div>
          </div>
        </div>
        <div className="-mt-40 bg-blue-900 px-24 pb-7 pt-56">
          <div className="mx-auto flex max-w-screen-3xl flex-wrap justify-between gap-4">
            <div className="self-start">
              <Link
                href={getPage(sitePages, 'pageName', 'Accueil').path}
                passHref
              >
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
            <ul className="ml-8 -mt-2">
              {sitePages.map((sitePage, i) => {
                if (
                  ![
                    'Connexion',
                    'Mentions légales',
                    "Conditions d'utilisation",
                  ].includes(sitePage.pageName)
                ) {
                  return (
                    <li key={i}>
                      <Link href={sitePage.path}>
                        <a className="inline-flex py-2 font-body text-base font-semibold text-light-100 transition-[color] duration-300 hover:text-light-80">
                          {sitePage.pageName}
                        </a>
                      </Link>
                    </li>
                  )
                }
              })}
            </ul>
            <ul className="-mt-2">
              <li>
                <Link
                  href={
                    getPage(otherPages, 'pageName', 'Mentions légales').path
                  }
                >
                  <a className="inline-flex py-2 font-body text-base font-semibold text-light-100 transition-[color] duration-300 hover:text-light-80">
                    Mentions légales
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    getPage(
                      otherPages,
                      'pageName',
                      'Conditions générales de vente'
                    ).path
                  }
                >
                  <a className="inline-block py-2 font-body text-base font-semibold text-light-100 transition-[color] duration-300 hover:text-light-80">
                    Conditions générales de vente
                  </a>
                </Link>
              </li>
              <li>
                <Link
                  href={
                    getPage(
                      otherPages,
                      'pageName',
                      'Politique de protection des données'
                    ).path
                  }
                >
                  <a className="inline-block py-2 font-body text-base font-semibold text-light-100 transition-[color] duration-300 hover:text-light-80">
                    Politique de protection des données
                  </a>
                </Link>
              </li>
            </ul>
            <div className="flex flex-col pr-36">
              <h3 className="font-body text-base font-semibold text-light-100">
                Nous retrouver :
              </h3>
              <ul className="mt-3 flex gap-4">
                {getPage(externalPages, 'pageName', 'Linkedin').path && (
                  <li>
                    <Link
                      href={getPage(externalPages, 'pageName', 'Linkedin').path}
                      passHref
                    >
                      <div className="cursor-pointer transition-[margin-top] duration-300 hover:-mt-1">
                        <Linkedin color="#ECF4FE" />
                      </div>
                    </Link>
                  </li>
                )}
                {getPage(externalPages, 'pageName', 'Instagram').path && (
                  <li>
                    <Link
                      href={
                        getPage(externalPages, 'pageName', 'Instagram').path
                      }
                      passHref
                    >
                      <div className="cursor-pointer transition-[margin-top] duration-300 hover:-mt-1">
                        <Instagram color="#ECF4FE" />
                      </div>
                    </Link>
                  </li>
                )}
                {getPage(externalPages, 'pageName', 'Facebook').path && (
                  <li>
                    <Link
                      href={getPage(externalPages, 'pageName', 'Facebook').path}
                      passHref
                    >
                      <div className="cursor-pointer transition-[margin-top] duration-300 hover:-mt-1">
                        <Facebook color="#ECF4FE" />
                      </div>
                    </Link>
                  </li>
                )}
                {getPage(externalPages, 'pageName', 'Twitter').path && (
                  <li>
                    <Link
                      href={getPage(externalPages, 'pageName', 'Twitter').path}
                      passHref
                    >
                      <div className="cursor-pointer transition-[margin-top] duration-300 hover:-mt-1">
                        <Twitter color="#ECF4FE" />
                      </div>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-screen-3xl justify-between border-t-1 border-solid border-light-40">
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Réalisé par{' '}
              <Link
                href={getPage(externalPages, 'pageName', 'Synerghetic').path}
                passHref
              >
                <span className="cursor-pointer">
                  <u>Synerg’hetic</u> 💜
                </span>
              </Link>
            </h4>
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Vitaliplay &copy; 2022
            </h4>
          </div>
        </div>
      </footer>
      <footer className="pt-20 md:hidden">
        <div className="relative max-w-screen-3xl px-6">
          <div className="flex flex-col items-center space-y-4 rounded-lg bg-blue-50 px-9 py-6">
            <h3 className="mb-9 max-w-xs text-center font-head text-xl font-bold text-dark-900">
              Pour être toujours plus près de vous
            </h3>
            <DownloadButton>
              <div className="mr-3">
                <Apple color="#141414" size={23} />
                <Android color="#26C196" size={23} />
              </div>
              Téléchargez l'application sur votre mobile
            </DownloadButton>
          </div>
        </div>
        <div className="-mt-32 bg-blue-900 p-6 pt-48">
          <Link href={getPage(sitePages, 'pageName', 'Accueil').path} passHref>
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
            {sitePages.map((sitePage, i) => {
              if (sitePage.pageName !== 'Connexion') {
                return (
                  <li key={i}>
                    <Link href={sitePage.path}>
                      <a
                        className={`inline-flex h-full w-full items-center py-2 font-body text-base font-semibold text-light-100`}
                      >
                        {sitePage.pageName}
                      </a>
                    </Link>
                  </li>
                )
              }
            })}
            <li className="mt-8">
              <Link
                href={getPage(otherPages, 'pageName', 'Mentions légales').path}
              >
                <a
                  className={`inline-flex h-full w-full items-center py-2 font-body text-base font-semibold text-light-100`}
                >
                  Mentions légales
                </a>
              </Link>
            </li>
            <li>
              <Link
                href={
                  getPage(
                    otherPages,
                    'pageName',
                    'Conditions générales de vente'
                  ).path
                }
              >
                <a
                  className={`inline-flex h-full w-full items-center py-2 font-body text-base font-semibold text-light-100`}
                >
                  Conditions générales de vente
                </a>
              </Link>
            </li>
            <li>
              <Link
                href={
                  getPage(
                    otherPages,
                    'pageName',
                    'Politique de protection des données'
                  ).path
                }
              >
                <a className="inline-block py-2 font-body text-base font-semibold text-light-100 transition-[color] duration-300 hover:text-light-80">
                  Politique de protection des données
                </a>
              </Link>
            </li>
          </ul>
          <h3 className="mt-8 py-2 font-body text-base font-semibold text-light-100">
            Nous retrouver :
          </h3>
          <ul className="mt-3 flex gap-4">
            {getPage(externalPages, 'pageName', 'Linkedin').path && (
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Linkedin').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Linkedin color="#ECF4FE" />
                  </div>
                </Link>
              </li>
            )}
            {getPage(externalPages, 'pageName', 'Instagram').path && (
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Instagram').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Instagram color="#ECF4FE" />
                  </div>
                </Link>
              </li>
            )}
            {getPage(externalPages, 'pageName', 'Facebook').path && (
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Facebook').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Facebook color="#ECF4FE" />
                  </div>
                </Link>
              </li>
            )}
            {getPage(externalPages, 'pageName', 'Twitter').path && (
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Twitter').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Twitter color="#ECF4FE" />
                  </div>
                </Link>
              </li>
            )}
          </ul>
          <div className="mt-16 flex justify-between border-t-1 border-solid border-light-40">
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Réalisé par{' '}
              <Link
                href={getPage(externalPages, 'pageName', 'Synerghetic').path}
                passHref
              >
                <span className="cursor-pointer">
                  <u>Synerg’hetic</u> 💜
                </span>
              </Link>
            </h4>
            <h4 className="mt-4 font-body text-sm font-semibold text-light-100">
              Vitaliplay &copy; 2022
            </h4>
          </div>
        </div>
      </footer>
    </>
  )
}

export default WebsiteFooter
