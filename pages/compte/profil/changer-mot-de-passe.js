import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'
import { useState } from 'react'
import { updateAPIWithToken, getToken } from '@/lib/api'
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

  if (paid.status !== 'finalized') {
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
    <div className="mt-20 flex min-h-[calc(100vh_-_165px)] items-center justify-center py-10 px-6 md:px-24 lg:py-20">
      <div className="bg-white">
        <Subtitle>
          Un lien pour changer votre mot de passe vous a été envoyé par mail !
        </Subtitle>
      </div>
    </div>
  )
}

ProfilePassword.Layout = AccountDecorationLayout

export default ProfilePassword
