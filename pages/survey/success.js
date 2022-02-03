import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SurveyLayout from '@/components/layouts/SurveyLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { SurveyContext } from '@/contexts/SurveyContext'
import { useContext, useEffect } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'
import { Congrats } from '@/components/utils/Icons'
import useCongratsSize from '@/hooks/useCongratsSize'

const SurveySuccess = () => {
  const { getPathByPage } = useContext(LinksContext)

  useEffect(() => {
    console.log(
      JSON.parse(window.localStorage.getItem('vitaliplay.survey.store'))
    )
  }, [])

  const buttonSize = useButtonSize()
  const congratsSize = useCongratsSize()

  return (
    <div className="flex h-full flex-col items-center justify-center xl:pl-24">
      <div className="mb-6 lg:mb-10">
        <Congrats size={congratsSize} />
      </div>
      <Title center={true} type="3">
        Félicitation, profitez dès à présent de Vitaliplay
      </Title>
      <div className="mt-4">
        <Subtitle center={true} type="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Link href={getPathByPage('Accueil')} passHref>
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

SurveySuccess.Layout = SurveyLayout

export default SurveySuccess
