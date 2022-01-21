import Input from '@/components/utils/Input'
import { useFormik } from 'formik'

const CheckoutLayout = ({ children }) => {
  const formik = useFormik({
    initialValues: {
      promoCode: '',
    },
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen">
      <div className="flex-[3]">
        {children}
        <p className="px-6 md:px-24 my-14 block lg:hidden font-body text-sm text-dark-300">
          *Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend
          sapien vitae aenean malesuada scelerisque. Sagittis in in habitant
          venenatis iaculis pellentesque quis justo nisi. Hac enim in nisi,
          consectetur morbi lacinia libero. Ac arcu ac metus, nulla est
          ultricies netus malesuada. Est est, sit neque, dui mattis. Ut sed
          diam, morbi parturient imperdiet potenti libero.
        </p>
      </div>
      <aside className="pt-24 lg:pt-36 flex-[2] lg:min-w-[400px] bg-light-100 shadow-level1 px-6 md:px-24 lg:px-14 lg:pb-10 pb-6 flex flex-col justify-between">
        <div>
          <h2 className="font-head font-bold lg:text-center text-lg md:text-xl text-blue-900">
            Récapitulatif de la commande
          </h2>
          <div className="mt-6 lg:mt-14">
            <h4 className="font-body font-bold text-dark-300 hidden md:inline-block text-sm">
              Votre panier :
            </h4>
            <div className="flex justify-between items-start mt-4">
              <div>
                <h2 className="font-bold text-base md:text-lg text-dark-900 font-body">
                  x1 Abonnement Annuel
                </h2>
                <p className="mt-2 font-body text-xs md:text-sm text-dark-500">
                  Valable du 20/09/2021 au 20/09/2022
                </p>
                <p className="mt-1 font-body text-xs md:text-sm text-dark-500">
                  Numéro de commande : 00001
                </p>
              </div>
              <span className="font-bold text-base md:text-lg text-dark-900 font-body">
                99€
              </span>
            </div>
          </div>
          <form
            className="mt-7 border-b-1 border-solid border-dark-100 pb-8"
            onSubmit={formik.handleSubmit}>
            <Input
              label="Possédez-vous un code promo ?"
              value={formik.values.promoCode}
              name="promoCode"
              onChange={formik.handleChange}
            />
          </form>
          <div className="mt-6 flex justify-between items-start">
            <h2 className="font-bold text-base md:text-lg text-dark-900 font-body">
              Total TTC
            </h2>
            <span className="font-bold text-[1.25rem] md:text-2xl text-blue-900 font-head">
              89€
            </span>
          </div>
          <p className="font-bold font-body text-blue-900 mt-4 text-md">
            -10 € avec le code VITALIPLAY10
          </p>
        </div>
        <p className="hidden lg:block font-body text-sm text-dark-300">
          *Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eleifend
          sapien vitae aenean malesuada scelerisque. Sagittis in in habitant
          venenatis iaculis pellentesque quis justo nisi. Hac enim in nisi,
          consectetur morbi lacinia libero. Ac arcu ac metus, nulla est
          ultricies netus malesuada. Est est, sit neque, dui mattis. Ut sed
          diam, morbi parturient imperdiet potenti libero.
        </p>
      </aside>
    </div>
  )
}

export default CheckoutLayout
