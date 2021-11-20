import { ArrowLeft, ArrowRight } from './Icons'
import { useState, useEffect } from 'react'

const Cta = ({
  children,
  size = 'm',
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
        setClasses(classes => [
          ...classes,
          'text-xs',
          type !== 'link' && 'px-2',
          'py-1.25',
          'rounded',
          'gap-1',
        ])
        setArrowSize(12)
        break
      case 'm':
        setClasses(classes => [
          ...classes,
          'text-sm',
          type !== 'link' && 'px-4',
          'py-1.75',
          'rounded',
          'gap-1',
        ])
        setArrowSize(18)
        break
      case 'l':
        setClasses(classes => [
          ...classes,
          'text-lg',
          type !== 'link' && 'px-6',
          'py-2.5',
          'rounded-lg',
          'gap-2',
        ])
        setArrowSize(24)
        break
      case 'xl':
        setClasses(classes => [
          ...classes,
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
        setArrowColor('stroke-light')
        break
      case 'secondary':
        setClasses(classes => [...classes, 'bg-blue-50', 'text-blue-900'])
        setArrowColor('stroke-primary')
        break
      case 'disabled':
        setClasses(classes => [...classes, 'bg-blue-50', 'text-blue-300'])
        setArrowColor('stroke-disabled')
        break
      case 'link':
        setClasses(classes => [...classes, textColor])
        setArrowColor('stroke-gray')
        break
      default:
        break
    }
  }, [])

  return (
    <button
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
