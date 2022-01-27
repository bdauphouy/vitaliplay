import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Input from '@/components/utils/Input'
import { useFormik } from 'formik'
import Dropdown from '@/components/utils/Dropdown'
import { useState, useContext } from 'react'
import Cta from '@/components/utils/Cta'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import SignupSchema from '@/schemas/SignupSchema'
import LoginLayout from '@/components/layouts/LoginLayout'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import { v4 as uuidv4 } from 'uuid'
import { postAPI } from '@/lib/api'

const SignupStart = () => {
  const [civility, setCivility] = useState('M')

  const { getPathByPage } = useContext(LinksContext)

  const router = useRouter()

  const buttonSize = useButtonSize()

  const [serverSideErrors, setServerSideErrors] = useState()

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  const formik = useFormik({
    initialValues: {
      lastName: '',
      firstName: '',
      address: '',
      zipCode: '',
      birthday: formatDate(new Date()),
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,

    onSubmit: async (values) => {
      const res = await postAPI('/auth/local/register', {
        username: uuidv4(),
        email: values.email,
        password: values.password,
        civilite: values.civility,
        firstname: values.firstName,
        lastname: values.lastName,
        address: values.address,
        postal_code: values.zipCode,
        birthdate: values.birthday,
        phone: values.phoneNumber,
      })
      if (res.error) {
        setServerSideErrors(res.error)
      } else {
        document.cookie = `jwt=${res.jwt}`
        router.push(`${router.route}/confirm`)
      }
      console.log(res)
    },
  })

  return (
    <div className="h-full lg:pt-32 xl:mr-20">
      <Title type="3">Inscription</Title>
      <div className="mt-4">
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="lg:grid-area-signup mt-8 flex flex-col gap-4 lg:mt-10 lg:grid lg:gap-5"
      >
        <div className="self-start" style={{ gridArea: 'a' }}>
          <Dropdown
            options={['M', 'Mme']}
            label="Civilité"
            defaultOption={civility}
            getOption={setCivility}
          />
        </div>
        <div style={{ gridArea: 'b' }}>
          <Input
            label="Nom"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        <div style={{ gridArea: 'c' }}>
          <Input
            label="Prénom"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
        <div style={{ gridArea: 'd' }}>
          <Input
            label="Adresse"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
            error={formik.touched.address && formik.errors.address}
          />
        </div>
        <div className="flex gap-4" style={{ gridArea: 'e' }}>
          <div className="flex-1">
            <Input
              label="Code Postal"
              name="zipCode"
              onChange={formik.handleChange}
              value={formik.values.zipCode}
              error={formik.touched.zipCode && formik.errors.zipCode}
            />
          </div>
          <div className="flex-1">
            <Input
              label="Date de naissance"
              name="birthday"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.birthday}
              error={formik.touched.birthday && formik.errors.birthday}
            />
          </div>
        </div>
        <div style={{ gridArea: 'f' }}>
          <Input
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div style={{ gridArea: 'g' }}>
          <Input
            label="Téléphone"
            name="phoneNumber"
            onChange={formik.handleChange}
            value={formik.values.phoneNumber}
            prefix="(+ 33)"
            error={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
        </div>
        <div style={{ gridArea: 'h' }}>
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />
        </div>
        <div style={{ gridArea: 'i' }}>
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
        </div>
        <div
          className="mt-10 flex flex-wrap gap-4 lg:gap-8"
          style={{ gridArea: 'j' }}
        >
          <div>
            <Cta type="primary" buttonType="submit" size={buttonSize}>
              S'inscrire
            </Cta>
          </div>

          <Link href={getPathByPage('Connexion')} passHref>
            <a>
              <Cta type="secondary" size={buttonSize}>
                Se connecter
              </Cta>
            </a>
          </Link>
        </div>
      </form>
    </div>
  )
}

SignupStart.Layout = LoginLayout

export default SignupStart
