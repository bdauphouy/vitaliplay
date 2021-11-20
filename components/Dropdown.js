import { ChevronDown } from './Icons'
import { useState } from 'react'

const DropDown = ({ options, defaultOption, getOption }) => {
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
    <details
      open={open}
      className="bg-light-100 cursor-pointer rounded border-solid border-1 border-gray-200">
      <summary
        onClick={toggleDropdown}
        className="px-3 py-2 flex w-60 justify-between">
        <span>{selectedOption}</span>
        <div className={`${open && 'rotate-180'} transition-transform`}>
          <ChevronDown size={24} color="stroke-primary" />
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
  )
}

export default DropDown
