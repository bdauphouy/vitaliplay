import SurveyLayout from '@/components/layouts/SurveyLayout'
import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import useButtonSize from '@/hooks/useButtonSize'

const SurveySignup = () => {
  const buttonSize = useButtonSize()

  return (
    <div>
      <Title>Compléter votre profil</Title>
      <div className="mt-4">
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida eget
          varius a diam faucibus nec sodales fermentum eget.
        </Subtitle>
      </div>
      <div className="mt-10 flex flex-wrap items-start gap-4 lg:gap-6">
        <Cta type="primary" size={buttonSize}>
          Compléter mon profil
        </Cta>
        <Cta type="secondary" size={buttonSize}>
          Passer
        </Cta>
      </div>
    </div>
  )
}

SurveySignup.Layout = SurveyLayout

export default SurveySignup
