import Input from '@/components/utils/Input'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useFormik } from 'formik'
import LoginLayout from '@/components/layouts/LoginLayout'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import { fetchAPI } from '@/lib/api'
import Error from '@/components/utils/Error'
import { useState } from 'react'
import InvitationSchema from '@/schemas/InvitationSchema'

export const getStaticProps = async () => {
  const invitation = await fetchAPI('/content/invitation')

  return { props: { invitation }, revalidate: 10 }
}

const InvitationStart = ({ invitation }) => {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    validationSchema: InvitationSchema,
    onSubmit: (values) => {
      router.push(`${router.asPath}/confirmation`)
    },
  })

  const [serverSideError, setServerSideError] = useState()

  const router = useRouter()

  const buttonSize = useButtonSize()

  return (
    <div className="max-w-3xl">
      <Title type="3">{invitation.invitationTitle}</Title>
      <div className="mt-4">
        <Subtitle type="2">{invitation.invitationDescription}</Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-7 flex flex-col gap-3 lg:mt-10 lg:gap-4"
      >
        <div>
          <Input
            label="Mon code d'invitation"
            name="code"
            onChange={formik.handleChange}
            value={formik.values.code}
            error={formik.touched.code && formik.errors.code}
          />
          {serverSideError && <Error>{serverSideError}</Error>}
        </div>

        <div className="mt-4 lg:mt-8">
          <div>
            <Cta type="primary" buttonType="submit" size={buttonSize}>
              Valider
            </Cta>
          </div>
        </div>
      </form>
    </div>
  )
}

InvitationStart.Layout = LoginLayout

export default InvitationStart
