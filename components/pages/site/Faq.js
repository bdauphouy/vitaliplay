import AddButton from '../../utils/AddButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import gsap from 'gsap'

const Faq = ({
  question = 'This is question',
  answer = 'This is the answer',
}) => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const answerSection = useRef()

  const [buttonSize, setButtonSize] = useState()

  useEffect(() => {
    setButtonSize(isMediumScreen ? 25 : 20)
  }, [isMediumScreen])

  const openDropdown = (e) => {
    e.target.parentElement.nextSibling.classList.toggle('max-h-0')
    e.target.parentElement.nextSibling.classList.toggle(
      isMediumScreen ? 'max-h-48' : 'max-h-96'
    )

    e.target.classList.toggle('rotate-45')
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b-1 border-solid px-2 py-4 md:px-6">
        <p className="pr-8 font-body font-normal text-dark-500">{question}</p>
        <div
          onClick={openDropdown}
          className="cursor-pointer transition"
          style={{ transitionProperty: 'transform' }}
        >
          <AddButton size={buttonSize} color="#1778F2" />
        </div>
      </div>
      <div
        ref={answerSection}
        className="mt-4 max-h-0 overflow-y-auto duration-700"
        style={{ transitionProperty: 'max-height' }}
      >
        <p className="text-ellipsis pr-8 font-body font-normal text-dark-500">
          {answer}
        </p>
      </div>
    </div>
  )
}

Faq.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
}

export default Faq
