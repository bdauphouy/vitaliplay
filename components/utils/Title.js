const Title = ({ children, type = '2', center = false, html = true }) => {
  return html ? (
    <h2
      className={`font-bold font-head ${
        type === '1'
          ? 'text-3xl md:text-5xl lg:font-extrabold'
          : 'text-2xl md:text-4xl'
      } ${center && 'text-center'}`}
      dangerouslySetInnerHTML={{ __html: children }}></h2>
  ) : (
    <h2
      className={`font-bold font-head ${
        type === '1'
          ? 'text-3xl md:text-5xl lg:font-extrabold'
          : 'text-2xl md:text-4xl'
      } ${center && 'text-center'}`}>
      {children}
    </h2>
  )
}

export default Title
