import Button from './Button'
import useResponsiveState from '@/hooks/useResponsiveState'

const Faq = ({ question, answer }) => {
  const buttonSize = useResponsiveState(768, { from: 23, to: 18 })

  const openDropDown = e => {
    e.target.parentElement.nextSibling.classList.toggle('max-h-0')
    e.target.parentElement.nextSibling.classList.toggle('max-h-16')
    e.target.classList.toggle('rotate-45')
  }

  return (
    <div>
      <div className="flex justify-between items-center border-solid border-b-1 px-2 md:px-6 py-4">
        <p className="font-body text-dark-500 font-normal pr-8">{question}</p>
        <div
          onClick={openDropDown}
          className="cursor-pointer transition"
          style={{ transitionProperty: 'transform' }}>
          <Button size={buttonSize} color="#1778F2" />
        </div>
      </div>
      <div
        className="pt-4 max-h-0 overflow-y-hidden duration-700"
        style={{ transitionProperty: 'max-height' }}>
        <p className="font-body text-dark-500 font-normal pr-8">{answer}</p>
      </div>
    </div>
  )
}

export default Faq
