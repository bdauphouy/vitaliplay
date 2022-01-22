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
      className="w-7 h-6 relative cursor-pointer"
      onClick={() => setMenu(menu => !menu)}>
      <span
        className={`burger-span bg-blue-900 ${
          menu ? 'rotate-45' : '-mt-2'
        } transition`}
        style={{
          transitionProperty: 'margin-top, transform',
        }}></span>
      <span
        className={`burger-span ${
          menu ? 'bg-transparent' : 'bg-blue-900'
        } transition`}
        style={{ transitionProperty: 'background-color, transform' }}></span>
      <span
        className={`burger-span bg-blue-900 ${
          menu ? '-rotate-45' : 'mt-2'
        } transition`}
        style={{ transitionProperty: 'margin-top, transform' }}></span>
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

    navItems.forEach(navItem => {
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
        className="hidden fixed top-0 z-50 w-full xl:flex h-20 bg-light-100 items-center md:px-24 px-6 justify-between shadow-level1
    ">
        <Link
          href={
            getRewriteByPage('Accueil')
              ? getRewriteByPage('Accueil')
              : getPathByPage('Accueil')
          }
          passHref>
          <div className="cursor-pointer md:w-44 w-34 relative self-stretch">
            <Image
              src="/logo.svg"
              alt="vitaliplay"
              layout="fill"
              className="cursor-pointer"
            />
          </div>
        </Link>
        <ul className="flex relative h-full items-center">
          <div
            className="absolute h-1 bg-blue-900 bottom-0 transition"
            ref={marker}
            style={{
              transitionProperty: 'width, left',
            }}></div>
          {navLinks.map((navLink, i) => {
            return (
              !navLink.mobileNav && (
                <li key={i} className="h-full">
                  <Link href={navLink.rewrite || navLink.path}>
                    <a
                      className={`nav-item font-head font-semibold text-lg px-6 h-full inline-flex items-center ${
                        (router.route.includes(navLink.path) ||
                          router.route.includes(navLink.rewrite)) &&
                        navLink.rewrite !== '/' &&
                        navLink.path !== '/'
                          ? 'text-blue-900'
                          : router.route === navLink.path ||
                            router.route === navLink.rewrite
                          ? 'text-blue-900'
                          : 'text-dark-300'
                      }`}>
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
                  <div className="w-12 h-12 rounded-full bg-blue-900 flex justify-center items-center cursor-pointer">
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
                passHref>
                <div>
                  <Cta size="l">Connexion</Cta>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <nav
        className="fixed top-0 w-full z-50 flex flex-col xl:hidden bg-light-100 md:px-24 px-6 shadow-level1
    ">
        <div className="flex justify-between items-center w-full h-20">
          <Link
            href={
              getRewriteByPage('Accueil')
                ? getRewriteByPage('Accueil')
                : getPathByPage('Accueil')
            }
            passHref>
            <div className="cursor-pointer md:w-44 w-34 relative self-stretch">
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
          } bg-white overflow-hidden absolute w-full top-full left-0 px-6 md:px-24 transition duration-500`}
          style={{ transitionProperty: 'max-height' }}>
          <div className="flex flex-col-reverse mb-8">
            <ul>
              {navLinks.map((navLink, i) => {
                return (
                  <li key={i}>
                    <Link href={navLink.rewrite || navLink.path}>
                      <a
                        onClick={() => setMenu(false)}
                        className={`w-full font-head font-semibold text-lg py-4 h-full inline-flex items-center ${
                          (router.route.includes(navLink.path) ||
                            router.route.includes(navLink.rewrite)) &&
                          navLink.rewrite !== '/' &&
                          navLink.path !== '/'
                            ? 'text-blue-900'
                            : router.route === navLink.path ||
                              router.route === navLink.rewrite
                            ? 'text-blue-900'
                            : 'text-dark-300'
                        }`}>
                        {navLink.page}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div
              className={isAuth ? 'my-4 pb-6 border-b-1 border-dark-50' : ''}>
              {isAuth && (
                <>
                  <div className="hidden w-12 h-12 rounded-full bg-blue-900 xl:flex justify-center items-center cursor-pointer">
                    <User color="#FFFFFF" size={24} />
                  </div>
                  <div className="xl:hidden flex items-center gap-6">
                    <div className="min-w-[72px] min-h-[72px] sm:min-w-[96px] sm:min-h-[96px] rounded-full bg-gray-100"></div>
                    <div>
                      <Title type="5">Guillaume Clerisseau</Title>
                      <Link href={getRewriteByPage('Profil')} passHref>
                        <a onClick={() => setMenu(false)}>
                          <Cta
                            size="m"
                            type="link"
                            arrow="right"
                            textColor="text-blue-900">
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
              <h3 className="font-body font-semibold text-base text-dark-900">
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
          <div className="border-solid border-t-1 border-dark-50 flex justify-between pb-4 mt-16">
            <h4 className="font-body font-semibold text-sm mt-4 text-dark-500">
              Réalisé par{' '}
              <Link href={externalLinks.synerghetic} passHref>
                <span className="cursor-pointer">
                  <u>Synerg’hetic</u> 💜
                </span>
              </Link>
            </h4>
            <h4 className="font-body font-semibold text-sm mt-4 text-dark-500">
              Vitaliplay &copy; 2021
            </h4>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
