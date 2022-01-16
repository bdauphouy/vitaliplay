import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import Card from '@/components/pages/account/Card'
import CardPreview from '@/components/pages/account/CardPreview'
import { useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'

export const CheckupBox = ({ date, score, type }) => {
  return (
    <div className="flex-1 p-4 bg-blue-50 rounded flex flex-col items-center sm:items-start">
      <span className="text-dark-700 font-body text-xs font-normal">
        <span className="hidden sm:inline">Bilan : </span>
        {date}
      </span>
      <h4 className="font-head text-[1.25rem] sm:text-2xl font-bold mt-2 text-blue-900">
        {score}
        <span className="text-dark-700 text-xs font-normal">/100</span>
      </h4>
    </div>
  )
}

const Account = () => {
  const [linkSize, setLinkSize] = useState('m')

  const isSmallScreen = useMediaQuery('(max-width: 640px)')

  useEffect(() => {
    setLinkSize(isSmallScreen ? 's' : 'm')
  }, [isSmallScreen])

  return (
    <div className="mt-44 px-6 md:px-24 pb-12">
      <div className="lg:flex flex-row-reverse justify-between">
        <div className="top-20 lg:top-0 left-0 absolute lg:relative lg:w-auto lg:rounded-lg lg:shadow-level1 w-full bg-blue-50 py-4 px-6 flex justify-center items-center text-center text-md text-blue-900 font-bold font-body">
          Accès offert par : AG2R LA MONDIALE
        </div>
        <Title type="1" html={false}>
          Bonjour, <strong className="type-1">Guillaume</strong>
        </Title>
      </div>
      <div className="flex mt-14 gap-8 flex-wrap">
        <div className="flex-[2] sm:min-w-[400px]">
          <Title type="5">Votre récapitulatif</Title>
          <div className="shadow-level1 px-6 py-8 rounded-lg mt-6">
            <div className="flex items-center gap-6">
              <div className="min-w-[72px] min-h-[72px] sm:min-w-[96px] sm:min-h-[96px] rounded-full bg-gray-100"></div>
              <div>
                <Title type="5">Guillaume Clerisseau</Title>
                <Cta
                  size={linkSize}
                  type="link"
                  arrow="right"
                  textColor="text-blue-900">
                  Faire un nouveau bilan
                </Cta>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-bold font-head text-dark-900 text-lg leading-6">
                Mes derniers bilans
              </h3>
              <div className="flex mt-4 gap-4 flex-wrap">
                <CheckupBox date="23/08/21" score="65" type="1" />
                <CheckupBox date="23/07/21" score="85" type="2" />
                <CheckupBox date="23/06/21" score="43" type="3" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <Title type="5">Votre séance du jour</Title>
          <div className="h-full mt-6">
            <Card
              tagType="1"
              title="Exercices intensifs pour le bas du corps"
              type="séances"
              duration="27"
              level="Intermédiaire"
              bg="/bg-card.png"
              height="h-full"
            />
          </div>
        </div>
        <div className="flex-[1.5] self-end">
          <Title type="5">Vos dernières séances</Title>
          <div className="flex flex-col mt-6 gap-3 xsm:min-w-[300px]">
            <CardPreview
              title="Exercices intensifs pour le bas du corps"
              duration="27"
              level="Intermédiaire"
              type="4"
            />
            <CardPreview
              title="Exercices intensifs pour le bas du corps"
              duration="27"
              level="Intermédiaire"
              type="2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
