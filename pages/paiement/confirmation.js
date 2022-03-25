import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import { useState, useEffect, useContext } from 'react'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Radio from '@/components/utils/Radio'
import { useFormik } from 'formik'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useRouter } from 'next/router'
import CreditCardInfo from '@/components/pages/account/CreditCardInfo'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'

const CheckoutConfirm = () => {
  const [store, setStore] = useState()
  const [cardInfo, setCardInfo] = useState()

  const buttonSize = useButtonSize()

  const router = useRouter()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )
  }, [])

  useEffect(() => {
    if (store) {
      if (Object.keys(store).includes('cardInfo')) {
        setCardInfo(
          JSON.parse(Buffer.from(store.cardInfo, 'base64').toString('ascii'))
        )
      }
    }
  }, [store])

  const formik = useFormik({
    initialValues: {
      selectedCard: '1',
    },
  })

  const { getPage, checkoutPages, accountPages } = useContext(LinksContext)

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
        <div className="flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
          <h3 className="font-body text-sm font-bold text-dark-900">
            Informations de paiement
          </h3>
          <Link
            href={
              getPage(accountPages, 'pageName', 'Ajouter un moyen de paiement')
                .path
            }
            passHref
          >
            <a>
              <Cta type="link" size="s" arrow="right">
                Ajouter un moyen de paiement
              </Cta>
            </a>
          </Link>
        </div>
        <div className="mt-3 space-y-4 md:mt-2">
          <CreditCardInfo
            id="1"
            name="selectedCard"
            cardType={cardInfo?.way}
            cardNumber={cardInfo?.cardNumber}
            cardName={cardInfo?.name}
            cardExpires={cardInfo?.expires}
            checked={formik.values.selectedCard === '1'}
            onChange={formik.handleChange}
          />
          <CreditCardInfo
            id="2"
            name="selectedCard"
            cardType={cardInfo?.way}
            cardNumber={cardInfo?.cardNumber}
            cardName={cardInfo?.name}
            cardExpires={cardInfo?.expires}
            checked={formik.values.selectedCard === '2'}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <div className="mt-8">
        <div className="flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
          <h3 className="font-body text-sm font-bold text-dark-900">
            Détails de la commande
          </h3>
          <Cta type="link" size="s" arrow="right">
            Ajouter une adresse de facturation
          </Cta>
        </div>
        <div className="mt-3 md:mt-2">
          <Radio checked={true}>
            <div className="mr-6 flex flex-wrap justify-between gap-8">
              <div>
                <h3 className="font-body text-sm font-bold text-blue-900">
                  Adresse de facturation
                </h3>
                <h4 className="mt-1 font-body text-xs font-normal text-dark-500">
                  {store?.billing?.address}
                  <br />
                  {store?.billing?.city} {store?.billing?.zipCode}
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
              onClick={() =>
                router.push(getPage(checkoutPages, 'pageName', 'Succès').path)
              }
            >
              <Cta size={buttonSize} buttonType="submit">
                Procéder au paiement*
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
