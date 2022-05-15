import Input from '@/components/utils/Input'
import { LinksContext } from '@/contexts/LinksContext'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import CloseNav from '@/components/utils/CloseNav'
import Link from 'next/link'
import {
  CheckoutContextProvider,
  CheckoutContext,
} from '@/contexts/CheckoutContext'
import { AuthContext } from '@/contexts/AuthContext'
import moment from 'moment'
import PromoCodeSchema from '@/schemas/checkout/PromoCodeSchema'
import { fetchAPIWithToken, getToken } from '@/lib/api'

const CheckoutPreview = ({ children }) => {
  const { checkout, setCheckout } = useContext(CheckoutContext)
  const { getPage, otherPages, sitePages } = useContext(LinksContext)
  const router = useRouter()
  const [createdAt, setCreatedAt] = useState('')
  const [endAt, setEndAt] = useState('')
  const [orderId, setOrderId] = useState('')
  const [subscription, setSubscription] = useState()
  const [totalPrice, setTotalPrice] = useState()
  const [serverSideError, setServerSideError] = useState()
  const [coupon, setCoupon] = useState()

  const formik = useFormik({
    initialValues: {
      promoCode: '',
    },
    validationSchema: PromoCodeSchema,
    onSubmit: (values) => {
      const fetchPromoCode = async () => {
        const data = await fetchAPIWithToken(
          `/promotion-codes/${values.promoCode}`,
          getToken(),
          false
        )

        if (!data.data) {
          setServerSideError("Ce code est expiré ou n'existe pas.")
        } else {
          setCoupon(data.data.coupon)

          if (data.data.coupon.percent_off) {
            setTotalPrice(
              (price) => price - (price * data.data.coupon.percent_off) / 100
            )
          } else {
            setTotalPrice((price) => price - data.data.coupon.amount_off)
          }
        }
      }

      fetchPromoCode()
    },
  })

  useEffect(() => {
    if (checkout.createdAt) {
      setCreatedAt(new Date(checkout.createdAt))
    }

    setOrderId(checkout.subscriptionId)
  }, [checkout])

  useEffect(() => {
    if (createdAt) {
      setEndAt(
        new Date(new Date(createdAt).setFullYear(createdAt.getFullYear() + 1))
      )
    }
  }, [createdAt])

  useEffect(() => {
    const localSubscription = window.localStorage.getItem(
      'vitaliplay.checkout.subscription'
    )

    if (!localSubscription || localSubscription === '{}') {
      router.push(getPage(sitePages, 'pageName', 'Accueil').path)
    } else {
      const parsedSubscription = JSON.parse(localSubscription)
      setSubscription(parsedSubscription.subscription)

      setTotalPrice(parsedSubscription.subscription.subscriptionPrice)
    }
  }, [])

  return (
    <>
      <CloseNav />
      <div className="flex min-h-screen flex-col-reverse justify-end lg:flex-row">
        <div className="lg:flex-[3]">
          {children}
          <p className="my-14 block px-6 font-body text-sm text-dark-300 md:px-24 lg:hidden">
            *En procédant au paiement, vous confirmez accepter les{' '}
            <Link
              href={
                getPage(otherPages, 'pageName', 'Conditions générales de vente')
                  .path
              }
            >
              <a className="text-blue-900 transition-[color] hover:text-blue-500">
                conditions générales de vente
              </a>
            </Link>
            .
          </p>
        </div>
        <aside className="flex flex-col justify-between bg-light-100 px-6 pt-24 pb-6 shadow-level1 md:px-24 lg:min-w-[400px] lg:flex-[2] lg:px-14 lg:pt-36 lg:pb-10">
          <div>
            <h2 className="font-head text-lg font-bold text-blue-900 md:text-xl lg:text-center">
              Récapitulatif de la commande
            </h2>
            <div className="mt-6 lg:mt-14">
              <h4 className="hidden font-body text-sm font-bold text-dark-300 md:inline-block">
                Votre panier :
              </h4>
              <div className="mt-4 flex items-start justify-between">
                <div>
                  {subscription?.subscriptionType && (
                    <h2 className="font-body text-base font-bold text-dark-900 md:text-lg">
                      x1 Abonnement {subscription?.subscriptionType}
                    </h2>
                  )}
                  {subscription && (
                    <p className="mt-2 font-body text-xs text-dark-500 md:text-sm">
                      Valable du {moment().format('DD/MM/YY')} au{' '}
                      {moment().add(1, 'year').format('DD/MM/YY')}
                    </p>
                  )}
                </div>
                <span className="font-body text-base font-bold text-dark-900 md:text-lg">
                  {subscription?.subscriptionPrice}€
                </span>
              </div>
            </div>
            <form
              className="mt-7 border-b-1 border-solid border-dark-100 pb-8"
              onSubmit={formik.handleSubmit}
            >
              <Input
                label="Possédez-vous un code promo ?"
                value={formik.values.promoCode}
                name="promoCode"
                onChange={formik.handleChange}
                error={
                  (formik.touched.promoCode && formik.errors.promoCode) ||
                  serverSideError
                }
              />
            </form>
            <div>
              <div className="mt-6 flex items-start justify-between">
                <h2 className="font-body text-base font-bold text-dark-900 md:text-lg">
                  Total TTC
                </h2>
                <span className="font-head text-[1.25rem] font-bold text-blue-900 md:text-2xl">
                  {totalPrice}€
                </span>
              </div>
              {coupon && (
                <p className="mt-4 font-body text-md font-bold text-blue-900">
                  -
                  {coupon.percent_off
                    ? `${coupon.percent_off}%`
                    : `${coupon.amount_off}€`}{' '}
                  avec le code {formik.values.promoCode.toUpperCase()}
                </p>
              )}
            </div>
          </div>
          <p className="hidden font-body text-sm text-dark-300 lg:block">
            *En procédant au paiement, vous confirmez accepter les{' '}
            <Link
              href={
                getPage(otherPages, 'pageName', 'Conditions générales de vente')
                  .path
              }
            >
              <a className="text-blue-900 transition-[color] hover:text-blue-500">
                conditions générales de vente
              </a>
            </Link>
            .
          </p>
        </aside>
      </div>
    </>
  )
}

const CheckoutLayout = ({ children }) => {
  const router = useRouter()
  const { getPage, checkoutPages, sitePages } = useContext(LinksContext)
  const { isAuth } = useContext(AuthContext)

  const [currentPath, setCurrentPath] = useState()

  const refreshLocalStorage = (id) => {
    window.localStorage.setItem(
      'vitaliplay.checkout.activeStep',
      (id && id.toString()) || '1'
    )
  }

  useEffect(() => {
    if (!window.localStorage.getItem('vitaliplay.checkout.store')) {
      window.localStorage.setItem(
        'vitaliplay.checkout.store',
        JSON.stringify({})
      )
    }
  }, [])

  useEffect(() => {
    setCurrentPath(router.asPath)
  }, [router])

  useEffect(() => {
    refreshLocalStorage(getPage(checkoutPages, 'path', currentPath)?.id)
  }, [currentPath])

  return (
    <CheckoutContextProvider>
      <CheckoutPreview>{children}</CheckoutPreview>
    </CheckoutContextProvider>
  )
}

export default CheckoutLayout
