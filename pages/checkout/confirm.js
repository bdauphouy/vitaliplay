import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import { useState, useEffect } from 'react'

const CheckoutConfirm = () => {
  const [store, setStore] = useState()
  const [cardInfo, setCardInfo] = useState()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store')),
    )
  }, [])

  useEffect(() => {
    setCardInfo(
      store &&
        JSON.parse(Buffer.from(store?.cardInfo, 'base64').toString('ascii')),
    )
  }, [store])

  return <div></div>
}

CheckoutConfirm.Layout = CheckoutLayout

export default CheckoutConfirm
