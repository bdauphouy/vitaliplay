import Cta from '@/components/utils/Cta'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'

const CardSolution = ({ icon, title, description, variant }) => {
  const { getPathByPage } = useContext(LinksContext)

  return (
    <div
      className={`w-full sm:px-8 min-h-72 sm:py-6 px-4 py-4 sm:pt-11 pt-7 rounded-lg flex flex-col items-start justify-between ${
        variant === 'blue'
          ? 'bg-blue-50'
          : 'bg-light-100 border-solid border-1 border-gray-200'
      }`}>
      <Image src={icon} width="60" height="60" alt="icon" />
      <h3 className="font-head font-bold text-xl text-dark-900 mt-9 ">
        {title}
      </h3>
      <p className="font-body font-normal text-md text-dark-500 mt-4">
        {description}
      </p>
      <div className="mt-8">
        <Link href={getPathByPage('Notre solution')}>
          <a>
            <Cta size="m" type="link" arrow="right" textColor="text-dark-500">
              En savoir plus
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default CardSolution
