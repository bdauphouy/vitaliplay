import { ChevronDown } from './Icons'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({
  options = ['Option 1', 'Option 2', 'Option 3'],
  defaultOption = 'Option 1',
  getOption,
  label = '',
}) => {
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultOption)

  useEffect(() => {
    setSelectedOption(defaultOption)
  }, [defaultOption])

  const toggleDropdown = (e) => {
    e.preventDefault()
    setOpen((open) => (open ? false : true))
  }

  const updateSelectedOption = (e) => {
    setSelectedOption(e.target.innerText)
    getOption(e.target.innerText)
    setOpen(false)
  }

  return (
    <>
      <div className="flex h-full flex-col gap-2">
        <label className="font-body text-sm font-normal text-black">
          {label}
        </label>
        <details open={open} className="relative cursor-pointer bg-light-100">
          <summary
            onClick={toggleDropdown}
            className="flex h-full items-center justify-between rounded-md border-1 border-solid border-gray-300 px-3 py-3 outline-none"
          >
            <span className="mr-6">{selectedOption}</span>
            <div
              className={`${open && 'rotate-180'} flex items-center transition`}
              style={{ transitionProperty: 'transform' }}
            >
              <ChevronDown size={16} color="#000000" />
            </div>
          </summary>
          <ul className="absolute z-10 -mt-1.5 w-full rounded-b-md border-1 border-t-0 border-solid border-gray-300 bg-light-100">
            {options.length > 0 &&
              options.map((option, i) => {
                if (option === selectedOption) return
                return (
                  <li
                    onClick={updateSelectedOption}
                    key={i}
                    className="py-3 px-3 text-dark-300 transition-[background-color] duration-300 hover:bg-dark-50"
                  >
                    {option}
                  </li>
                )
              })}
          </ul>
        </details>
      </div>
    </>
  )
}

Dropdown.propTypes = {
  options: PropTypes.array,
  defaultOption: PropTypes.string,
  getOption: PropTypes.func,
  label: PropTypes.string,
}

export default Dropdown
