import Link from 'next/link'
import Image from 'next/image'
import Cta from '@/components/utils/Cta'
import { useEffect, useRef, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
} from '@/components/utils/Icons'
import { LinksContext } from '@/contexts/LinksContext'
import useMediaQuery from '@mui/material/useMediaQuery'
import { AuthContext } from '@/contexts/AuthContext'

const Burger = ({ menu, setMenu }) => {
  return (
    <div
      className="relative h-6 w-7 cursor-pointer"
      onClick={() => setMenu((menu) => !menu)}
    >
      <span
        className={`burger-span bg-blue-900 ${
          menu ? 'rotate-45' : '-mt-2'
        } transition`}
        style={{
          transitionProperty: 'margin-top, transform',
        }}
      ></span>
      <span
        className={`burger-span ${
          menu ? 'bg-transparent' : 'bg-blue-900'
        } transition`}
        style={{ transitionProperty: 'background-color, transform' }}
      ></span>
      <span
        className={`burger-span bg-blue-900 ${
          menu ? '-rotate-45' : 'mt-2'
        } transition`}
        style={{ transitionProperty: 'margin-top, transform' }}
      ></span>
    </div>
  )
}

const SiteNav = () => {
  const { sitePages, otherPages, accountPages, externalPages, getPage } =
    useContext(LinksContext)

  const [menu, setMenu] = useState(false)

  const isExtraLargeScreen = useMediaQuery('(min-width: 1280px)')

  const router = useRouter()

  const marker = useRef()

  const { isAuth } = useContext(AuthContext)

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item')
    navItems.forEach((navItem) => {
      const updateMarker = () => {
        if (!marker) return

        marker.current.style.left = `${navItem.offsetLeft}px`
        marker.current.style.width = `${navItem.offsetWidth}px`
      }

      if (
        router.asPath.startsWith(
          getPage(sitePages, 'pageName', navItem.innerText).path
        )
      ) {
        updateMarker()
      }
    })
  }, [router, isExtraLargeScreen])

  const closeNav = () => setMenu(false)

  return (
    <>
      <nav className="fixed top-0 z-50 hidden h-20 w-full items-center justify-between bg-light-100 px-6 shadow-level1 md:px-24 xl:flex">
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
        <ul className="relative flex h-full items-center">
          <div
            className="absolute bottom-0 h-1 bg-blue-900 transition"
            ref={marker}
            style={{
              transitionProperty: 'width, left',
            }}
          ></div>
          {sitePages.map((sitePage, i) => {
            return (
              <li
                key={i}
                className="h-full transition-[background-color] duration-300 hover:bg-blue-50"
              >
                <Link href={sitePage.path}>
                  <a
                    className={`nav-item inline-flex h-full items-center px-6 font-head text-lg font-semibold ${
                      router.route ===
                      '/site' + (sitePage.path === '/' ? '' : sitePage.path)
                        ? 'text-blue-900'
                        : 'text-dark-300'
                    }`}
                  >
                    {sitePage.pageName}
                  </a>
                </Link>
              </li>
            )
          })}
          <li className="ml-6">
            {isAuth ? (
              <Link
                href={getPage(accountPages, 'pageName', 'Accueil').path}
                passHref
              >
                <div>
                  <Cta size="l">Compte</Cta>
                </div>
              </Link>
            ) : (
              <Link
                href={getPage(otherPages, 'pageName', 'Connexion').path}
                passHref
              >
                <div>
                  <Cta size="l">Connexion</Cta>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <nav className="fixed top-0 z-50 flex w-full flex-col bg-light-100 px-6 shadow-level1 md:px-24 xl:hidden">
        <div className="flex h-20 w-full items-center justify-between">
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

          <Burger menu={menu} setMenu={setMenu} />
        </div>
        <div
          className={`${
            menu
              ? !isExtraLargeScreen
                ? 'max-h-[820px]'
                : 'max-h-144'
              : 'max-h-0'
          } absolute top-full left-0 w-full overflow-hidden bg-white px-6 transition duration-500 md:px-24`}
          style={{ transitionProperty: 'max-height' }}
        >
          <div className="mb-8 flex flex-col-reverse">
            <ul>
              {sitePages.map((sitePage, i) => {
                return (
                  <li key={i} onClick={closeNav}>
                    <Link href={sitePage.path}>
                      <a
                        className={`inline-flex h-full w-full items-center py-4 font-head text-lg font-semibold ${
                          router.route ===
                          '/site' + (sitePage.path === '/' ? '' : sitePage.path)
                            ? 'text-blue-900'
                            : 'text-dark-300'
                        }`}
                      >
                        {sitePage.pageName}
                      </a>
                    </Link>
                  </li>
                )
              })}
              <li onClick={closeNav}>
                {isAuth ? (
                  <Link
                    href={getPage(accountPages, 'pageName', 'Accueil').path}
                  >
                    <a
                      className={`inline-flex h-full w-full items-center py-4 font-head text-lg font-semibold text-dark-300`}
                    >
                      Compte
                    </a>
                  </Link>
                ) : (
                  <Link
                    href={getPage(otherPages, 'pageName', 'Connexion').path}
                  >
                    <a
                      className={`inline-flex h-full w-full items-center py-4 font-head text-lg font-semibold text-dark-300`}
                    >
                      Se connecter
                    </a>
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-base font-semibold text-dark-900">
              Nous retrouver :
            </h3>
            <ul className="mt-3 flex gap-4">
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Linkedin').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Linkedin color="#1778F2" />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Twitter').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Instagram color="#1778F2" />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Instagram').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Facebook color="#1778F2" />
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  href={getPage(externalPages, 'pageName', 'Facebook').path}
                  passHref
                >
                  <div className="cursor-pointer">
                    <Twitter color="#1778F2" />
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-16 flex justify-between border-t-1 border-solid border-dark-50 pb-4">
            <h4 className="mt-4 font-body text-sm font-semibold text-dark-500">
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
            <h4 className="mt-4 font-body text-sm font-semibold text-dark-500">
              Vitaliplay &copy; 2021
            </h4>
          </div>
        </div>
      </nav>
    </>
  )
}

export default SiteNav
