import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import Row from '@/components/pages/account/Row'
import { useMediaQuery } from '@mui/material'
import CheckupPreview from '@/components/pages/account/CheckupPreview'
import Advices from '@/components/pages/account/Advices'

const MyHealthSpace = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 py-10 md:py-20">
      <div className="max-w-4xl mx-auto px-6 md:px-24">
        <Title center={true} type="1">
          Mon espace santé
        </Title>
        <div className="mt-4">
          <Subtitle type="1" center={true}>
            Chaque bilan est individuel, personnel et ne se substitue pas à vos
            rendez-vous médicaux. Le score obtenu n’est qu’un chiffre qui a pour
            but de suivre votre progression, alors restons motivés et allons
            transpirer!
          </Subtitle>
        </div>
      </div>
      <div className="mt-14 px-6 md:px-24">
        <h2 className="font-bold font-head text-dark-900 text-xl md:text-3xl lg:text-4xl">
          Mon dernier bilan
        </h2>
        <div className="mt-8">
          <Advices />
        </div>
      </div>
      <div className="mt-24">
        <Row title="Mes derniers bilans" path="/bilans">
          <div className="bg-blue-50 h-56 md:h-64 rounded-lg py-16 px-10 flex flex-col justify-center items-center shadow-level1">
            <h3
              className={`font-head font-bold text-lg md:text-xl text-center text-blue-900`}>
              Réaliser un nouveau bilan
            </h3>
            <div className="mt-6">
              <Cta arrow="right" size={isMediumScreen ? 'l' : 'm'}>
                Nouveau bilan
              </Cta>
            </div>
          </div>
          {[...Array(3)].map((_, i) => {
            return (
              <div key={i} className="flex h-64 md:h-72 py-4">
                <CheckupPreview date="01/02/2020" score="65" />
              </div>
            )
          })}
        </Row>
      </div>
      <div className="mt-14 px-6 md:px-24">
        <h2 className="font-bold font-head text-dark-900 text-xl md:text-3xl lg:text-4xl">
          Récapitulatif
        </h2>
      </div>
    </div>
  )
}

export default MyHealthSpace
