import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import Title from '@/components/utils/Title'
import Radio from '@/components/utils/Radio'
import { useFormik } from 'formik'
import { Mastercard, Visa } from '@/components/utils/Icons'
import { useMediaQuery } from '@mui/material'
import Subtitle from '@/components/utils/Subtitle'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, useRef } from 'react'
import useButtonSize from '@/hooks/useButtonSize'
import { LinksContext } from '@/contexts/LinksContext'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

export const getServerSideProps = async ({ req }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/paiement/compte',
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutCheckout = () => {
  const [store, setStore] = useState()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )
  }, [])

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}

const CheckoutForm = () => {
  const [store, setStore] = useState()
  const stripe = useStripe()
  const elements = useElements()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')
  const buttonSize = useButtonSize()

  const [formValidated, setFormValidated] = useState({
    cardExpiry: false,
    cardNumber: false,
    cardCvc: false,
  })

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )
  }, [])

  const handlePaymentValidation = (e) => {
    setFormValidated((formValidated) => {
      return {
        ...formValidated,
        [e.elementType]: e.complete,
      }
    })
  }

  const [cardElement, setCardElement] = useState()
  const [expiryElement, setExpiryElement] = useState()
  const [cvcElement, setCvcElement] = useState()

  useEffect(() => {
    if (stripe || elements) {
      setCardElement(elements.getElement('cardNumber'))

      setExpiryElement(elements.getElement('cardExpiry'))

      setCvcElement(elements.getElement('cardCvc'))
    }
  }, [elements, stripe])

  useEffect(() => {
    cardElement?.on('change', handlePaymentValidation)
  }, [cardElement])

  useEffect(() => {
    expiryElement?.on('change', handlePaymentValidation)
  }, [expiryElement])

  useEffect(() => {
    cvcElement?.on('change', handlePaymentValidation)
  }, [cvcElement])

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      if (!stripe || !elements) {
        return
      }

      if (
        !formValidated.cardCvc ||
        !formValidated.cardExpiry ||
        !formValidated.cardNumber
      ) {
        return
      }

      const { paymentMethod, paymentMethodError } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {
            name: values.name,
          },
        })

      window.localStorage.setItem(
        'vitaliplay.checkout.store',
        JSON.stringify({
          ...store,
          cardInfo: Buffer.from(JSON.stringify(values)).toString('base64'),
          paymentMethod,
        })
      )

      await router.push(getPage(checkoutPages, 'pageName', 'Confirmation').path)
    },
  })

  const { getPage, checkoutPages } = useContext(LinksContext)

  return (
    <div className="mt-10 px-6 md:px-24 lg:mt-40">
      <Title type="3">Procéder au paiement</Title>
      <div className="mt-4">
        <Subtitle type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="mt-10 flex flex-col gap-5">
          <div className="max-w-xs">
            <Input
              label="Nom sur la carte"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[200px] max-w-xs flex-1">
              <Input label="Numéro de carte" />
            </div>
            <div>
              <Input label="Date d'expiration" />
            </div>
            <div className="w-20">
              <Input label="CVC" />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 md:gap-6 lg:mt-12">
            <Cta size={buttonSize} buttonType="submit">
              Suivant
            </Cta>
            <div onClick={() => router.back()}>
              <Cta size={buttonSize} type="secondary">
                Retour
              </Cta>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

CheckoutCheckout.Layout = CheckoutLayout

export default CheckoutCheckout
