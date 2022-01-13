import Title from '@/components/utils/Title'
import Image from 'next/image'
import Cta from '@/components/utils/Cta'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import DropDown from '@/components/utils/Dropdown'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Link from 'next/link'
import CheckupPreview from '@/components/pages/account/CheckupPreview'
import { useContext } from 'react'
import { LinksContext } from '@/contexts/LinksContext'
import Subtitle from '@/components/utils/Subtitle'
import Advices from '@/components/pages/account/Advices'

export const CheckupSectionBar = ({ score, type, section, checkup }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-level1 mt-6 xl:flex">
      <div
        className={`${
          type === '1'
            ? 'bg-blue-900'
            : type === '2'
            ? 'bg-green-900'
            : type === '3'
            ? 'bg-orange-900'
            : 'bg-dark-900'
        } flex-row-reverse flex xl:flex-col xl:py-8 items-center justify-between xl:justify-start p-6 xl:max-w-[12rem]`}>
        <h2 className="font-extrabold font-head leading-[4rem] text-[4rem] text-light-100">
          {score}
        </h2>
        <h3 className="xl:mt-4 font-semibold text-center font-body text-base lg:text-[1.25rem] text-light-100">
          {section}
        </h3>
      </div>
      <div className="flex flex-col xl:flex-row gap-6 md:gap-20 xl:justify-between px-4 py-6 xl:py-10 xl:px-12">
        {checkup.map(category => {
          return (
            <div key={category.title}>
              <Title
                type="6"
                color={
                  type === '1'
                    ? 'text-blue-900'
                    : type === '2'
                    ? 'text-green-900'
                    : type === '3'
                    ? 'text-orange-900'
                    : 'text-dark-900'
                }>
                {category.title}
              </Title>
              <ul className="mt-3">
                {category.values.map((value, i) => {
                  return (
                    <li key={i} className="text-dark-500 font-body text-md">
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
    <div className="mt-20 py-5 md:py-16 min-h-[calc(100vh_-_165px)]">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="mt-10 md:mt-6">
        <Row title="Bilan 01/02/22" keepColumm={true} button={false}>
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

export default MyHealthSpaceCheckups1
