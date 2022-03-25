import { CheckMark } from './Icons'

const Checkbox = ({
  children = 'Choice',
  id = '1',
  name = 'choice',
  onChange,
  checked = false,
}) => {
  return (
    <div>
      <input
        defaultChecked={checked}
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
              ? 'border-blue-900 bg-blue-50 text-blue-900'
              : 'border-dark-300 bg-light-100 text-dark-500'
          } flex cursor-pointer items-center gap-4 rounded-lg border-1 border-solid px-5 py-3 font-body text-md font-bold shadow-level1 transition`}
        >
          <div
            style={{ transitionProperty: 'background-color, border-color' }}
            className={`max-w-5 check-mark relative flex max-h-5 items-center justify-center rounded-full border-2 border-solid transition ${
              checked
                ? 'border-blue-900 bg-blue-900'
                : 'border-dark-500 bg-transparent'
            }`}
          >
            <div
              style={{ transitionProperty: 'opacity' }}
              className={`transition ${checked ? 'opacity-100' : 'opacity-0'}`}
            >
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
