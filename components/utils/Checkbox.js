import { CheckMark } from '@/components/utils/Icons'

const Checkbox = ({ children, id, selected, name, onChange, checked }) => {
  return (
    <div>
      <input
        defaultChecked={selected}
        onChange={onChange}
        type="checkbox"
        name={name}
        value={id}
        id={id}
        className="hidden outline-none"
      />
      <label htmlFor={id}>
        <div
          style={{
            transitionProperty: 'background-color, border-color, color',
          }}
          className={`${
            checked
              ? 'bg-blue-50 border-blue-900 text-blue-900'
              : 'bg-light-100 border-dark-300 text-dark-500'
          } flex items-center gap-4 px-5 py-3 text-md font-body transition cursor-pointer rounded-lg shadow-level1 font-bold border-solid border-1`}>
          <div
            style={{ transitionProperty: 'background-color, border-color' }}
            className={`max-w-5 max-h-5 flex justify-center items-center rounded-full border-solid border-2 transition relative check-mark ${
              checked
                ? 'border-blue-900 bg-blue-900'
                : 'border-dark-500 bg-transparent'
            }`}>
            <div
              style={{ transitionProperty: 'opacity' }}
              className={`transition ${checked ? 'opacity-100' : 'opacity-0'}`}>
              <CheckMark color="#FFFFFF" size={12} />
            </div>
          </div>
          <span>{children}</span>
        </div>
      </label>
    </div>
  )
}

export default Checkbox
