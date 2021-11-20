import Cta from './Cta'
import { Gift } from './Icons'
import useResponsiveState from '../hooks/useResponsiveState'

const SubscriptionPreview = ({
  title,
  price,
  suffix,
  description,
  variant = null,
  responsive = 'small',
  stamp = false,
}) => {
  const giftSize = useResponsiveState(1024, { from: 40, to: 28 })

  return (
    <div
      className={`${
        variant === 'blue' ? 'bg-blue-900' : 'bg-light-100'
      } drop-shadow-level1 p-4 pb-6 lg:p-6 lg:pb-8 rounded-lg h-full relative`}>
      <div
        className={`${
          !stamp && 'hidden'
        } absolute right-0 top-0 transform translate-x-1/3 -translate-y-1/3`}>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-1">
          <Gift size={giftSize} />
        </div>
        <img src="/stamp.svg" alt="stamp" className="w-16 lg:w-24" />
      </div>

      <h3
        className={`${
          variant === 'blue' ? 'text-light-100' : 'text-dark-700'
        } font-head font-bold text-lg`}>
        {title}
      </h3>
      <h4
        className={`${responsive === 'small' && 'lg:mt-1'} ${
          variant === 'blue' ? 'text-light-80' : 'text-dark-700'
        } font-body font-normal text-sm mt-3`}>
        <span
          className={`${
            variant === 'blue' ? 'text-light-100' : 'text-dark-900'
          } text-light-100 font-head font-bold text-4xl pr-2`}>
          €{price}
        </span>
        {suffix}
      </h4>
      <p
        className={`${responsive === 'small' && 'lg:mt-4'} ${
          variant === 'blue' ? 'text-light-100' : 'text-dark-500'
        } mt-6 font-body text-md font-normal`}>
        {description}
      </p>
      <div
        className={`${
          responsive === 'small' && 'lg:mt-6'
        } mt-10 flex justify-center`}>
        <Cta size="l" type="primary" invert={variant === 'blue'}>
          En savoir plus
        </Cta>
      </div>
    </div>
  )
}

export default SubscriptionPreview
