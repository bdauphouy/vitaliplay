import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import Row from '@/components/pages/account/Row'
import { useMediaQuery } from '@mui/material'
import CheckupPreview from '@/components/pages/account/CheckupPreview'

const MyHealthSpace = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 py-10 md:py-20">
      <div className="max-w-2xl mx-auto px-6 md:px-24">
        <Title center={true} type="1">
          Mon espace santé
        </Title>
        <div className="mt-4">
          <Subtitle type="3" center={true}>
            Chaque bilan est individuel, personnel et ne se substitue pas à vos
            rendez-vous médicaux. Le score obtenu n’est qu’un chiffre qui a pour
            but de suivre votre progression, alors restons motivés et allons
            transpirer!
          </Subtitle>
        </div>
      </div>
      <div className="mt-14 px-6 md:px-24">
        <Title type="8">Mon dernier bilan</Title>
        <div className="rounded-lg overflow-hidden shadow-level1 mt-6 xl:flex">
          <div className="bg-blue-50 flex xl:flex-col xl:py-4 items-center justify-between xl:justify-start p-6 min-w-[12rem]">
            <Title type="10" color="text-dark-700" as="h4">
              Note du bilan
            </Title>
            <h2 className="font-extrabold font-head leading-[5rem] text-[4rem] xl:text-[5rem] xl:mt-8 text-blue-900">
              66
            </h2>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between px-4 py-6 xl:py-10 xl:px-12">
            <div className="2xl:flex-[2] xl:flex-[1.5] xl:pr-16">
              <Title type="11" as="h3">
                Nos Conseils
              </Title>
              <div className="mt-3 mb-6 xl:mb-0 xl:mt-5">
                <Subtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                  purus pellentesque malesuada pellentesque ultricies leo sit.
                  Ut in sed ultricies diam arcu et. Sed lectus feugiat aliquam
                  urna, sed risus sed.
                </Subtitle>
              </div>
            </div>
            <div className="xl:flex-1 xl:flex xl:justify-end">
              <Cta arrow="right" size="l">
                Accéder aux conseils
              </Cta>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <Row title="Mes derniers bilans" type="checkup">
          <div className="bg-blue-50 h-56 md:h-64 rounded-lg py-16 px-10 flex flex-col justify-center items-center shadow-level1">
            <Title type="12" color="text-blue-900" center={true}>
              Réaliser un nouveau bilan
            </Title>
            <div className="mt-6">
              <Cta arrow="right" size={isMediumScreen ? 'l' : 'm'}>
                Nouveau bilan
              </Cta>
            </div>
          </div>
          {[...Array(3)].map((_, i) => {
            return (
              <div key={i} className="flex h-56 md:h-64">
                <CheckupPreview date="01/02/2020" score="65" />
              </div>
            )
          })}
        </Row>
      </div>
      <div className="mt-14 px-6 md:px-24">
        <Title type="8">Récapitulatif</Title>
      </div>
    </div>
  )
}

export default MyHealthSpace
