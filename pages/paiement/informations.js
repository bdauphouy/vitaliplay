import CheckoutLayout from '@/components/layouts/CheckoutLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import { InformationsSchema } from '@/schemas/checkout/InformationsSchema'

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

const CheckoutInfo = () => {
  const [store, setStore] = useState()

  useEffect(() => {
    setStore(
      JSON.parse(window.localStorage.getItem('vitaliplay.checkout.store'))
    )
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: store?.billing?.lastName || '',
      firstName: store?.billing?.firstName || '',
      address: store?.billing?.address || '',
      city: store?.billing?.city || '',
      country: store?.billing?.country || '',
      zipCode: store?.billing?.zipCode || '',
    },
    validationSchema: InformationsSchema,
    onSubmit: (values) => {
      window.localStorage.setItem(
        'vitaliplay.checkout.store',
        JSON.stringify({ ...store, billing: { ...values } })
      )
      router.push(getPage(checkoutPages, 'pageName', 'Confirmation').path)
    },
  })

  const { getPage, checkoutPages } = useContext(LinksContext)

  const router = useRouter()

  const buttonSize = useButtonSize()

  useEffect(() => {}, [store])

  return (
    <div className="mt-10 px-6 md:px-24 lg:mt-40">
      <Title type="3">Informations de facturation</Title>
      <div className="mt-4">
        <Subtitle type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-7 grid grid-cols-1 gap-4 lg:gap-y-5 lg:pb-20 xl:grid-cols-2"
      >
        <Input
          label="Nom"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && formik.errors.lastName}
        />
        <Input
          label="Prénom"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && formik.errors.firstName}
        />
        <Input
          label="Adresse de facturation"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          error={formik.touched.address && formik.errors.address}
        />
        <Input
          label="Ville"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && formik.errors.city}
        />
        <Input
          label="Pays"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && formik.errors.country}
        />
        <div className="md:w-1/2">
          <Input
            label="Code postal"
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && formik.errors.zipCode}
          />
        </div>
        <div className="mt-4 lg:mt-7">
          <Cta buttonType="submit" size={buttonSize}>
            Suivant
          </Cta>
        </div>
      </form>
    </div>
  )
}

CheckoutInfo.Layout = CheckoutLayout

export default CheckoutInfo
