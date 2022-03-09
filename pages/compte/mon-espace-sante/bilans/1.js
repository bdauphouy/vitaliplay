import Cta from '@/components/utils/Cta'
import { useMediaQuery } from '@mui/material'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Advices from '@/components/pages/account/Advices'
import AccountLayout from '@/components/layouts/AccountLayout'

export const CheckupSectionBar = ({ score, type, section, checkup }) => {
  return (
    <div className="mt-6 overflow-hidden rounded-lg shadow-level1 xl:flex">
      <div
        className={`${
          type === '1'
            ? 'bg-blue-900'
            : type === '2'
            ? 'bg-green-900'
            : type === '3'
            ? 'bg-orange-900'
            : 'bg-dark-900'
        } flex flex-row-reverse items-center justify-between p-6 xl:max-w-[12rem] xl:flex-col xl:justify-start xl:py-8`}
      >
        <h2 className="font-head text-[4rem] font-extrabold leading-[4rem] text-light-100">
          {score}
        </h2>
        <h3 className="text-center font-body text-base font-semibold text-light-100 lg:text-[1.25rem] xl:mt-4">
          {section}
        </h3>
      </div>
      <div className="flex flex-col gap-6 px-4 py-6 md:gap-20 xl:flex-row xl:justify-between xl:py-10 xl:px-12">
        {checkup.map((category) => {
          return (
            <div key={category.title}>
              <h3
                className={`font-head text-[1.25rem] font-bold ${
                  type === '1'
                    ? 'text-blue-900'
                    : type === '2'
                    ? 'text-green-900'
                    : type === '3'
                    ? 'text-orange-900'
                    : 'text-dark-900'
                }`}
              >
                {category.title}
              </h3>
              <ul className="mt-3">
                {category.values.map((value, i) => {
                  return (
                    <li key={i} className="font-body text-md text-dark-500">
                      {value}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const MyHealthSpaceCheckups1 = () => {
  const router = useRouter()

  const { getPathByPage } = useContext(LinksContext)

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 min-h-[calc(100vh_-_165px)] py-5 md:py-16">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-10 md:mt-6">
        <Row title="Bilan 01/02/22" type="grid" button={false}>
          <Advices button={false} />
          <CheckupSectionBar
            score="60"
            type="1"
            section="Bilan Physique"
            checkup={[
              {
                title: 'Force',
                values: ['Nbr de répétitions : 15', 'Nbr de répétitions : 15'],
              },
              {
                title: 'Souplesse',
                values: ['Distance (cm) : 35 cm'],
              },
              {
                title: 'Endurance',
                values: ['Nbr de répétitions : 15'],
              },
              {
                title: 'Equilibre',
                values: ['Jambe droite : 15 sec', 'Jambe gauche : 20 sec'],
              },
            ]}
          />
          <CheckupSectionBar
            score="55"
            type="2"
            section="Bilan Bien Être"
            checkup={[
              {
                title: 'Humeur',
                values: ['Note (0/5) : 3'],
              },
              {
                title: 'Tranquilité',
                values: ['Note (0/5) : 3'],
              },
              {
                title: 'Energie',
                values: ['Note (0/5) : 3'],
              },
              {
                title: 'Réveil',
                values: ['Note (0/5) : 3'],
              },
              {
                title: 'Vie quotidienne',
                values: ['Note (0/5) : 3'],
              },
            ]}
          />
          <CheckupSectionBar
            score="34"
            type="3"
            section="Activité quotidienne"
            checkup={[
              {
                title: 'Activité intense',
                values: ['1 à 2 fois par semaine'],
              },
              {
                title: 'Activité modérée',
                values: ['3 à 4 fois par semaine'],
              },
            ]}
          />
        </Row>
      </div>
    </div>
  )
}

MyHealthSpaceCheckups1.Layout = AccountLayout

export default MyHealthSpaceCheckups1
