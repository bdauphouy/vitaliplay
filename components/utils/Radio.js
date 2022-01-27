import { useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'
import { CheckMark } from './Icons'

const Radio = ({
  children = 'Choice',
  id,
  name,
  onChange,
  checked = false,
  number = false,
  label = '',
  center = false,
  padding = 'md:p-6',
  type = '1',
}) => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="relative h-full">
      <input
        defaultChecked={checked}
        onChange={onChange}
        type="radio"
        name={name}
        value={id}
        className="hidden outline-none"
        id={id}
      />
      <label htmlFor={id} className="flex h-full flex-col items-center gap-2">
        <div
          style={{
            transitionProperty: 'background-color, border-color, color',
          }}
          className={`${
            checked
              ? 'border-blue-900 bg-blue-50 text-blue-900'
              : 'border-dark-300 bg-light-100 text-dark-500'
          } ${
            number
              ? 'flex items-center justify-center px-2 py-3 font-head text-lg md:px-8 md:py-4 md:text-3xl'
              : 'px-6 py-4 font-body text-md'
          } ${type === '1' && !number ? 'h-full' : 'h-10 md:h-14'} ${padding} ${
            center ? 'flex items-center justify-center text-center' : ''
          } ${type === '1' ? 'rounded-lg' : 'rounded'} ${
            checked
              ? 'border-blue-900'
              : type === '2'
              ? 'border-transparent'
              : 'border-dark-300'
          } w-full cursor-pointer border-1 border-solid font-bold shadow-level1 transition`}
        >
          <span
            className={`${
              number ? 'flex h-6 w-10 items-center justify-center md:h-10' : ''
            }`}
          >
            {children}
          </span>
        </div>
        {label && (
          <span className="w-full text-center text-sm text-dark-500 lg:w-24">
            {label}
          </span>
        )}
      </label>
      {type === '2' && checked && (
        <div className="absolute top-0 right-0 flex h-5 w-5 translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-blue-900 md:h-6 md:w-6">
          <CheckMark color="#ffffff" size={isMediumScreen ? '14.4' : '12'} />
        </div>
      )}
    </div>
  )
}

Radio.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
  ]),
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  number: PropTypes.bool,
  label: PropTypes.string,
  center: PropTypes.bool,
  padding: PropTypes.string,
  type: PropTypes.string,
}

export default Radio
