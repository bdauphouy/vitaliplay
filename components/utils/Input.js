import { v4 as uuidv4 } from 'uuid'
import { useState, useRef, useEffect } from 'react'
import Error from './Error'
import {
  Elements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js'

const Input = ({
  label,
  placeholder = '',
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

  const [telFocus, setTelFocus] = useState(false)

  useEffect(() => {
    setRandomId(uuidv4())
  }, [])

  return (
    <div className="flex h-full flex-col">
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
            className="mt-2 h-full resize-none rounded-md border-1 border-solid border-dark-100 px-3 py-2.5 font-body text-base font-normal text-dark-900 outline-none transition-[border-color] duration-300 focus:border-dark-300"
          />
        </>
      ) : (
        <div
          className={
            prefix
              ? `mt-2 flex overflow-hidden rounded-md border-1 border-solid border-dark-100 font-body text-base font-normal text-dark-900 transition-[border-color] duration-300 ${
                  telFocus ? 'border-dark-300' : ''
                }`
              : 'mt-2'
          }
        >
          <div
            onClick={() => input.current.focus()}
            className="flex items-center justify-end pl-3 text-dark-500"
          >
            {prefix}
          </div>
          {label === 'Numéro de carte' ? (
            <div className="w-full rounded-md border-1 border-solid border-dark-100 bg-light-100 py-2.5 px-3 font-body text-base font-normal text-dark-900 outline-none transition-[border-color] duration-300 focus:border-dark-300">
              <CardNumberElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      lineHeight: '27px',
                    },
                  },
                }}
              />
            </div>
          ) : label === "Date d'expiration" ? (
            <div className="w-full rounded-md border-1 border-solid border-dark-100 bg-light-100 py-2.5 px-3 font-body text-base font-normal text-dark-900 outline-none transition-[border-color] duration-300 focus:border-dark-300">
              <CardExpiryElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      lineHeight: '27px',
                    },
                  },
                }}
              />
            </div>
          ) : label === 'CVC' ? (
            <div className="w-full rounded-md border-1 border-solid border-dark-100 bg-light-100 py-2.5 px-3 font-body text-base font-normal text-dark-900 outline-none transition-[border-color] duration-300 focus:border-dark-300">
              <CardCvcElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      lineHeight: '27px',
                    },
                  },
                }}
              />
            </div>
          ) : (
            <input
              ref={input}
              type={type}
              id={randomId}
              name={name}
              onChange={onChange}
              onFocus={prefix ? () => setTelFocus(true) : null}
              onBlur={prefix ? () => setTelFocus(false) : null}
              placeholder={placeholder}
              value={value}
              className={`${
                type === 'date' ? 'px-3 py-[9px]' : 'px-3 py-2.5'
              } ${
                !prefix
                  ? 'w-full rounded-md border-1 border-solid border-dark-100 bg-light-100 font-body text-base font-normal text-dark-900 outline-none transition-[border-color] duration-300 focus:border-dark-300'
                  : 'flex-1 outline-none'
              }`}
            />
          )}
        </div>
      )}
      {error && (
        <Error className="mt-1 font-body text-md font-normal text-warning-500">
          {error}
        </Error>
      )}
    </div>
  )
}

export default Input
