import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import Title from '@/components/utils/Title'
import Radio from '@/components/utils/Radio'
import { useFormik } from 'formik'
import {
  Mastercard,
  Visa,
  AmericanExpress,
  ApplePay,
  Paypal,
} from '@/components/utils/Icons'
import { useMediaQuery } from '@mui/material'
import Subtitle from '@/components/utils/Subtitle'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { CheckoutContext } from '@/contexts/CheckoutContext'

const CheckoutCheckout = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const [store, setStore] = useState()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store')),
    )
  }, [])

  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      way: '',
      name: '',
      cardNumber: '',
      expires: '',
      cvv: '',
    },
    onSubmit: values => {
      window.localStorage.setItem(
        'vitaliplay.checkout.store',
        JSON.stringify({
          ...store,
          cardInfo: Buffer.from(JSON.stringify(values)).toString('base64'),
        }),
      )
      router.push(`${prefix}${getPathByStep('Confirmation')}`)
    },
  })

  const { getPathByStep, prefix } = useContext(CheckoutContext)

  return (
    <div className="mt-10 lg:mt-40 px-6 md:px-24">
      <Title>Procéder au paiement</Title>
      <div className="mt-4">
        <Subtitle type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-4 mt-8">
          <Radio
            padding="md:px-7 md:py-3"
            center={true}
            type="2"
            id="mastercard"
            name="way"
            checked={formik.values.way === 'mastercard'}
            onChange={formik.handleChange}>
            <Mastercard size={isMediumScreen ? '48' : '35'} />
          </Radio>
          <Radio
            padding="md:px-7 md:py-3"
            center={true}
            type="2"
            id="visa"
            name="way"
            checked={formik.values.way === 'visa'}
            onChange={formik.handleChange}>
            <Visa size={isMediumScreen ? '48' : '35'} />
          </Radio>
          <Radio
            padding="md:px-7 md:py-3"
            center={true}
            type="2"
            id="american-express"
            name="way"
            checked={formik.values.way === 'american-express'}
            onChange={formik.handleChange}>
            <AmericanExpress size={isMediumScreen ? '48' : '35'} />
          </Radio>
          <Radio
            padding="md:px-7 md:py-3"
            center={true}
            type="2"
            id="apple-pay"
            name="way"
            checked={formik.values.way === 'apple-pay'}
            onChange={formik.handleChange}>
            <ApplePay size={isMediumScreen ? '48' : '35'} />
          </Radio>
          <Radio
            padding="md:px-7 md:py-3"
            center={true}
            type="2"
            id="paypal"
            name="way"
            checked={formik.values.way === 'paypal'}
            onChange={formik.handleChange}>
            <Paypal size={isMediumScreen ? '73' : '50'} />
          </Radio>
        </div>
        <div className="mt-11">
          <div className="grid xl:grid-area-card-info md:grid-area-card-info grid-area-card-info gap-x-4 gap-3 md:gap-y-5">
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
          <div className="flex mt-12 gap-4 md:gap-6 flex-wrap">
            <Cta size={isMediumScreen ? 'xl' : 'l'} buttonType="submit">
              Suivant
            </Cta>
            <Cta size={isMediumScreen ? 'xl' : 'l'} type="secondary">
              Retour
            </Cta>
          </div>
        </div>
      </form>
    </div>
  )
}

CheckoutCheckout.Layout = CheckoutLayout

export default CheckoutCheckout
