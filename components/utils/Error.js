const Error = ({ children = '' }) => {
  return (
    <span className="mt-1 font-body text-md font-normal text-warning-500">
      {children}
    </span>
  )
}

export default Error
