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

  const toggleDropdown = e => {
    e.preventDefault()
    setOpen(open => (open ? false : true))
  }

  const updateSelectedOption = e => {
    setSelectedOption(e.target.innerText)
    getOption(e.target.innerText)
    setOpen(false)
  }

  return (
    <>
      <div className="flex flex-col gap-2 h-full">
        <label className="font-body text-sm font-normal text-black">
          {label}
        </label>
        <details open={open} className="relative bg-light-100 cursor-pointer">
          <summary
            onClick={toggleDropdown}
            className="outline-none px-3 py-3 h-full flex items-center justify-between rounded-md border-solid border-1 border-gray-300">
            <span className="mr-6">{selectedOption}</span>
            <div
              className={`${open && 'rotate-180'} transition flex items-center`}
              style={{ transitionProperty: 'transform' }}>
              <ChevronDown size={16} color="#000000" />
            </div>
          </summary>
          <ul className="absolute -mt-1.5 z-10 w-full bg-light-100 rounded-b-md border-solid border-t-0 border-1 border-gray-300">
            {options.length > 0 &&
              options.map((option, i) => {
                if (option === selectedOption) return
                return (
                  <li
                    onClick={updateSelectedOption}
                    key={i}
                    className="py-3 px-3 text-dark-300">
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
