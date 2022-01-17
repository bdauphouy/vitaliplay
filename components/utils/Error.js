import PropTypes from 'prop-types'

const Error = ({ children = '' }) => {
  return (
    <span className="mt-1 font-body font-normal text-md text-warning-500">
      {children}
    </span>
  )
}

Error.propTypes = {
  children: PropTypes.string,
}

export default Error
