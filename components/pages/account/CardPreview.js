import { useState, useEffect } from 'react'
import { ChevronRight } from '../../utils/Icons'

const CardPreview = ({
  title = 'This is a card preview',
  duration = '5',
  level = 'Intermédiaire',
  color = '',
}) => {
  return (
    <div
      style={{ borderColor: color }}
      className={`relative min-w-[250px] items-center rounded-lg border-l-8 border-solid bg-light-100 px-4 py-4 font-body font-bold shadow-level1 transition-[background-color] duration-300 hover:bg-gray-100`}
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

export default CardPreview
