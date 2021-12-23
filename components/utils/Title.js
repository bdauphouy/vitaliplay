const Title = ({ children, type = '2', center = false, html = true }) => {
  return html ? (
    <h2
      className={`font-bold font-head text-dark-900 ${
        type === '1'
          ? 'text-3xl md:text-5xl lg:font-extrabold'
          : type === '3'
          ? 'text-3xl'
          : 'text-2xl md:text-4xl'
      } ${center && 'text-center'}`}
      dangerouslySetInnerHTML={{
        __html:
          type === '2' && typeof children === 'string'
            ? children.split('<strong>').join('<strong class="type-2">')
            : children,
      }}></h2>
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
