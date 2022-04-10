import Title from '@/components/utils/Title'
import { useFormik } from 'formik'
import Input from '@/components/utils/Input'
import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import AccountDecorationLayout from '@/components/layouts/AccountDecorationLayout'
import { fetchAPIWithToken, updateAPIWithToken, getToken } from '@/lib/api'

export const getServerSideProps = async ({ req }) => {
    if (!req.cookies.jwt) {
      return {
        redirect: {
          destination: '/connexion',
          permanent: true,
        },
      }
    }
  
    
    const {user,history, billing} = await fetchAPIWithToken('/pwa/account', req.cookies.jwt)
  
  
    return { props: { user } }
  }

const ProfilePersonalInformation = ({ user }) => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  const formik = useFormik({
    initialValues: {
        id: user.id,
      firstname:user.firstname,
      lastname:user.lastname,
      birthdate: user.birthdate,
      postal_code: user.postal_code,
      email: user.email,
      phone: user.phone,
    },

    onSubmit: (values) => {
      

        const updateAccount = async () => {
            const data = await updateAPIWithToken(
              `/users/${user.id}`,
              { data: values },
              getToken()
            )
            console.log(data)
          } 

         updateAccount() 
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
          <Input
            label="Nom "
            name="lastname"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.touched.lastname && formik.errors.lastname}
          />
          {/* <Input
            label="Prénom"
            name="firstname"
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.touched.firstname && formik.errors.firstname}
          /> */}
        </div>
        <div style={{ gridArea: 'b' }}>
          <Input
            label="Date de naissance"
            name="birthdate"
            type="date"
            onChange={formik.handleChange}
            value={formik.values.birthdate}
            error={formik.touched.birthdate && formik.errors.birthdate}
          />
        </div>
        <div style={{ gridArea: 'c' }}>
          <Input
            label="Code postal"
            name="postal_code"
            onChange={formik.handleChange}
            value={formik.values.postal_code}
            error={formik.touched.postal_code && formik.errors.postal_code}
          />
        </div>
        <div style={{ gridArea: 'd' }}>
          <Input
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div style={{ gridArea: 'e' }}>
          <Input
            label="Téléphone"
            name="phone"
            prefix="(+33)"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.touched.phone && formik.errors.phone}
          />
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
