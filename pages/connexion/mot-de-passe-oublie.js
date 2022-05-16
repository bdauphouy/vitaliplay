import Input from '@/components/utils/Input'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useFormik } from 'formik'
import LoginLayout from '@/components/layouts/LoginLayout'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import PasswordForgottenSchema from '@/schemas/PasswordForgottenSchema'
import { useState, useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import { postAPI } from '@/lib/api'

const PasswordForgottenStart = () => {
  const [loading, setLoading] = useState(false)

  const { getPage, otherPages } = useContext(LinksContext)

  const [serverSideError, setServerSideError] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: PasswordForgottenSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const res = await postAPI('/auth/forgot-password', {
        email: values.email,
      })
      setLoading(false)
      console.log(res)
      router.push(
        `${getPage(otherPages, 'pageName', 'Connexion').path}?mdp-oublie=true`
      )
    },
  })

  const router = useRouter()

  const buttonSize = useButtonSize()

  return (
    <div className="max-w-3xl">
      <Title type="3">Renseignez votre adresse email</Title>
      <div className="mt-4">
        <Subtitle type="2">
          Un lien pour réinitialiser votre mot de passe va vous être envoyé par
          mail.
        </Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-7 flex flex-col gap-3 lg:mt-10 lg:gap-4"
      >
        <div>
          <Input
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
        </div>

        <div className="mt-4 lg:mt-8">
          <div>
            <Cta
              loading={loading}
              type="primary"
              buttonType="submit"
              size={buttonSize}
            >
              Valider
            </Cta>
          </div>
        </div>
      </form>
    </div>
  )
}

PasswordForgottenStart.Layout = LoginLayout

export default PasswordForgottenStart
