import Title from '@/components/utils/Title'
import Cta from '@/components/utils/Cta'
import Card from '@/components/pages/account/Card'
import CardPreview from '@/components/pages/account/CardPreview'
import { useMediaQuery } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { LinksContext } from '@/contexts/LinksContext'

export const CheckupBox = ({ date, score }) => {
  return (
    <div className="p-4 bg-blue-50 rounded flex flex-col items-center sm:items-start">
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

  const [cardType] = useState('Le live du jour')

  const { getRewriteByPage } = useContext(LinksContext)

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
        <div className="flex-[2] xsm:min-w-[320px] sm:min-w-[400px]">
          <Title type="5">Votre récapitulatif</Title>
          <div className="shadow-level1 px-6 py-8 rounded-lg mt-6">
            <div className="flex items-center gap-6">
              <div className="min-w-[72px] min-h-[72px] sm:min-w-[96px] sm:min-h-[96px] rounded-full bg-gray-100"></div>
              <div>
                <Title type="5">Guillaume Clerisseau</Title>
                <Link href={getRewriteByPage('Bilan')} passHref>
                  <a>
                    <Cta
                      size={linkSize}
                      type="link"
                      arrow="right"
                      textColor="text-blue-900">
                      Faire un nouveau bilan
                    </Cta>
                  </a>
                </Link>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-bold font-head text-dark-900 text-lg leading-6">
                Mes derniers bilans
              </h3>
              <div className="flex mt-4 gap-4 flex-wrap">
                <Link
                  href={`${getRewriteByPage('Mon espace santé')}/bilans/1`}
                  passHref>
                  <a className="flex-1">
                    <CheckupBox date="23/08/21" score="65" />
                  </a>
                </Link>
                <Link
                  href={`${getRewriteByPage('Mon espace santé')}/bilans/1`}
                  passHref>
                  <a className="flex-1">
                    <CheckupBox date="23/07/21" score="85" />
                  </a>
                </Link>
                <Link
                  href={`${getRewriteByPage('Mon espace santé')}/bilans/1`}
                  passHref>
                  <a className="flex-1">
                    <CheckupBox date="23/06/21" score="43" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 md:min-w-[288px] min-w-[224px]">
          <Title type="5">{cardType}</Title>
          <div className="h-full mt-6">
            {cardType === 'Votre séance du jour' ? (
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
                height="h-full"
              />
            ) : cardType === 'Compléter votre profil' ? (
              <div className="bg-blue-50 p-6 rounded-lg h-full flex flex-col items-start justify-end">
                <h3 className="font-head font-bold text-dark-900 text-[1.25rem] leading-6">
                  Votre profil n’est pas totalement complété
                </h3>
                <p className="font-body text-md text-dark-700 mt-3 mb-6">
                  Pensez a bien compléter votre profil afin nous puissions nous
                  adapter un maximum à vos capacités physiques
                </p>
                <Cta type="primary" size="m">
                  Compléter mon profil
                </Cta>
              </div>
            ) : (
              <div
                style={{
                  backgroundImage: `url('http://vitaliplay.eltha.fr/bg-card.png')`,
                }}
                className="bg-center bg-cover rounded-lg p-6 h-full flex flex-col items-center justify-end">
                <h3 className="font-head font-bold text-light-100 text-center text-lg leading-6">
                  Live Yoga:
                  <br />
                  Sophie Martinez
                </h3>
                <span className="text-sm font-bold font-body text-light-100 mt-2 mb-4">
                  16:00 - 17:00
                </span>
                <Cta size="m" type="primary">
                  Mettre un rappel
                </Cta>
              </div>
            )}
          </div>
        </div>
        <div className="flex-[1.5] self-end">
          <Title type="5">Vos dernières séances</Title>
          <div className="flex flex-col mt-6 gap-3 xsm:min-w-[300px]">
            <Link
              href={`${getRewriteByPage('Séances')}/toutes-les-seances/1`}
              passHref>
              <a>
                <CardPreview
                  title="Exercices intensifs pour le bas du corps"
                  duration="27"
                  level="Intermédiaire"
                  type="4"
                />
              </a>
            </Link>
            <Link
              href={`${getRewriteByPage('Séances')}/toutes-les-seances/1`}
              passHref>
              <a>
                <CardPreview
                  title="Exercices intensifs pour le bas du corps"
                  duration="27"
                  level="Intermédiaire"
                  type="2"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
