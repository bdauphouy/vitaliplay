import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { useContext } from 'react'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'
import { fetchAPI } from '@/lib/api'

export const getStaticProps = async () => {
  const login = await fetchAPI('/content/login')

  return { props: { login }, revalidate: 10 }
}

const LoginConfirm = ({ login }) => {
  const buttonSize = useButtonSize()
  const congratsSize = useCongratsSize()

  const { getPage, accountPages } = useContext(LinksContext)

  return (
    <div className="absolute left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center px-6 md:px-24 lg:max-w-3xl">
      <div className="mb-6 lg:mb-10">
        <Congrats size={congratsSize} />
      </div>
      <Title center={true} type="3">
        {login.loginSuccessTitle}
      </Title>
      <div className="mt-4">
        <Subtitle type="2" center={true}>
          {login.loginSuccessDescription}
        </Subtitle>
      </div>
      <div className="mt-10 lg:mt-12">
        <Link href={getPage(accountPages, 'pageName', 'Accueil').path} passHref>
          <a>
            <Cta size={buttonSize} type="primary">
              Accéder à Vitaliplay
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

LoginConfirm.Layout = LoginLayout

export default LoginConfirm
