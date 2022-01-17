import { Add } from './Icons'
import PropTypes from 'prop-types'

const AddButton = ({ size = 20, color = '#1778F2' }) => {
  return (
    <button className="pointer-events-none bg-blue-50 rounded-3xl w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <Add size={size} color={color} />
    </button>
  )
}

AddButton.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

export default AddButton
