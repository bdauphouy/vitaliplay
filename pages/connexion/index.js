import Link from 'next/link'
import Input from '@/components/utils/Input'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import { useFormik } from 'formik'
import LoginSchema from '@/schemas/LoginSchema'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import LoginLayout from '@/components/layouts/LoginLayout'
import { useRouter } from 'next/router'
import useButtonSize from '@/hooks/useButtonSize'
import { postAPI } from '@/lib/api'
import { AuthContext } from '@/contexts/AuthContext'
import { useState } from 'react'
import Error from '@/components/utils/Error'

const LoginStart = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [serverSideErrors] = useState({
    'Invalid identifier or password': 'Vos identifiants sont invalides.',
  })

  const [serverSideError, setServerSideError] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,

    onSubmit: async (values) => {
      setLoading(true)
      const res = await postAPI('/auth/local', {
        identifier: values.email,
        password: values.password,
      })
      setLoading(false)
      if (res.error) {
        console.log(res.error)
        setServerSideError(
          serverSideErrors[res.error.message] || 'Erreur inconnue.'
        )
      } else {
        document.cookie = `jwt=${res.jwt}`
        setIsAuth(true)
        router.push(`${router.asPath}/confirmation`)
      }
    },
  })

  const { getPage, otherPages } = useContext(LinksContext)

  const { setIsAuth } = useContext(AuthContext)

  const buttonSize = useButtonSize()

  return (
    <div className="h-full lg:pt-32 xl:mr-20 xl:max-w-3xl">
      <Title type="3">Connexion</Title>
      <div className="mt-4">
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-8 flex flex-col gap-3 lg:mt-10 lg:gap-4"
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
        <div className={serverSideError ? 'mt-2' : ''}>
          {serverSideError && <Error>{serverSideError}</Error>}
          <div className="mt-4 flex flex-wrap gap-4 lg:gap-8">
            <div>
              <Cta
                loading={loading}
                type="primary"
                buttonType="submit"
                size={buttonSize}
              >
                Se connecter
              </Cta>
            </div>
            <Link
              href={getPage(otherPages, 'pageName', 'Inscription').path}
              passHref
            >
              <a>
                <Cta type="secondary" size={buttonSize}>
                  S'inscrire
                </Cta>
              </a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

LoginStart.Layout = LoginLayout

export default LoginStart