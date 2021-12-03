import { v4 as uuidv4 } from 'uuid'
import { useState, useRef, useEffect } from 'react'

const Input = ({
  label,
  placeholder,
  type = 'text',
  name,
  onChange,
  value,
  textarea = false,
  prefix = '',
  error = '',
}) => {
  const [randomId, setRandomId] = useState()

  const input = useRef()

  useEffect(() => {
    setRandomId(uuidv4())
  }, [])

  return (
    <div className="flex flex-col h-full">
      <label htmlFor={randomId} className="font-body text-sm text-dark-900">
        {label}
      </label>
      {textarea ? (
        <>
          <textarea
            ref={input}
            type={type}
            id={randomId}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className="outline-none font-body font-normal text-base text-dark-900 h-full resize-none mt-2 px-3 py-2.5 border-solid border-dark-100 border-1 rounded-md"
          />
        </>
      ) : (
        <div
          className={
            prefix
              ? 'overflow-hidden flex font-body font-normal text-base text-dark-900 mt-2 border-solid border-dark-100 border-1 rounded-md'
              : 'mt-2'
          }>
          <div
            onClick={() => input.current.focus()}
            className="pl-3 flex justify-end items-center text-dark-500">
            {prefix}
          </div>
          <input
            ref={input}
            type={type}
            id={randomId}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            className={
              !prefix
                ? 'outline-none w-full font-body font-normal text-base text-dark-900 px-3 py-2.5 border-solid border-dark-100 border-1 rounded-md bg-light-100'
                : 'outline-none px-3 py-2.5 flex-1'
            }
          />
        </div>
      )}
      <span className="mt-1 font-body font-normal text-md text-warning-500">
        {error}
      </span>
    </div>
  )
}

export default Input
