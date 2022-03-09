import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import CheckupLayout from '@/components/layouts/CheckupLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'

const SurveySuccess = () => {
  const { getPage, accountPages } = useContext(LinksContext)

  const congratsSize = useCongratsSize()

  const buttonSize = useButtonSize()

  return (
    <div className="flex h-full flex-col items-center justify-center xl:pl-24">
      <div className="mb-6 lg:mb-10">
        <Congrats size={congratsSize} />
      </div>
      <Title center={true} type="3" html={false}>
        Bilan fini !<br />
        Votre score est de : 66
      </Title>
      <div className="mt-4">
        <Subtitle center={true} type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fringilla
          viverra tellus adipiscing mi, nunc. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Fringilla viverra tellus adipiscing mi,
          nunc.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPage(accountPages, 'pageName', 'Accueil').path} passHref>
          <a>
            <Cta size={buttonSize} type="primary">
              Voir mon bilan
            </Cta>
          </a>
        </Link>
      </div>
    </div>
  )
}

SurveySuccess.Layout = CheckupLayout

export default SurveySuccess
