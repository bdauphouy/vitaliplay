import Link from 'next/link'
import Image from 'next/image'
import Cta from '@/components/utils/Cta'
import { useEffect, useRef, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import {
  User,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
} from '@/components/utils/Icons'
import { LinksContext } from '@/contexts/LinksContext'
import useMediaQuery from '@mui/material/useMediaQuery'
import Title from '@/components/utils/Title'

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
  const { externalPages, accountPages, getPage } = useContext(LinksContext)

  const [menu, setMenu] = useState(false)

  const isExtraLargeScreen = useMediaQuery('(min-width: 1280px)')
  const [hiddenPages] = useState(['Profil', 'Ajouter un moyen de paiement'])

  const router = useRouter()

  const marker = useRef()

  useEffect(() => {
    const navItems = document.querySelectorAll('.nav-item')

    navItems.forEach((navItem) => {
      const updateMarker = () => {
        if (!marker) return

        if (
          router.route.startsWith(
            getPage(accountPages, 'pageName', 'Profil').path
          ) ||
          router.route.startsWith(
            getPage(accountPages, 'pageName', 'Ajouter un moyen de paiement')
              .path
          )
        ) {
          return
        }

        marker.current.style.left = `${navItem.offsetLeft}px`
        marker.current.style.width = `${navItem.offsetWidth}px`
      }

      if (
        router.route.startsWith(
          getPage(accountPages, 'pageName', navItem.innerText).path
        )
      ) {
        updateMarker()
      }
    })
  }, [router, isExtraLargeScreen])

  const closeNav = () => setMenu(false)

  return (
    <>
      <nav
        className="fixed top-0 z-50 hidden h-20 w-full items-center justify-between bg-light-100 px-6 shadow-level1 md:px-24 xl:flex
    "
      >
        <Link href={getPage(accountPages, 'pageName', 'Accueil').path} passHref>
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
          {accountPages.map((accountPage, i) => {
            if (hiddenPages.includes(accountPage.pageName)) return
            return (
              <li
                key={i}
                className="h-full transition-[background-color] duration-300 hover:bg-blue-50"
              >
                <Link href={accountPage.path}>
                  <a
                    className={`nav-item inline-flex h-full items-center px-6 font-head text-lg font-semibold ${
                      accountPage.pageName === 'Accueil'
                        ? router.route.split('?')[0] ===
                          getPage(accountPages, 'pageName', 'Accueil').path
                          ? 'text-blue-900'
                          : 'text-dark-300'
                        : router.route.startsWith(accountPage.path)
                        ? 'text-blue-900'
                        : 'text-dark-300'
                    }`}
                  >
                    {accountPage.pageName}
                  </a>
                </Link>
              </li>
            )
          })}
          <li className="ml-6">
            <Link
              href={getPage(accountPages, 'pageName', 'Profil').path}
              passHref
            >
              <a>
                <div
                  className={`box-content flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-4 border-solid border-transparent bg-blue-900 transition-[border-color] duration-300 hover:border-blue-300 ${
                    router.route.startsWith(
                      getPage(accountPages, 'pageName', 'Profil').path
                    )
                      ? 'border-blue-300'
                      : ''
                  }`}
                >
                  <User color="#FFFFFF" size={24} />
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <nav
        className="fixed top-0 z-50 flex w-full flex-col bg-light-100 px-6 shadow-level1 md:px-24 xl:hidden
    "
      >
        <div className="flex h-20 w-full items-center justify-between">
          <Link
            href={getPage(accountPages, 'pageName', 'Accueil').path}
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
          <div className="mb-8 flex flex-col">
            <div className="flex items-center gap-6 border-b-1 border-solid pb-6 xl:hidden">
              <div className="min-h-[72px] min-w-[72px] rounded-full bg-gray-100 bg-[url(https://thispersondoesnotexist.com/image)] bg-cover sm:min-h-[96px] sm:min-w-[96px]"></div>
              <div>
                <Title type="5">Guillaume Clerisseau</Title>
                <Link
                  href={getPage(accountPages, 'pageName', 'Profil').path}
                  passHref
                >
                  <a onClick={closeNav}>
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
            <ul className="mt-2">
              {accountPages.map((accountPage, i) => {
                if (hiddenPages.includes(accountPage.pageName)) return

                return (
                  <li onClick={closeNav} key={i}>
                    <Link href={accountPage.path}>
                      <a
                        className={`inline-flex h-full w-full items-center py-4 font-head text-lg font-semibold ${
                          accountPage.pageName === 'Accueil'
                            ? router.route ===
                              getPage(accountPages, 'pageName', 'Accueil').path
                              ? 'text-blue-900'
                              : 'text-dark-300'
                            : router.route.startsWith(accountPage.path)
                            ? 'text-blue-900'
                            : 'text-dark-300'
                        }`}
                      >
                        {accountPage.pageName}
                      </a>
                    </Link>
                  </li>
                )
              })}
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
