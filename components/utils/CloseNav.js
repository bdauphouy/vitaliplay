import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Button from './Button'
import useMediaQuery from '@mui/material/useMediaQuery'

const CloseNav = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const [buttonSize, setButtonSize] = useState()

  useEffect(() => {
    setButtonSize(isMediumScreen ? 25 : 20)
  }, [isMediumScreen])

  const { getPathByPage } = useContext(LinksContext)

  return (
    <nav
      className="fixed top-0 w-full z-50 md:px-24 px-6
    ">
      <div className="flex justify-between items-center w-full h-20">
        <Link href={getPathByPage('Accueil')} passHref>
          <div className="cursor-pointer md:w-44 w-34 relative self-stretch">
            <Image
              src="/logo.svg"
              alt="vitaliplay"
              layout="fill"
              className="cursor-pointer"
            />
          </div>
        </Link>
        <div className="rotate-45 cursor-pointer">
          <Link href={getPathByPage('Accueil')} passHref>
            <a>
              <Button size={buttonSize} color="#1778F2" />
            </a>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default CloseNav
