import { ArrowLeft, ArrowRight } from './Icons'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Cta = ({
  children = 'Click',
  size = 'm',
  buttonType = 'button',
  type = 'primary',
  arrow = null,
  invert = false,
  textColor = 'text-blue-900',
}) => {
  const [classes, setClasses] = useState([])
  const [arrowSize, setArrowSize] = useState(18)
  const [arrowColor, setArrowColor] = useState('bg-light-100')

  useEffect(() => {
    switch (size) {
      case 's':
        setClasses([
          'text-xs',
          type !== 'link' ? 'px-2' : 'hover:gap-3',
          'py-1.25',
          'rounded',
          'gap-1',
        ])
        setArrowSize(12)
        break
      case 'm':
        setClasses([
          'text-sm',
          type !== 'link' ? 'px-4' : 'hover:gap-3',
          'py-1.75',
          'rounded',
          'gap-1',
        ])
        setArrowSize(18)
        break
      case 'l':
        setClasses([
          'text-lg',
          type !== 'link' ? 'px-6' : 'hover:gap-4',
          'py-2.5',
          'rounded-lg',
          'gap-2',
        ])
        setArrowSize(24)
        break
      case 'xl':
        setClasses([
          'text-lg',
          type !== 'link' ? 'px-6' : 'hover:gap-4',
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
        setClasses((classes) => [
          ...classes,
          `${
            invert
              ? 'bg-light-100 hover:bg-light-80 text-blue-900'
              : 'bg-blue-900 hover:bg-blue-700 text-light-100'
          }`,
        ])
        setArrowColor(invert ? '#1778F2' : '#FFFFFF')
        break
      case 'secondary':
        setClasses((classes) => [
          ...classes,
          'bg-blue-50 hover:bg-blue-100',
          'text-blue-900',
        ])
        setArrowColor('#1778F2')
        break
      case 'disabled':
        setClasses((classes) => [...classes, 'bg-blue-50', 'text-blue-300'])
        setArrowColor('#A2C9FA')
        break
      case 'link':
        setClasses((classes) => [...classes, textColor])
        setArrowColor((textColor === 'text-blue-900' && '#1778F2') || '#727272')
        break
      default:
        break
    }
  }, [invert, textColor, size, type])

  return (
    <button
      type={buttonType}
      className={`${classes.join(
        ' '
      )} flex items-center font-body font-semibold transition-[background-color,gap,color] duration-300`}
    >
      {arrow === 'left' && <ArrowLeft color={arrowColor} size={arrowSize} />}
      {children}
      {arrow === 'right' && <ArrowRight color={arrowColor} size={arrowSize} />}
    </button>
  )
}

Cta.propTypes = {
  children: PropTypes.string,
  size: PropTypes.oneOf(['s', 'm', 'l', 'xl']),
  buttonType: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'disabled', 'link']),
  arrow: PropTypes.oneOf(['left', 'right']),
  invert: PropTypes.bool,
  textColor: PropTypes.string,
}

export default Cta
