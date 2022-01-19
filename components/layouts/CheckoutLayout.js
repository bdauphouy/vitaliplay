const CheckoutLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-[5]">{children}</div>
      <aside className="flex-[3]">checkout layout</aside>
    </div>
  )
}

export default CheckoutLayout
