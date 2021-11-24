import Cta from './Cta'
import { Gift, Stamp } from './Icons'
import useResponsiveState from '../hooks/useResponsiveState'
import { Check } from './Icons'

const SubscriptionPreview = ({
  title,
  price,
  suffix,
  description,
  variant = null,
  size = 'small',
  stamp = false,
  subPage = false,
  program = [],
}) => {
  const giftSize = useResponsiveState(768, { from: 50, to: 35 })
  const stampSize = useResponsiveState(768, { from: 90, to: 64 })

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
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Gift size={giftSize} />
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
            program.length > 0 && 'border-b-1 pb-6 border-solid'
          }`}>
          {description}
        </p>
        <ul className={`flex flex-col gap-4 ${program.length > 0 && 'py-6'}`}>
          {program.map((item, i) => {
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
                    {item}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex justify-center mt-8">
        <Cta
          size={size === 'big' ? 'xl' : 'l'}
          type="primary"
          invert={variant === 'blue'}>
          {subPage ? 'Choisir cette offre' : 'En savoir plus'}
        </Cta>
      </div>
    </div>
  )
}

export default SubscriptionPreview
