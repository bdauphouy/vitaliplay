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
import {
  fetchAPIWithToken,
  getToken,
  getUserSavedCards,
  postAPIWithToken,
} from '@/lib/api'
import { CheckoutContext } from '@/contexts/CheckoutContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Spin from '@/components/utils/Spin'

export const getServerSideProps = async ({ req }) => {
  const savedCards = await fetchAPIWithToken(
    '/users/me/saved-cards',
    req.cookies.jwt,
    false
  )

  const filteredSavedCards = () => {
    if (!savedCards.paymentMethods) {
      return []
    }

    const fingerprints = []

    return savedCards.paymentMethods.filter((savedCard) => {
      const fingerprint = savedCard.card.fingerprint
      console.log(fingerprint)

      if (!fingerprints.includes(fingerprint)) {
        fingerprints.push(fingerprint)
        return savedCard
      }
    })
  }

  return {
    props: {
      savedCards: filteredSavedCards(),
    },
  }
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CheckoutConfirm = () => {
  const [store, setStore] = useState()
  const [cardInfo, setCardInfo] = useState()

  const [savedCards, setSavedCards] = useState([])

  const { checkout, setCheckout } = useContext(CheckoutContext)

  const [createdAt, setCreatedAt] = useState('')
  const [endAt, setEndAt] = useState('')
  const [orderId, setOrderId] = useState('')

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    checkout.selectedPaymentMethod
  )

  const filteredSavedCards = (savedCards) => {
    if (!savedCards) {
      return []
    }

    const fingerprints = []

    return savedCards.filter((savedCard) => {
      const fingerprint = savedCard.card.fingerprint

      if (!fingerprints.includes(fingerprint)) {
        fingerprints.push(fingerprint)
        return savedCard
      }
    })
  }

  useEffect(() => {
    if (checkout.createdAt) {
      setCreatedAt(new Date(checkout.createdAt))
    }

    if (!selectedPaymentMethod && checkout.selectedPaymentMethod) {
      setSelectedPaymentMethod(checkout.selectedPaymentMethod)
    }
    setOrderId(checkout.subscriptionId)

    if (
      checkout.selectedPaymentMethod &&
      !savedCards.find((card) => card.id === checkout.selectedPaymentMethod)
    ) {
      setSavedCards((savedCards) => [
        ...savedCards,
        checkout.selectedPaymentMethod,
      ])
    }
  }, [checkout])

  useEffect(() => {
    if (savedCards.length === 1) {
      formik.setFieldValue('formik selectedCard', 0)
    }
  }, [savedCards])

  useEffect(() => {
    const foundCardIndex = savedCards.findIndex(
      (card) => card.id === selectedPaymentMethod.id
    )

    if (selectedPaymentMethod && foundCardIndex !== -1) {
      // formik.values.selectedCard = savedCards.findIndex(card => card.id === selectedPaymentMethod.id)
      formik.setFieldValue('selectedCard', foundCardIndex)
    }
  }, [selectedPaymentMethod])

  useEffect(() => {
    if (createdAt) {
      setEndAt(
        new Date(new Date(createdAt).setFullYear(createdAt.getFullYear() + 1))
      )
    }
  }, [createdAt])

  const buttonSize = useButtonSize()

  const router = useRouter()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )

    const fetchSavedCards = async () => {
      const fetchedCards = await getUserSavedCards(getToken())

      if (fetchedCards) {
        setSavedCards((savedCards) => [
          ...savedCards,
          ...fetchedCards.filter(
            (fetchCard) =>
              !savedCards.find((savedCard) => savedCard.id === fetchCard.id)
          ),
        ])
      }
    }

    fetchSavedCards()

    const fetchStripe = async () => {
      const res = await postAPIWithToken(
        '/payments',
        {
          interval:
            JSON.parse(
              window.localStorage.getItem('vitaliplay.checkout.subscription')
            ).subscription.subscriptionType === 'Annuel'
              ? 'year'
              : 'month',
          promotionCode: checkout.promotionCode,
        },
        getToken()
      )

      setCheckout(res.data.attributes)
    }

    fetchStripe()
  }, [])

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      selectedCard: '0',
    },
  })

  const [loading, setLoading] = useState(false)

  const { getPage, checkoutPages } = useContext(LinksContext)

  const confirmPayment = async () => {
    setLoading(true)

    const stripe = await stripePromise

    const { paymentIntent, paymentIntentError } =
      await stripe.confirmCardPayment(checkout.clientSecret, {
        setup_future_usage: 'off_session',
        payment_method: savedCards[formik.values.selectedCard].id,
      })

    if (paymentIntentError) {
      router.push(getPage(checkoutPages, 'pageName', 'Erreur').path)
      return
    }

    await new Promise((res) =>
      setInterval(async () => {
        const paid = await fetchAPIWithToken(
          '/users/me/subscription',
          getToken(),
          false
        )

        if (paid.status === 'paid') {
          res()
        }
      }, 2000)
    )

    setLoading(false)
    await router.push(getPage(checkoutPages, 'pageName', 'Succès').path)
  }

  return (
    <Elements stripe={stripePromise}>
      <div className="mt-10 px-6 md:px-24 lg:mt-40">
        <Title type="3">Confirmer votre commande</Title>
        <div className="mt-4">
          <Subtitle type="2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida
            eget varius a diam faucibus nec sodales fermentum eget.
          </Subtitle>
        </div>
        <div className="mt-10">
          <div className="flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
            <h3 className="font-body text-sm font-bold text-dark-900">
              Informations de paiement
            </h3>
            <Link
              href={
                getPage(
                  checkoutPages,
                  'pageName',
                  'Ajouter un moyen de paiement'
                ).path +
                `?clientSecret=${checkout.clientSecret}&selectedPaymentMethod=${selectedPaymentMethod}`
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
            {savedCards.length > 0 ? (
              <>
                {filteredSavedCards(savedCards).map((savedCard, i) => {
                  return (
                    <CreditCardInfo
                      key={savedCard.id}
                      id={i}
                      name="selectedCard"
                      cardType={savedCard.card.brand}
                      last4={savedCard.card.last4}
                      expMonth={savedCard.card.exp_month}
                      expYear={savedCard.card.exp_year}
                      checked={formik.values.selectedCard === i.toString()}
                      onChange={formik.handleChange}
                    />
                  )
                })}
              </>
            ) : (
              <Subtitle>Vous n'avez pas de carte enregistrée</Subtitle>
            )}
          </div>
        </div>
        <div className="mt-8">
          <div className="flex flex-col flex-wrap justify-between sm:flex-row sm:items-center">
            <h3 className="font-body text-sm font-bold text-dark-900">
              Détails de la commande
            </h3>
          </div>
          <div className="mt-3 md:mt-2">
            {orderId ? (
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
                    {orderId && (
                      <>
                        <h3 className="font-body text-sm font-bold text-blue-900">
                          Numéro de commande
                        </h3>

                        <h4 className="mt-1 font-body text-xs font-normal text-dark-500">
                          {orderId}
                        </h4>
                      </>
                    )}
                  </div>
                  <div>
                    {createdAt && endAt && (
                      <>
                        <h3 className="font-body text-sm font-bold text-blue-900">
                          Durée de validité
                        </h3>

                        <h4 className="mt-1 font-body text-xs font-normal text-dark-500">
                          {createdAt.toLocaleDateString('fr-FR')} au{' '}
                          {endAt.toLocaleDateString('fr-FR')}
                        </h4>
                      </>
                    )}
                  </div>
                </div>
              </Radio>
            ) : (
              <Spin />
            )}
            <div className="mt-8 flex flex-wrap gap-4 md:gap-6 lg:mt-12">
              <div
                onClick={
                  savedCards[formik.values.selectedCard]
                    ? confirmPayment
                    : () => {}
                }
              >
                <Cta
                  loading={loading}
                  size={buttonSize}
                  buttonType="submit"
                  type={
                    savedCards[formik.values.selectedCard]
                      ? 'primary'
                      : 'disabled'
                  }
                >
                  Procéder au paiement*
                </Cta>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  )
}

CheckoutConfirm.Layout = CheckoutLayout

export default CheckoutConfirm
