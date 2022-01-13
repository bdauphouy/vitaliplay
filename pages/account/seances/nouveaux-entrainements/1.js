import Title from '@/components/utils/Title'
import Image from 'next/image'
import Cta from '@/components/utils/Cta'
import { useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import Card from '@/components/pages/account/Card'
import DropDown from '@/components/utils/Dropdown'
import Row from '@/components/pages/account/Row'
import { useRouter } from 'next/router'
import Subtitle from '@/components/utils/Subtitle'
import Link from 'next/link'

export const Exercice = ({ title, time, image }) => {
  return (
    <div className="flex items-center gap-4 lg:gap-10">
      <div className="min-w-[4.5rem] min-h-[4.5rem] lg:w-36 lg:h-36 bg-dark-100 rounded lg:rounded-lg"></div>
      <div className="flex flex-col gap-1 lg:gap-3">
        <h2 className="font-semibold lg:font-bold font-head text-dark-900 text-md lg:text-xl">
          {title}
        </h2>
        <span className="text-dark-500 text-xs lg:text-lg font-body">
          {time}
        </span>
      </div>
    </div>
  )
}

const SessionsNewTrainings1 = () => {
  const router = useRouter()

  const isMediumScreen = useMediaQuery('(min-width: 768px)')

  return (
    <div className="mt-20 py-5 pb-10 md:py-16 min-h-[calc(100vh_-_165px)]">
      <div className="px-6 md:px-24" onClick={() => router.back()}>
        <Cta arrow="left" type="secondary" size={isMediumScreen ? 'l' : 'm'}>
          Retour
        </Cta>
      </div>
      <div className="px-6 md:px-24">
        <div className="mt-6 max-w-3xl flex flex-col gap-3 lg:gap-4">
          <Title type="1">Exercices intensifs pour le bas du corps</Title>
          <Subtitle type="3">27 min - Intermédiaire - Renforcement</Subtitle>
        </div>
        <iframe
          className="mt-8 lg:mt-12 w-full aspect-video"
          src="https://www.youtube.com/embed/yR9Wpyf8gbk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>
      </div>
      <div className="px-6 md:px-24 max-w-6xl mx-auto">
        <h2 className="mt-10 lg:mb-2 lg:mt-16 font-semibold lg:font-bold font-head text-dark-900 text-[1.25rem] lg:text-3xl">
          Programme de la séance
        </h2>
        <div className="space-y-10 lg:space-y-16">
          <div>
            <Subtitle type="3">Série 1 sur 2</Subtitle>
            <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-6">
              <Exercice
                title="Etirement latéral avec mains au dessus de la tête"
                time="1 minute"
              />
              <Exercice
                title="Exercices intensifs pour le bas du corps"
                time="1 minute"
              />
            </div>
          </div>
          <div>
            <Subtitle type="3">Série 2 sur 2</Subtitle>
            <div className="space-y-4 lg:space-y-8 mt-4 lg:mt-6">
              <Exercice
                title="Etirement latéral avec mains au dessus de la tête"
                time="1 minute"
              />
              <Exercice
                title="Exercices intensifs pour le bas du corps"
                time="1 minute"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 lg:mt-28">
        <Row type="checkup" title="Découvrez d'autres séances" button={false}>
          <Link
            href={`/${router.route.split('/').slice(2).join('/')}/1`}
            passHref>
            <a>
              <Card
                tagType="1"
                title="Exercices intensifs pour le bas du corps"
                type="séances"
                duration="27"
                level="Intermédiaire"
                bg="/bg-card.png"
              />
            </a>
          </Link>
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
          />
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
          />
          <Card
            tagType="1"
            title="Exercices intensifs pour le bas du corps"
            type="séances"
            duration="27"
            level="Intermédiaire"
            bg="/bg-card.png"
          />
        </Row>
      </div>
    </div>
  )
}

export default SessionsNewTrainings1
