import { Add } from './Icons'

const AddButton = ({ size = 20, color = '#1778F2' }) => {
  return (
    <button className="pointer-events-none flex h-8 w-8 items-center justify-center rounded-3xl bg-blue-50 md:h-10 md:w-10">
      <Add size={size} color={color} />
    </button>
  )
}

export default AddButton
