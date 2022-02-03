import Link from 'next/link'
import Cta from './Cta'
import { useEffect, useRef, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { User } from './Icons'
import { LinksContext } from '../../contexts/LinksContext'
import { Instagram, Linkedin, Facebook, Twitter } from './Icons'
import Image from 'next/image'
import useMediaQuery from '@mui/material/useMediaQuery'
import Title from './Title'

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

const Nav = ({ navLinks, isAuth }) => {
  const { externalLinks, getPathByPage, getRewriteByPage } =
    useContext(LinksContext)

  const [menu, setMenu] = useState(false)

  const isExtraLargeScreen = useMediaQuery('(min-width: 1280px)')

  const router = useRouter()

  const marker = useRef()

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item')

    navItems.forEach((navItem) => {
      const updateMarker = () => {
        if (!marker) return

        marker.current.style.left = `${navItem.offsetLeft}px`
        marker.current.style.width = `${navItem.offsetWidth}px`
      }

      if (
        router.asPath.includes(getPathByPage(navItem.innerText)) ||
        router.asPath.includes(getRewriteByPage(navItem.innerText))
      ) {
        updateMarker()
      }

      if (router.route.includes(getPathByPage('Profil'))) {
        marker.current.style.width = 0
      }
    })
  }, [router, getPathByPage, isExtraLargeScreen])

  return (
    <>
      <nav
        className="fixed top-0 z-50 hidden h-20 w-full items-center justify-between bg-light-100 px-6 shadow-level1 md:px-24 xl:flex
    "
      >
        <Link
          href={
            getRewriteByPage('Accueil')
              ? getRewriteByPage('Accueil')
              : getPathByPage('Accueil')
          }
          passHref
        >
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
          {navLinks.map((navLink, i) => {
            return (
              !navLink.mobileNav && (
                <li
                  key={i}
                  className="h-full transition-[background-color] duration-300 hover:bg-blue-50"
                >
                  <Link href={navLink.rewrite || navLink.path}>
                    <a
                      className={`nav-item inline-flex h-full items-center px-6 font-head text-lg font-semibold ${
                        (router.route.includes(navLink.path) ||
                          router.route.includes(navLink.rewrite)) &&
                        navLink.rewrite !== '/' &&
                        navLink.path !== '/'
                          ? 'text-blue-900'
                          : router.route === navLink.path ||
                            router.route === navLink.rewrite
                          ? 'text-blue-900'
                          : 'text-dark-300'
                      }`}
                    >
                      {navLink.page}
                    </a>
                  </Link>
                </li>
              )
            )
          })}

          <li className="ml-6">
            {isAuth ? (
              <Link href="/profil" passHref>
                <a>
                  <div
                    className={`box-content flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-solid border-transparent bg-blue-900 transition-[border-color] duration-300 hover:border-blue-300 ${
                      router.route.includes('/profil') ? 'border-blue-300' : ''
                    }`}
                  >
                    <User color="#FFFFFF" size={24} />
                  </div>
                </a>
              </Link>
            ) : (
              <Link
                href={
                  getRewriteByPage('Connexion')
                    ? getRewriteByPage('Connexion')
                    : getPathByPage('Connexion')
                }
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
      <nav
        className="fixed top-0 z-50 flex w-full flex-col bg-light-100 px-6 shadow-level1 md:px-24 xl:hidden
    "
      >
        <div className="flex h-20 w-full items-center justify-between">
          <Link
            href={
              getRewriteByPage('Accueil')
                ? getRewriteByPage('Accueil')
                : getPathByPage('Accueil')
            }
            passHref
          >
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
              {navLinks.map((navLink, i) => {
                return (
                  <li key={i}>
                    <Link href={navLink.rewrite || navLink.path}>
                      <a
                        onClick={() => setMenu(false)}
                        className={`inline-flex h-full w-full items-center py-4 font-head text-lg font-semibold ${
                          (router.route.includes(navLink.path) ||
                            router.route.includes(navLink.rewrite)) &&
                          navLink.rewrite !== '/' &&
                          navLink.path !== '/'
                            ? 'text-blue-900'
                            : router.route === navLink.path ||
                              router.route === navLink.rewrite
                            ? 'text-blue-900'
                            : 'text-dark-300'
                        }`}
                      >
                        {navLink.page}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div
              className={isAuth ? 'my-4 border-b-1 border-dark-50 pb-6' : ''}
            >
              {isAuth && (
                <>
                  <div className="hidden h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-900 xl:flex">
                    <User color="#FFFFFF" size={24} />
                  </div>
                  <div className="flex items-center gap-6 xl:hidden">
                    <div className="min-h-[72px] min-w-[72px] rounded-full bg-gray-100 sm:min-h-[96px] sm:min-w-[96px]"></div>
                    <div>
                      <Title type="5">Guillaume Clerisseau</Title>
                      <Link href={getRewriteByPage('Profil')} passHref>
                        <a onClick={() => setMenu(false)}>
                          <Cta
                            size="m"
                            type="link"
                            arrow="right"
                            textColor="text-blue-900"
                          >
                            Accéder à mon profil
                          </Cta>
                        </a>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {externalLinks && (
            <>
              <h3 className="font-body text-base font-semibold text-dark-900">
                Nous retrouver :
              </h3>
              <ul className="mt-3 flex gap-4">
                <li>
                  <Link href={externalLinks.linkedin} passHref>
                    <div className="cursor-pointer">
                      <Linkedin color="#1778F2" />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={externalLinks.instagram} passHref>
                    <div className="cursor-pointer">
                      <Instagram color="#1778F2" />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={externalLinks.facebook} passHref>
                    <div className="cursor-pointer">
                      <Facebook color="#1778F2" />
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={externalLinks.twitter} passHref>
                    <div className="cursor-pointer">
                      <Twitter color="#1778F2" />
                    </div>
                  </Link>
                </li>
              </ul>
            </>
          )}
          <div className="mt-16 flex justify-between border-t-1 border-solid border-dark-50 pb-4">
            <h4 className="mt-4 font-body text-sm font-semibold text-dark-500">
              Réalisé par{' '}
              <Link href={externalLinks.synerghetic} passHref>
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

export default Nav
