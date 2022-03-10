import { ArrowLeft, ArrowRight } from './Icons'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Spin = () => {
  return (
    <svg
      role="status"
      className="dark:text-gray-600 mr-2 -ml-2 h-6 w-6 animate-spin fill-blue-900 text-gray-200"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  )
}

const Cta = ({
  children = 'Click',
  size = 'm',
  buttonType = 'button',
  type = 'primary',
  arrow = null,
  invert = false,
  textColor = 'text-blue-900',
  loading = false,
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
      {loading && <Spin />}
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
