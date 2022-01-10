import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'

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

    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <div className="py-10 lg:py-20 mt-20 px-6 md:px-24 min-h-[calc(100vh_-_165px)]">
      <Title type="1" center={true}>
        Informations personnelles
      </Title>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-4xl mx-auto mt-12 lg:mt-16 grid grid-area-profile-personal-information lg:grid-area-profile-personal-information gap-3 lg:gap-4">
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
          className="flex gap-4 justify-center mt-10"
          style={{ gridArea: 'f' }}>
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

export default ProfilePersonalInformation
