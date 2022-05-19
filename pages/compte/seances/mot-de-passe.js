import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'
import { useState } from 'react'
import { updateAPIWithToken, fetchAPIWithToken, getToken } from '@/lib/api'
import ProfilePasswordSchema from '@/schemas/account/ProfilePasswordsSchema'

export const getServerSideProps = async ({ req, query }) => {
  if (!req.cookies.jwt) {
    return {
      redirect: {
        destination: '/connexion',
        permanent: true,
      },
    }
  }

  const paid = await fetchAPIWithToken(
    '/users/me/subscription',
    req.cookies.jwt,
    false
  )

  if (paid.status !== 'paid') {
    return {
      redirect: {
        destination: '/abonnements',
        permanent: true,
      },
    }
  }

  return { props: {} }
}

const ProfilePassword = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ProfilePasswordSchema,
    onSubmit: (values) => {
      const updateAccount = async () => {
        setLoading(true)
        await updateAPIWithToken(
          `/users-permissions/users/me`,
          {
            password: values.password,
          },
          getToken()
        )
        setLoading(false)
      }

      updateAccount()
    },
  })

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-10 px-6 md:px-24 lg:py-20">
      <Title type="1" center={true}>
        Mon mot de passe
      </Title>
      <form
        onSubmit={formik.handleSubmit}
        className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 lg:mt-16 lg:grid-cols-2 lg:gap-8"
      >
        <Input
          label="Nouveau mot de passe"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <Input
          label="Confirmation mot de passe"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <div className="mt-10 flex flex-wrap justify-center gap-4 lg:col-span-2">
          <Cta loading={loading} size="l" buttonType="submit">
            {isLargeScreen ? 'Sauvegarder les changements' : 'Sauvegarder'}
          </Cta>
          <div className="lg:hidden">
            <Cta size="l" type="secondary">
              Retour
            </Cta>
          </div>
        </div>
      </form>
    </div>
  )
}

ProfilePassword.Layout = AccountDecorationLayout

export default ProfilePassword
