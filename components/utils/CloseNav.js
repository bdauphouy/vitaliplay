import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import AddButton from './AddButton'
import useMediaQuery from '@mui/material/useMediaQuery'

const CloseNav = (target = 'site') => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const [buttonSize, setButtonSize] = useState()

  useEffect(() => {
    setButtonSize(isMediumScreen ? 25 : 20)
  }, [isMediumScreen])

  const { getPage, sitePages } = useContext(LinksContext)

  return (
    <nav
      className="fixed top-0 z-50 w-full bg-light-100 px-6 md:px-24 xl:bg-transparent
    "
    >
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
        <div className="rotate-45 cursor-pointer">
          <Link href={getPage(sitePages, 'pageName', 'Accueil').path} passHref>
            <a>
              <AddButton size={buttonSize} color="#1778F2" />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default CloseNav
