import { ArrowLeft, ArrowRight } from './Icons'
import { useState, useEffect } from 'react'

const Cta = ({
  children,
  size = 'm',
  buttonType = 'button',
  type = 'primary',
  arrow = null,
  invert = false,
  textColor = '#1778F2',
}) => {
  const [classes, setClasses] = useState([])
  const [arrowSize, setArrowSize] = useState(18)
  const [arrowColor, setArrowColor] = useState('bg-light-100')

  useEffect(() => {
    switch (size) {
      case 's':
        setClasses([
          'text-xs',
          type !== 'link' && 'px-2',
          'py-1.25',
          'rounded',
          'gap-1',
        ])
        setArrowSize(12)
        break
      case 'm':
        setClasses([
          'text-sm',
          type !== 'link' && 'px-4',
          'py-1.75',
          'rounded',
          'gap-1',
        ])
        setArrowSize(18)
        break
      case 'l':
        setClasses([
          'text-lg',
          type !== 'link' && 'px-6',
          'py-2.5',
          'rounded-lg',
          'gap-2',
        ])
        setArrowSize(24)
        break
      case 'xl':
        setClasses([
          'text-lg',
          type !== 'link' && 'px-6',
          'py-3',
          'rounded-lg',
          'gap-2',
        ])
        setArrowSize(24)
        break
      default:
        break
    }

    switch (type) {
      case 'primary':
        setClasses(classes => [
          ...classes,
          `${
            invert ? 'bg-light-100 text-blue-900' : 'bg-blue-900 text-light-100'
          }`,
        ])
        setArrowColor('#FFFFFF')
        break
      case 'secondary':
        setClasses(classes => [...classes, 'bg-blue-50', 'text-blue-900'])
        setArrowColor('#1778F2')
        break
      case 'disabled':
        setClasses(classes => [...classes, 'bg-blue-50', 'text-blue-300'])
        setArrowColor('#A2C9FA')
        break
      case 'link':
        setClasses(classes => [...classes, textColor])
        setArrowColor('#727272')
        break
      default:
        break
    }
  }, [invert, textColor, size, type])

  return (
    <button
      type={buttonType}
      className={`${classes.join(
        ' ',
      )} font-body font-semibold flex items-center`}>
      {arrow === 'left' && <ArrowLeft color={arrowColor} size={arrowSize} />}
      {children}
      {arrow === 'right' && <ArrowRight color={arrowColor} size={arrowSize} />}
    </button>
  )
}

export default Cta