import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import SurveyLayout from '@/components/layouts/SurveyLayout'

const SurveySignup = () => {
  const buttonSize = useButtonSize()

  const { getPage, surveyPages } = useContext(LinksContext)

  return (
    <div>
      <Title type="3">Compléter votre profil</Title>
      <div className="mt-4">
        <Subtitle type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-10 flex flex-wrap items-start gap-4 lg:gap-6">
        <Link
          href={getPage(surveyPages, 'pageName', 'Mensurations').path}
          passHref
        >
          <a>
            <Cta type="primary" size={buttonSize}>
              Compléter mon profil
            </Cta>
          </a>
        </Link>
        <Cta type="secondary" size={buttonSize}>
          Passer
        </Cta>
      </div>
    </div>
  )
}

SurveySignup.Layout = SurveyLayout

export default SurveySignup