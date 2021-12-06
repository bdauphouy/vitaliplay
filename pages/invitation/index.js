import Link from 'next/link'
import Input from '@/components/utils/Input'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useFormik } from 'formik'
import LoginLayout from '@/components/layouts/LoginLayout'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'

const InvitationStart = () => {
  const formik = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: values => {
      console.log(values)
    },
  })

  const router = useRouter()

  const buttonSize = useButtonSize()

  return (
    <div>
      <Title>Renseignez votre code d'invitation</Title>
      <div className="mt-4">
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col mt-7 lg:mt-10 gap-3 lg:gap-4">
        <div>
          <Input
            label="Mon code d'invitation"
            name="code"
            onChange={formik.handleChange}
            value={formik.values.code}
            error={formik.touched.code && formik.errors.code}
          />
        </div>

        <div className="mt-8">
          <div onClick={() => router.push(router.route + '/confirm')}>
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
