const Title = ({ children, type = '2', center = false }) => {
  return (
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
