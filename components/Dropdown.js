import { ChevronDown } from './Icons'
import { useState, useRef } from 'react'

const DropDown = ({ options, defaultOption, getOption, label = '' }) => {
  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(defaultOption)

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
      <label className="font-body text-sm text-dark-900">{label}</label>
      <details
        open={open}
        className="mt-2 bg-light-100 cursor-pointer rounded-md border-solid border-1 border-gray-200">
        <summary
          onClick={toggleDropdown}
          className="px-3 py-2 flex w-full justify-between">
          <span>{selectedOption}</span>
          <div
            className={`${open && 'rotate-180'} transition flex items-center`}
            style={{ transitionProperty: 'transform' }}>
            <ChevronDown size={16} color="#000000" />
          </div>
        </summary>
        <ul>
          {options.map((option, i) => {
            if (option === selectedOption) return
            return (
              <li
                onClick={updateSelectedOption}
                key={i}
                className="py-1.5 px-3 text-dark-300">
                {option}
              </li>
            )
          })}
        </ul>
      </details>
    </>
  )
}

export default DropDown
