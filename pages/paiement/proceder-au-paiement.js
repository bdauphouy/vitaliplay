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
import { useState, useEffect, useContext } from 'react'
import useButtonSize from '@/hooks/useButtonSize'
import { LinksContext } from '@/contexts/LinksContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { getToken, postAPIWithToken } from '@/lib/api'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutCheckout = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const [store, setStore] = useState()

  const buttonSize = useButtonSize()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )
  }, [])

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      way: 'mastercard',
      name: '',
      cardNumber: '',
      expires: '',
      cvv: '',
    },
    onSubmit: (values) => {
      window.localStorage.setItem(
        'vitaliplay.checkout.store',
        JSON.stringify({
          ...store,
          cardInfo: Buffer.from(JSON.stringify(values)).toString('base64'),
        })
      )
      router.push(getPage(checkoutPages, 'pageName', 'Confirmation').path)
    },
  })

  const { getPage, checkoutPages } = useContext(LinksContext)

  return (
    <Elements stripe={stripePromise}>
      <div className="mt-10 px-6 md:px-24 lg:mt-40">
        <Title type="3">Procéder au paiement</Title>
        <div className="mt-4">
          <Subtitle type="2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
            eget varius a diam faucibus nec sodales fermentum eget.
          </Subtitle>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-8 flex flex-wrap gap-x-4 gap-y-4 md:gap-x-6">
            <Radio
              padding="md:px-7 md:py-3"
              center={true}
              type="2"
              id="mastercard"
              name="way"
              checked={formik.values.way === 'mastercard'}
              onChange={formik.handleChange}
            >
              <Mastercard size={isMediumScreen ? '48' : '35'} />
            </Radio>
            <Radio
              padding="md:px-7 md:py-3"
              center={true}
              type="2"
              id="visa"
              name="way"
              checked={formik.values.way === 'visa'}
              onChange={formik.handleChange}
            >
              <Visa size={isMediumScreen ? '48' : '35'} />
            </Radio>
          </div>
          <div className="mt-11">
            <div className="xl:grid-area-card-info md:grid-area-card-info grid-area-card-info grid gap-3 gap-x-4 md:gap-y-5">
              <div style={{ gridArea: 'a' }}>
                <Input
                  label="Nom sur la carte"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div style={{ gridArea: 'b' }}>
                <Input
                  label="Numéro de carte"
                  name="cardNumber"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                />
              </div>
              <div style={{ gridArea: 'c' }}>
                <Input
                  label="Date d'expiration"
                  name="expires"
                  value={formik.values.expires}
                  onChange={formik.handleChange}
                  placeholder="ex. 07/23"
                />
              </div>
              <div style={{ gridArea: 'd' }}>
                <Input
                  label="CVV"
                  name="cvv"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                />
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
    </Elements>
  )
}

CheckoutCheckout.Layout = CheckoutLayout

export default CheckoutCheckout
