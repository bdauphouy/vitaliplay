import { useState, useEffect } from 'react'
import { ChevronRight } from '../../utils/Icons'
import PropTypes from 'prop-types'

const CardPreview = ({
  title = 'This is a card preview',
  duration = '5',
  level = 'Intermédiaire',
  type = '1',
}) => {
  const [color, setColor] = useState('border-light-100')

  useEffect(() => {
    switch (type) {
      case '1':
        setColor('border-orange-900')
        break
      case '2':
        setColor('border-green-900')
        break
      case '3':
        setColor('border-yellow-900')
        break
      case '4':
        setColor('border-blue-900')
        break
      default:
        break
    }
  }, [type])

  return (
    <div
      className={`${color} relative min-w-[250px] items-center rounded-lg border-l-8 border-solid bg-light-100 px-4 py-4 font-body font-bold shadow-level1 transition-[background-color] duration-300 hover:bg-gray-100`}
    >
      <h3 className="w-2/3 font-head text-lg font-bold leading-6 text-dark-900">
        {title}
      </h3>
      <p className="mt-2 text-sm font-normal text-dark-500">
        {duration} min - {level}
      </p>
      <div className="absolute right-5 top-1/2 -translate-y-1/2 transform">
        <ChevronRight size={30} color="#727272" />
      </div>
    </div>
  )
}

CardPreview.propTypes = {
  title: PropTypes.string,
  duration: PropTypes.string,
  level: PropTypes.string,
  type: PropTypes.oneOf(['1', '2', '3', '4']),
}

export default CardPreview
