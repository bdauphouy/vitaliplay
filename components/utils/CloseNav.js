import Link from 'next/link'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import AddButton from './AddButton'
import useMediaQuery from '@mui/material/useMediaQuery'

const CloseNav = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const [buttonSize, setButtonSize] = useState()

  useEffect(() => {
    setButtonSize(isMediumScreen ? 25 : 20)
  }, [isMediumScreen])

  const { getRewriteByPage } = useContext(LinksContext)

  return (
    <nav
      className="absolute top-0 w-full z-50 md:px-24 px-6
    ">
      <div className="flex justify-between items-center w-full h-20">
        <Link href={getRewriteByPage('Accueil')} passHref>
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
          <Link href={getRewriteByPage('Accueil')} passHref>
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
