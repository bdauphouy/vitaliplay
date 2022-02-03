import Title from '@/components/utils/Title'
import Subtitle from '@/components/utils/Subtitle'
import Cta from '@/components/utils/Cta'
import Row from '@/components/pages/account/Row'
import { useMediaQuery } from '@mui/material'
import CheckupPreview from '@/components/pages/account/CheckupPreview'
import Advices from '@/components/pages/account/Advices'
import Link from 'next/link'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import CheckupChart from '@/components/pages/account/CheckupChart'
import orangeGreen from '@/public/decoration-icons/orange-green.svg'
import greenBlue from '@/public/decoration-icons/green-blue.svg'
import blueOrange from '@/public/decoration-icons/blue-orange.svg'
import yellowOrange from '@/public/decoration-icons/yellow-orange.svg'
import Image from 'next/image'

const MyHealthSpace = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  const { getRewriteByPage } = useContext(LinksContext)

  return (
    <div className="mt-20 overflow-x-hidden py-10 md:py-20">
      <div className="mx-auto max-w-4xl px-6 md:px-24">
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
        <h2 className="font-head text-xl font-bold text-dark-900 md:text-3xl lg:text-4xl">
          Mon dernier bilan
        </h2>
        <div className="mt-8">
          <Advices />
        </div>
      </div>
      <div className="mt-24">
        <Row title="Mes derniers bilans" path="/bilans">
          <div className="relative flex h-56 flex-col items-center justify-center overflow-hidden rounded-lg bg-blue-50 py-16 px-10 shadow-level1 md:h-64">
            <div className="absolute top-0 -left-8 block scale-50 transform">
              <Image src={orangeGreen} alt="orange-green" />
            </div>
            <div className="absolute top-0 right-0 block scale-50 transform lg:scale-75">
              <Image src={blueOrange} alt="blue-orange" />
            </div>
            <div className="absolute bottom-4 left-2 block">
              <Image src={greenBlue} alt="green-blue" />
            </div>
            <div className="absolute -bottom-12 right-2 block">
              <Image src={yellowOrange} alt="yellow-orange" />
            </div>
            <h3
              className={`text-center font-head text-lg font-bold text-blue-900 md:text-xl`}
            >
              Réaliser un nouveau bilan
            </h3>
            <Link href={getRewriteByPage('Bilan')} passHref>
              <a>
                <div className="mt-6">
                  <Cta arrow="right" size={isMediumScreen ? 'l' : 'm'}>
                    Nouveau bilan
                  </Cta>
                </div>
              </a>
            </Link>
          </div>
          {[...Array(3)].map((_, i) => {
            return (
              <Link
                key={i}
                href={`${getRewriteByPage('Mon espace santé')}/bilans/1`}
                passHref
              >
                <a>
                  <div className="flex h-64 py-4 md:h-72">
                    <CheckupPreview date="01/02/2020" score="65" />
                  </div>
                </a>
              </Link>
            )
          })}
        </Row>
      </div>
      <div className="mt-14 px-6 md:px-24">
        <h2 className="font-head text-xl font-bold text-dark-900 md:text-3xl lg:text-4xl">
          Récapitulatif
        </h2>

        <div className="mt-0.5 lg:mt-10">
          <CheckupChart />
        </div>
      </div>
    </div>
  )
}

export default MyHealthSpace
