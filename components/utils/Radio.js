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
    <div className="h-full relative">
      <input
        defaultChecked={checked}
        onChange={onChange}
        type="radio"
        name={name}
        value={id}
        className="hidden outline-none"
        id={id}
      />
      <label htmlFor={id} className="flex flex-col items-center gap-2 h-full">
        <div
          style={{
            transitionProperty: 'background-color, border-color, color',
          }}
          className={`${
            checked
              ? 'bg-blue-50 border-blue-900 text-blue-900'
              : 'bg-light-100 border-dark-300 text-dark-500'
          } ${
            number
              ? 'flex justify-center items-center text-lg md:text-3xl px-2 py-3 md:px-8 md:py-4 font-head'
              : 'px-6 py-4 text-md font-body'
          } ${type === '1' && !number ? 'h-full' : 'md:h-14 h-10'} ${padding} ${
            center ? 'flex justify-center items-center text-center' : ''
          } ${type === '1' ? 'rounded-lg' : 'rounded'} ${
            checked
              ? 'border-blue-900'
              : type === '2'
              ? 'border-transparent'
              : 'border-dark-300'
          } w-full transition cursor-pointer shadow-level1 font-bold border-solid border-1`}>
          <span
            className={`${
              number ? 'w-10 h-6 md:h-10 flex justify-center items-center' : ''
            }`}>
            {children}
          </span>
        </div>
        {label && (
          <span className="text-sm text-dark-500 w-full lg:w-24 text-center">
            {label}
          </span>
        )}
      </label>
      {type === '2' && checked && (
        <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-900 rounded-full flex justify-center items-center absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          <CheckMark color="#ffffff" size={isMediumScreen ? '14.4' : '12'} />
        </div>
      )}
    </div>
  )
}

Radio.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
