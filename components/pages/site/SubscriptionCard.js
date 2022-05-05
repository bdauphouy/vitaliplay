import Cta from '@/components/utils/Cta'
import { Stamp, Check } from '@/components/utils/Icons'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import showdown from 'showdown'

const SubscriptionCard = ({
  title = null,
  price = null,
  suffix = '/mois',
  description = 'Lorem ipsum ut dolor',
  variant = null,
  size = 'small',
  stamp = false,
  stampValue = 32,
  subPage = false,
  program = [],
}) => {
  console.log(program)
  const [stampSize, setStampSize] = useState()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const { sitePages, checkoutPages, getPage } = useContext(LinksContext)

  const [converter, setConverter] = useState()

  useEffect(() => {
    setStampSize(isMediumScreen ? 90 : 64)
  }, [isMediumScreen])

  useEffect(() => {
    setConverter(new showdown.Converter())
  }, [])

  return (
    <div
      className={`${
        variant === 'blue' ? 'bg-blue-900' : 'bg-light-100'
      } h-full p-4 pb-6 shadow-level1 lg:p-6 ${
        size === 'big' ? 'lg:py-8' : 'lg:py-6'
      } relative flex flex-col justify-between rounded-lg`}
    >
      <div>
        <div
          className={`${
            !stamp && 'hidden'
          } absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 transform`}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform font-head text-lg font-bold md:text-xl">
            -{stampValue}%
          </div>

          <Stamp size={stampSize} color="#FFA799" />
        </div>

        <h3
          className={`${
            variant === 'blue' ? 'text-light-100' : 'text-dark-700'
          } font-head text-lg font-bold ${size === 'big' && 'lg:text-xl'}`}
        >
          {title}
        </h3>
        <h4
          className={`${size === 'small' && 'lg:mt-1'} ${
            variant === 'blue' ? 'text-light-80' : 'text-dark-700'
          } mt-3 font-body text-sm font-normal lg:text-base`}
        >
          <span
            className={`${
              variant === 'blue' ? 'text-light-100' : 'text-dark-900'
            } font-head text-4xl font-bold ${
              size === 'big' && 'lg:text-5xl lg:font-extrabold'
            } pr-2`}
          >
            €{price}
          </span>
          {suffix}
        </h4>
        <p
          className={`${
            variant === 'blue'
              ? 'border-light-60 text-light-100'
              : 'border-dark-100 text-dark-500'
          } mt-4 font-body text-md font-normal ${
            program.length > 0 && subPage && 'border-b-1 border-solid pb-6'
          }`}
          dangerouslySetInnerHTML={{
            __html: converter?.makeHtml(description.replaceAll('\n', '<br />')),
          }}
        ></p>
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
                      } ml-4 text-md`}
                    >
                      {item.subscriptionBenefit}
                    </p>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
      <div
        className={`${size === 'big' ? 'mt-0' : 'mt-4'} flex justify-center`}
      >
        <Link
          href={
            subPage
              ? `${
                  getPage(checkoutPages, 'pageName', 'Paiement').path
                }?abonnement=${title}`
              : getPage(sitePages, 'pageName', 'Abonnements').path
          }
          passHref
        >
          <a>
            <Cta
              size={size === 'big' ? 'xl' : 'l'}
              type="primary"
              invert={variant === 'blue'}
            >
              {subPage ? 'Choisir cette offre' : 'En savoir plus'}
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SubscriptionCard
