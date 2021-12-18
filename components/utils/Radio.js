const Radio = ({
  children,
  id,
  selected,
  name,
  onChange,
  checked,
  number,
  label,
}) => {
  return (
    <div>
      <input
        defaultChecked={selected}
        onChange={onChange}
        type="radio"
        name={name}
        value={id}
        className="hidden outline-none"
        id={id}
      />
      <label htmlFor={id} className="flex flex-col items-center gap-2">
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
              : 'px-6 py-5 md:p-6 text-md font-body'
          } w-full transition cursor-pointer rounded-lg shadow-level1 font-bold border-solid border-1`}>
          <span
            className={`${
              number ? 'w-10 h-6 md:h-10 flex justify-center items-center' : ''
            }`}>
            {children}
          </span>
        </div>
        <span className="text-sm text-dark-500 w-full lg:w-24 text-center">
          {label}
        </span>
      </label>
    </div>
  )
}

export default Radio
