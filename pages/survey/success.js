import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import SurveyLayout from '@/components/layouts/SurveyLayout'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'
import { SurveyContext } from '@/contexts/SurveyContext'
import { useContext, useEffect } from 'react'

const SurveySuccess = () => {
  const { store } = useContext(SurveyContext)

  useEffect(() => {
    console.log(store)
  }, [store])

  const buttonSize = useButtonSize()

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <Title center={true}>
        Félicitation, profitez dès à présent de Vitaliplay
      </Title>
      <div className="mt-4">
        <Subtitle center={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-12">
        <Cta size={buttonSize} type="primary">
          Accéder à Vitaliplay
        </Cta>
      </div>
    </div>
  )
}

SurveySuccess.Layout = SurveyLayout

export default SurveySuccess