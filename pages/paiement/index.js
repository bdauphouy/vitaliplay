import { useRouter } from 'next/router'
import { useEffect, useContext } from 'react'
import { fetchAPI } from '@/lib/api'
import { useState } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import { AuthContext } from '@/contexts/AuthContext'

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

  const { isAuth } = useContext(AuthContext)

  const [types] = useState({
    Annuel: 'annual',
    Mensuel: 'monthly',
  })

  const { getPage, checkoutPages } = useContext(LinksContext)

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

    if (parseInt(activeStep) === 1 && isAuth) {
      router.push(getPage(checkoutPages, 'id', parseInt(activeStep)).path)
    } else {
      router.push(getPage(checkoutPages, 'id', 2).path)
    }
  }, [])

  return <></>
}

export default Checkout
