const Subtitle = ({ children, center = false, type = '1', html = true }) => {
  return html ? (
    <p
      dangerouslySetInnerHTML={{ __html: children }}
      className={`font-body text-dark-500 text-base leading-8 ${
        type === '1' ? 'md:text-lg' : type === '3' ? 'text-md' : ''
      } md:leading-8 ${center && 'text-center'}`}></p>
  ) : (
    <p
      className={`font-body text-dark-500 text-base leading-8 ${
        type === '1' ? 'md:text-lg' : type === '3' ? 'text-md' : ''
      } md:leading-8 ${center && 'text-center'}`}>
      {children}
    </p>
  )
}

export default Subtitle
