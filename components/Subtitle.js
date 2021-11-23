const Subtitle = ({ children, center = false }) => {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: children }}
      className={`font-body text-dark-500 text-base md:text-lg ${
        center && 'text-center'
      }`}></p>
  )
}

export default Subtitle
