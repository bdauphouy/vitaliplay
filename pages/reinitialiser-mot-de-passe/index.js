import Link from 'next/link'
import Input from '@/components/utils/Input'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useFormik } from 'formik'
import LoginLayout from '@/components/layouts/LoginLayout'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import { useState } from 'react'
import ResetPasswordSchema from '@/schemas/ResetPasswordSchema'

const ResetPasswordStart = () => {
  const [loading, setLoading] = useState(false)

  const [serverSideError, setServerSideError] = useState()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      setLoading(true)
      console.log(values)
      setLoading(false)
      router.push(`${router.asPath}/confirmation`)
    },
  })

  const router = useRouter()

  const buttonSize = useButtonSize()

  return (
    <div className="max-w-3xl">
      <Title type="3">Renseignez votre nouveau mot de passe</Title>
      {/* <div className="mt-4">
        <Subtitle type="2"></Subtitle>
      </div> */}
      <form
        onSubmit={formik.handleSubmit}
        className="mt-7 flex flex-col gap-3 lg:mt-10 lg:gap-4"
      >
        <div>
          <Input
            label="Nouveau mot de passe"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />
        </div>
        <div>
          <Input
            label="Confirmez votre nouveau mot de passe"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
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

ResetPasswordStart.Layout = LoginLayout

export default ResetPasswordStart
