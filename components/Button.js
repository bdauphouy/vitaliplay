import { Add } from './Icons'

const Button = ({ size }) => {
  return (
    <button className="pointer-events-none bg-blue-50 rounded-3xl w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
      <Add size={size} />
    </button>
  )
}

export default Button
