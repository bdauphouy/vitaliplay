import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import { useState, useEffect, useContext } from 'react'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Radio from '@/components/utils/Radio'
import { Mastercard } from '@/components/utils/Icons'
import { useMediaQuery } from '@mui/material'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useRouter } from 'next/router'
import { CheckoutContext } from '@/contexts/CheckoutContext'

const CheckoutConfirm = () => {
  const [store, setStore] = useState()
  const [cardInfo, setCardInfo] = useState()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const buttonSize = useButtonSize()

  const router = useRouter()

  const formatCardNumber = (cardNumber) => {
    let formatted = cardNumber

    let i = 0

    formatted = cardNumber?.split('').map((digit, p) => {
      if (i < 3) {
        i++
        if (p < cardNumber.length - 2) {
          return '*'
        }
        return digit
      } else {
        i = 0
        if (p < cardNumber.length - 2) {
          return '* '
        }
        return digit + ' '
      }
    })

    formatted = formatted?.join('')

    return formatted
  }

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )
  }, [])

  useEffect(() => {
    setCardInfo(
      store &&
        JSON.parse(Buffer.from(store?.cardInfo, 'base64').toString('ascii'))
    )
  }, [store])

  const { getPathByStep, prefix } = useContext(CheckoutContext)

  return (
    <div className="mt-10 px-6 md:px-24 lg:mt-40">
      <Title type="3">Confirmer votre commande</Title>
      <div className="mt-4">
        <Subtitle type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-10">
        <h3 className="font-body text-sm font-bold text-dark-900">
          Informations de paiement
        </h3>
        <div className="mt-4 md:mt-3">
          <Radio checked={true}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 md:gap-6">
                <Mastercard size={isMediumScreen ? '54px' : '36px'} />
                <div>
                  <h3 className="font-body text-sm font-bold text-blue-900 md:text-md">
                    {formatCardNumber(cardInfo?.cardNumber)}
                  </h3>
                  <h4 className="mt-0.5 font-body text-xs font-normal text-dark-500 md:mt-0">
                    {cardInfo?.name}
                  </h4>
                </div>
              </div>
              <span className="font-body text-sm font-bold text-blue-900 md:text-md">
                {cardInfo?.expires}
              </span>
            </div>
          </Radio>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-body text-sm font-bold text-dark-900">
          Détails de la commande
        </h3>
        <div className="mt-4 md:mt-3">
          <Radio checked={true}>
            <div className="mr-6 flex flex-wrap justify-between gap-8">
              <div>
                <h3 className="font-body text-sm font-bold text-blue-900">
                  Adresse de facturation
                </h3>
                <h4 className="mt-1 font-body text-xs font-normal text-dark-500">
                  {store?.billing.address}
                  <br />
                  {store?.billing.city} {store?.billing.zipCode}
                </h4>
              </div>
              <div>
                <h3 className="font-body text-sm font-bold text-blue-900">
                  Numéro de commande
                </h3>
                <h4 className="mt-1 font-body text-xs font-normal text-dark-500">
                  00001
                </h4>
              </div>
              <div>
                <h3 className="font-body text-sm font-bold text-blue-900">
                  Durée de validité
                </h3>
                <h4 className="mt-1 font-body text-xs font-normal text-dark-500">
                  20/09/2021 au 20/09/2022
                </h4>
              </div>
            </div>
          </Radio>
          <div className="mt-8 flex flex-wrap gap-4 md:gap-6 lg:mt-12">
            <div
              onClick={() => router.push(`${prefix}${getPathByStep('Succès')}`)}
            >
              <Cta size={buttonSize} buttonType="submit">
                Procéder au paiement
              </Cta>
            </div>
            <div onClick={() => router.back()}>
              <Cta size={buttonSize} type="secondary">
                Retour
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CheckoutConfirm.Layout = CheckoutLayout

export default CheckoutConfirm
