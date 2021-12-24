import { useState, useEffect } from 'react'

const Tag = ({ children, type }) => {
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
  }, [])

  return (
    <div
      className={`${color} inline-block border-solid border-l-8 font-body font-bold text-xs px-2 py-1.25 rounded bg-light-100`}>
      {children}
    </div>
  )
}

export default Tag
