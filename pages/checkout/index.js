import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { CheckoutContext } from '@/contexts/CheckoutContext'
import { fetchAPI } from '@/lib/api'
import { useState } from 'react'

export const getStaticProps = async () => {
  const subscriptions = await fetchAPI('/home-landing')

  return {
    props: {
      subscriptions: subscriptions.prices.data.map(
        (subscription) => subscription.attributes
      ),
    },
    revalidate: 10,
  }
}

const Checkout = ({ subscriptions }) => {
  const router = useRouter()

  const [types] = useState({
    Annuel: 'annual',
    Mensuel: 'monthly',
  })

  const { getPathById, prefix } = useContext(CheckoutContext)

  useEffect(() => {
    let activeStep = window.localStorage.getItem(
      'vitaliplay.checkout.activeStep'
    )

    if (!activeStep) {
      window.localStorage.setItem('vitaliplay.checkout.activeStep', '1')
      activeStep = window.localStorage.getItem('vitaliplay.checkout.activeStep')
    }

    if (!window.localStorage.getItem('vitaliplay.checkout.store')) {
      window.localStorage.setItem(
        'vitaliplay.checkout.store',
        JSON.stringify({})
      )
    }

    if (!window.localStorage.getItem('vitaliplay.checkout.subscription')) {
      window.localStorage.setItem(
        'vitaliplay.checkout.subscription',
        JSON.stringify({
          subscription: subscriptions.find(
            (subscription) =>
              subscription.type === types[router.query.abonnement]
          ),
        })
      )
    }

    router.push(`${prefix}${getPathById(parseInt(activeStep))}`)
  }, [])

  return <></>
}

export default Checkout
