import Title from '@/components/utils/Title'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'

const ProfilePersonalInformation = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  const formik = useFormik({
    initialValues: {
      fullName: '',
      birthday: '',
      zipCode: '',
      email: '',
      phoneNumber: '',
    },

    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-10 px-6 md:px-24 lg:py-20">
      <Title type="1" center={true}>
        Informations personnelles
      </Title>
      <form
        onSubmit={formik.handleSubmit}
        className="grid-area-profile-personal-information lg:grid-area-profile-personal-information mx-auto mt-12 grid max-w-4xl gap-3 lg:mt-16 lg:gap-4"
      >
        <div style={{ gridArea: 'a' }}>
          <Input label="Nom & prénom" name="fullName" />
        </div>
        <div style={{ gridArea: 'b' }}>
          <Input label="Date de naissance" name="birthday" type="date" />
        </div>
        <div style={{ gridArea: 'c' }}>
          <Input label="Code postal" name="zipCode" />
        </div>
        <div style={{ gridArea: 'd' }}>
          <Input label="Email" name="email" />
        </div>
        <div style={{ gridArea: 'e' }}>
          <Input label="Téléphone" name="phoneNumber" prefix="(+33)" />
        </div>
        <div
          className="mt-10 flex justify-center gap-4"
          style={{ gridArea: 'f' }}
        >
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

ProfilePersonalInformation.Layout = AccountDecorationLayout

export default ProfilePersonalInformation
