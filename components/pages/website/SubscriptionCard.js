import Cta from '../../utils/Cta'
import { Stamp, Check } from '../../utils/Icons'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '../../../contexts/LinksContext'

const SubscriptionCard = ({
  title = 'This is a subscrption',
  price = '10',
  suffix = '/mois',
  description = 'Lorem ipsum ut dolor',
  variant = null,
  size = 'small',
  stamp = false,
  stampValue = '31',
  subPage = false,
  program = [
    { point: 'Lorem ipsum ut dolor' },
    { point: 'Lorem ipsum ut dolor' },
    { point: 'Lorem ipsum ut dolor' },
    { point: 'Lorem ipsum ut dolor' },
  ],
}) => {
  const [stampSize, setStampSize] = useState()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const { getRewriteByPage, getPathByPage } = useContext(LinksContext)

  useEffect(() => {
    setStampSize(isMediumScreen ? 90 : 64)
  }, [isMediumScreen])

  return (
    <div
      className={`${
        variant === 'blue' ? 'bg-blue-900' : 'bg-light-100'
      } shadow-level1 h-full p-4 pb-6 lg:p-6 ${
        size === 'big' ? 'lg:py-8' : 'lg:py-6'
      } rounded-lg relative flex flex-col justify-between`}>
      <div>
        <div
          className={`${
            !stamp && 'hidden'
          } absolute right-0 top-0 transform translate-x-1/3 -translate-y-1/3`}>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-head font-bold text-lg md:text-xl">
            -{stampValue}%
          </div>

          <Stamp size={stampSize} color="#FFA799" />
        </div>

        <h3
          className={`${
            variant === 'blue' ? 'text-light-100' : 'text-dark-700'
          } font-head font-bold text-lg ${size === 'big' && 'lg:text-xl'}`}>
          {title}
        </h3>
        <h4
          className={`${size === 'small' && 'lg:mt-1'} ${
            variant === 'blue' ? 'text-light-80' : 'text-dark-700'
          } font-body font-normal text-sm mt-3 lg:text-base`}>
          <span
            className={`${
              variant === 'blue' ? 'text-light-100' : 'text-dark-900'
            } text-light-100 font-head font-bold text-4xl ${
              size === 'big' && 'lg:text-5xl lg:font-extrabold'
            } pr-2`}>
            €{price}
          </span>
          {suffix}
        </h4>
        <p
          className={`${
            variant === 'blue'
              ? 'text-light-100 border-light-60'
              : 'text-dark-500 border-dark-100'
          } mt-4 font-body text-md font-normal ${
            program.length > 0 && subPage && 'border-b-1 pb-6 border-solid'
          }`}
          dangerouslySetInnerHTML={{ __html: description }}></p>
        <ul className={`flex flex-col gap-4 ${program.length > 0 && 'py-6'}`}>
          {subPage &&
            program.map((item, i) => {
              return (
                <li key={i}>
                  <div className="flex">
                    <div>
                      <Check
                        size={16}
                        color={variant === 'blue' ? '#FFFFFF' : '#1778F2'}
                      />
                    </div>
                    <p
                      className={`font-normal ${
                        variant === 'blue' ? 'text-light-100' : 'text-dark-500'
                      } text-md ml-4`}>
                      {item.point}
                    </p>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href={
            subPage
              ? getRewriteByPage('Paiement')
              : getPathByPage('Abonnements')
          }
          passHref>
          <a>
            <Cta
              size={size === 'big' ? 'xl' : 'l'}
              type="primary"
              invert={variant === 'blue'}>
              {subPage ? 'Choisir cette offre' : 'En savoir plus'}
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

SubscriptionCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  suffix: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf([null, 'blue']),
  size: PropTypes.oneOf(['small', 'big']),
  stamp: PropTypes.bool,
  stampValue: PropTypes.string,
  subPage: PropTypes.bool,
  program: PropTypes.array,
}

export default SubscriptionCard
