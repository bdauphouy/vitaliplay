import Cta from '@/components/utils/Cta'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'

const SolutionCard = ({
  icon,
  title = 'A solution',
  description = 'This is a solution',
  variant,
}) => {
  const { sitePages, getPage } = useContext(LinksContext)

  return (
    <div
      className={`flex min-h-72 w-full flex-col items-start justify-between rounded-lg px-4 py-4 sm:px-8 sm:pt-8 ${
        variant === 'blue'
          ? 'bg-blue-50'
          : 'border-1 border-solid border-gray-200 bg-light-100'
      }`}
    >
      {icon && <Image src={icon} width="60" height="60" alt="icon" />}
      <h3 className="mt-9 font-head text-xl font-bold text-dark-900 ">
        {title}
      </h3>
      <p className="mt-4 font-body text-md font-normal text-dark-500">
        {description}
      </p>
      <div className="mt-8">
        <Link
          href={getPage(sitePages, 'pageName', 'Notre solution').path}
          passHref
        >
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

export default SolutionCard
