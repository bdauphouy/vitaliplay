import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Tag = ({ children = 'A tag', type = '1' }) => {
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
      className={`${color} inline-block border-solid border-l-8 font-body font-bold text-xs px-2 py-1.25 rounded bg-light-100`}>
      {children}
    </div>
  )
}

Tag.propTypes = {
  children: PropTypes.string,
  type: PropTypes.oneOf(['1', '2', '3', '4']),
}

export default Tag
