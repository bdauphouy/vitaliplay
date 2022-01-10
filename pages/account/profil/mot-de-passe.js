import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'

const ProfilePassword = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },

    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <div className="py-10 lg:py-20 mt-20 px-6 md:px-24 min-h-[calc(100vh_-_165px)]">
      <Title type="1" center={true}>
        Mon mot de passe
      </Title>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-4xl mx-auto mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-8">
        <Input label="Nouveau mot de passe" name="password" type="password" />
        <Input
          label="Confirmation mot de passe"
          name="confirmPassword"
          type="password"
        />
        <div className="flex flex-wrap gap-4 justify-center mt-10 lg:col-span-2">
          <Cta size="l" buttonType="submit">
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

export default ProfilePassword
