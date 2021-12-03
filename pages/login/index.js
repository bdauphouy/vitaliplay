import Link from 'next/link'
import Input from '@/components/utils/Input'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useFormik } from 'formik'
import LoginSchema from '@/schemas/LoginSchema'
import { useMediaQuery } from '@mui/material'
import { useContext, useState, useEffect } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import LoginLayout from '@/components/layouts/LoginLayout'
import { useRouter } from 'next/router'

const LoginStart = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: values => {
      console.log(values)
    },
  })

  const router = useRouter()

  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  const { getPathByPage } = useContext(LinksContext)

  const [buttonSize, setButtonSize] = useState()

  useEffect(() => {
    setButtonSize(isLargeScreen ? 'xl' : 'l')
  }, [isLargeScreen])

  return (
    <div className="h-full lg:pt-20">
      <Title>Connexion</Title>
      <div className="mt-4">
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col mt-8 lg:mt-10 gap-3 lg:gap-4">
        <div>
          <Input
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />
        </div>
        <div className="flex flex-wrap gap-4 lg:gap-8 mt-10">
          <div onClick={() => router.push(router.route + '/confirm')}>
            <Cta type="primary" buttonType="submit" size={buttonSize}>
              Se connecter
            </Cta>
          </div>
          <Link href={getPathByPage('Inscription')} passHref>
            <a>
              <Cta type="secondary" size={buttonSize}>
                S'inscrire
              </Cta>
            </a>
          </Link>
        </div>
      </form>
    </div>
  )
}

LoginStart.Layout = LoginLayout

export default LoginStart
