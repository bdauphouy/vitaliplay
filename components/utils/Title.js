const Title = ({ children, type = '2', center = false, html = true }) => {
  return html ? (
    <h2
      className={`font-bold font-head text-dark-900 ${
        type === '1'
          ? 'text-3xl md:text-5xl lg:font-extrabold'
          : type === '3'
          ? 'text-3xl'
          : type === '4'
          ? 'text-xl md:text-3xl'
          : type === '5'
          ? 'text-[1.25rem] md:text-xl'
          : type === '6'
          ? 'text-[1.25rem]'
          : type === '7'
          ? 'text-lg'
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
