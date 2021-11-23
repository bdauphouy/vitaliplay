import { useState, useEffect } from 'react'
import { ChevronRight } from './Icons'

const CardPreview = ({ title, duration, level, type }) => {
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
      className={`${color} relative max-w-sm items-center border-solid border-l-8 font-body font-bold px-4 py-4 rounded-lg bg-light-100 drop-shadow-level1`}>
      <h3 className="font-head font-bold text-lg w-2/3">{title}</h3>
      <p className="text-dark-500 mt-2 text-sm font-normal">
        {duration} min - {level}
      </p>
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <ChevronRight size={30} color="stroke-gray" />
      </div>
    </div>
  )
}

export default CardPreview
