import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import LoginLayout from '@/components/layouts/LoginLayout'
import Cta from '@/components/utils/Cta'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'

const SignupConfirm = () => {
  const { getPage, sitePages, otherPages } = useContext(LinksContext)
  const congratsSize = useCongratsSize()

  const buttonSize = useButtonSize()

  return (
    <div className="absolute left-1/2 flex w-full -translate-x-1/2 transform flex-col items-center px-6 md:px-24 lg:max-w-3xl">
      <div className="mb-6 lg:mb-10">
        <Congrats size={congratsSize} />
      </div>
      <Title center={true} type="3">
        Félicitations, vous êtes bien inscrit sur Vitaliplay
      </Title>
      <div className="mt-4">
        <Subtitle center={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-6 lg:mt-12">
        <Link
          href={getPage(sitePages, 'pageName', 'Abonnements').path}
          passHref
        >
          <a>
            <Cta size={buttonSize} type="primary">
              S'abonner à Vitaliplay
            </Cta>
          </a>
        </Link>
        <Link
          href={getPage(otherPages, 'pageName', 'Invitation').path}
          passHref
        >
          <a>
            <Cta size={buttonSize} type="secondary">
              J'ai un code d'invitation
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

SignupConfirm.Layout = LoginLayout

export default SignupConfirm