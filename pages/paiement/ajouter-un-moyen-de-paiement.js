import Title from '@/components/utils/Title'
import Radio from '@/components/utils/Radio'
import { Mastercard, Visa } from '@/components/utils/Icons'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useFormik } from 'formik'
import { useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import { LinksContext } from '@/contexts/LinksContext'
import { useContext, useEffect, useRef, useState } from 'react'
import AccountLayout from '@/components/layouts/AccountLayout'
import { loadStripe } from '@stripe/stripe-js'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import { CheckoutContext } from '@/contexts/CheckoutContext'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const PaymentForm = () => {
  const { getPage, accountPages, checkoutPages } = useContext(LinksContext)
  const { checkout, setCheckout } = useContext(CheckoutContext)

  const [cardName, setCardName] = useState('')
  const [cardNumberValid, setCardNumberValid] = useState(false)
  const [cardExpiryValid, setCardExpiryValid] = useState(false)
  const [cardCvcValid, setCardCvcValid] = useState(false)

  const [cardValidated, setCardValidated] = useState(false)

  useEffect(() => {
    if (cardName.length > 0 && cardNumberValid && cardExpiryValid && cardCvcValid) {
      setCardValidated(true)
    } else {
      setCardValidated(false)
    }
  }, [cardName, cardNumberValid, cardExpiryValid, cardCvcValid])

  const router = useRouter()

  const isMediumScreen = useMediaQuery('max-width: 768px')

  const buttonSize = useButtonSize()

  const elements = useElements()
  const stripe = useStripe()

  const [elementsDefinedEffectTriggered, setElementsDefinedEffectTriggered] = useState(false)
  useEffect(() => {
    if (elements && !elementsDefinedEffectTriggered) {
      setElementsDefinedEffectTriggered(true)

      const cardElementNumber = elements.getElement('cardNumber')
      const cardElementExpiry = elements.getElement('cardExpiry')
      const cardElementCvc = elements.getElement('cardCvc')

      cardElementNumber.on('change', function(event) {
        if (event.error || !event.complete) {
          setCardNumberValid(false)
        } else {
          setCardNumberValid(true)
        }
      })

      cardElementExpiry.on('change', function(event) {
        if (event.error || !event.complete) {
          setCardExpiryValid(false)
        } else {
          setCardExpiryValid(true)
        }
      })

      cardElementCvc.on('change', function(event) {
        if (event.error || !event.complete) {
          setCardCvcValid(false)
        } else {
          setCardCvcValid(true)
        }
      })
    }
  }, [elements])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (elements == null) {
      return
    }
  }

  const useThisCard = async () => {
    const cardElementNumber = elements.getElement('cardNumber')

    const { paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElementNumber,
      billing_details: {
        name: cardName
      }
    })

    setCheckout(checkout => ({
      ...checkout,
      selectedPaymentMethod: paymentMethod
    }))

    router.back()
  }

  console.log(cardValidated)

  return (
    <form onSubmit={handleSubmit}>
      <div className='mt-11'>
        <div
          className='xl:grid-area-card-info md:grid-area-card-info grid-area-card-info grid gap-3 gap-x-4 md:gap-y-5'>
          <div style={{ gridArea: 'a' }}>
            <Input label='Nom sur la carte' name='name'
                   value={cardName}
                   onChange={(e) => setCardName(e.target.value)}
            />
          </div>
          <div style={{ gridArea: 'b' }}>
            <Input label="Numéro de carte" name="cardNumber" />
          </div>
          <div style={{ gridArea: 'c' }}>
            <Input
              label="Date d'expiration"
              name="expires"
              placeholder="ex. 07/23"
            />
          </div>
          <div style={{ gridArea: 'd' }}>
            <Input label="CVV" name="cvv" />
          </div>
        </div>
        <div className='mt-8 flex flex-wrap gap-4 md:gap-6 lg:mt-12'>
          <div onClick={cardValidated ? useThisCard : () => {}}>
            <Cta size={buttonSize} buttonType='submit' type={cardValidated ? 'primary' : 'disabled'}>
              Utiliser cette carte
            </Cta>
          </div>

          <div onClick={() => router.back()}>
            <Cta size={buttonSize} type='secondary'>
              Retour
            </Cta>
          </div>
        </div>
      </div>
    </form>
  )
}

const AddPaymentWay = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className='mx-auto mt-20 min-h-[calc(100vh_-_165px)] max-w-4xl px-6 py-10 md:px-24 lg:py-20'>
        <Title type='3'>Ajouter un moyen de paiement</Title>
        <PaymentForm />
      </div>
    </Elements>
  )
}

AddPaymentWay.Layout = CheckoutLayout

export default AddPaymentWay
