import { ChevronDown } from './Icons'
import { useState } from 'react'

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
      <div className="flex flex-col h-full">
        <label className="font-body text-sm text-dark-900">{label}</label>
        <details
          open={open}
          className="mt-2 relative bg-light-100 cursor-pointer">
          <summary
            onClick={toggleDropdown}
            className="px-3 py-3 h-full flex justify-between rounded-md border-solid border-1 border-gray-300">
            <span>{selectedOption}</span>
            <div
              className={`${open && 'rotate-180'} transition flex items-center`}
              style={{ transitionProperty: 'transform' }}>
              <ChevronDown size={16} color="#000000" />
            </div>
          </summary>
          <ul className="-mt-1.5 absolute z-10 w-full bg-light-100 rounded-b-md border-solid border-t-0 border-1 border-gray-300">
            {options.map((option, i) => {
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

export default DropDown
