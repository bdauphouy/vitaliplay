const Subtitle = ({ children, center = false }) => {
  return (
    <p
      dangerouslySetInnerHTML={{ __html: children }}
      className={`font-body text-dark-500 text-base leading-8 md:text-lg md:leading-8 ${
        center && 'text-center'
      }`}></p>
  )
}

export default Subtitle
