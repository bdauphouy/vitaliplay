import Input from '@/components/utils/Input'
import { LinksContext } from '@/contexts/LinksContext'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import CloseNav from '@/components/utils/CloseNav'

const CheckoutLayout = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      promoCode: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  const router = useRouter()
  const { getPage, checkoutPages, otherPages } = useContext(LinksContext)

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
    <>
      <CloseNav />
      <div className="flex min-h-screen flex-col-reverse justify-end lg:flex-row">
        <div className="lg:flex-[3]">
          {children}
          <p className="my-14 block px-6 font-body text-sm text-dark-300 md:px-24 lg:hidden">
            *Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend
            sapien vitae aenean malesuada scelerisque. Sagittis in in habitant
            venenatis iaculis pellentesque quis justo nisi. Hac enim in nisi,
            consectetur morbi lacinia libero. Ac arcu ac metus, nulla est
            ultricies netus malesuada. Est est, sit neque, dui mattis. Ut sed
            diam, morbi parturient imperdiet potenti libero.
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
                  <h2 className="font-body text-base font-bold text-dark-900 md:text-lg">
                    x1 Abonnement Annuel
                  </h2>
                  <p className="mt-2 font-body text-xs text-dark-500 md:text-sm">
                    Valable du 20/09/2021 au 20/09/2022
                  </p>
                  <p className="mt-1 font-body text-xs text-dark-500 md:text-sm">
                    Numéro de commande : 00001
                  </p>
                </div>
                <span className="font-body text-base font-bold text-dark-900 md:text-lg">
                  99€
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
              />
            </form>
            <div>
              <div className="mt-6 flex items-start justify-between">
                <h2 className="font-body text-base font-bold text-dark-900 md:text-lg">
                  Total TTC
                </h2>
                <span className="font-head text-[1.25rem] font-bold text-blue-900 md:text-2xl">
                  89€
                </span>
              </div>
              <p className="mt-4 font-body text-md font-bold text-blue-900">
                -10 € avec le code VITALIPLAY10
              </p>
            </div>
          </div>
          <p className="hidden font-body text-sm text-dark-300 lg:block">
            *En procédant au paiement, vous confirmez accepter les{' '}
            <a
              className="text-blue-900 transition-[color] hover:text-blue-500"
              href={
                getPage(otherPages, 'pageName', 'Conditions générales de vente')
                  .path
              }
            >
              conditions générales de vente
            </a>
            .
          </p>
        </aside>
      </div>
    </>
  )
}

export default CheckoutLayout
