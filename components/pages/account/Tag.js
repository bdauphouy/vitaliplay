import { useState, useEffect } from 'react'

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
      className={`${color} inline-block rounded border-l-8 border-solid bg-light-100 px-2 py-1.25 font-body text-xs font-bold`}
    >
      {children}
    </div>
  )
}

export default Tag
